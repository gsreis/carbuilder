var app = angular.module('nebula', []);

app.controller('control', [ '$scope', '$http', '$interval', '$window', function($scope, $http, $interval, $window) {
	
	    $interval( function(){ $scope.checkVeiculoReady(); }, 5000);
	    
	    $scope.key;
	    $scope.solicitado = false;
	    $scope.showdialog = true;
		$scope.mensagem = "Solicitação não enviada";
		$scope.chassicriado_status = "list-group-item-danger";
		$scope.pinturacriada_status = "list-group-item-danger";
		$scope.interiorcriado_status = "list-group-item-danger";
		$scope.veiculopronto_status = "divider-warning";

		//list-group-item-success  list-group-item-danger

		$scope.bloco = { 
			"chave": "0002",
		    "modelo": "",
			"cor": "",
			"interior": "",
			"construido": false,
			"segurado": false, 
			"chassicriado" : false,
			"pinturacriada" : false,
			"interiorcriado" : false,
			"veiculopronto" : false,
			"construcao_solicitada": false,
			"seguro_solicitado" : false,
			"timestamp": 0
		};
	    
	    $scope.blockchain_ip = "http://127.0.0.1:3546";	    
    	
	    
		$scope.checkVeiculoReady = function() {
		    //TODO CHAMA PERIODICAMENTE A URL RETRIEVE DO BLOCKCHAIN E TESTA SE O VEICULO FOI CONSTRUIDO
			//TODO Se o valor construido for alterado para true, apresenta o botão solicita seguro
			$http.get($scope.blockchain_ip + '/retrieve?chave='+$scope.bloco.chave).then(function(response) {
				if (response.data.chave != undefined)
				$scope.bloco = response.data;
		    });
			// valida se o processo de consttrução está em andamento e atualiza campos na tela
			if ($scope.bloco.chassicriado)
				$scope.chassicriado_status = "list-group-item-success";
			else
				$scope.chassicriado_status = "list-group-item-danger";
			
			if ($scope.bloco.pinturacriada)
				$scope.pinturacriada_status = "list-group-item-success";
			else
				$scope.pinturacriada_status = "list-group-item-danger";

			if ($scope.bloco.interiorcriado)
				$scope.interiorcriado_status = "list-group-item-success";
			else
				$scope.interiorcriado_status = "list-group-item-danger";

			if ($scope.bloco.veiculopronto)
				$scope.veiculopronto_status = "list-group-item-success";
			else
				$scope.veiculopronto_status = "list-group-item-danger";

			if ($scope.bloco.interiorcriado && $scope.bloco.pinturacriada && $scope.bloco.chassicriado) {
				$scope.bloco.veiculopronto = true;
				$http.get($scope.blockchain_ip + '/update?chave='+$scope.bloco.chave+"&valor="+JSON.stringify($scope.bloco)).then(function(response) {
				});
			}
			else {
				$scope.veiculopronto = "divider-warning";
			}

    	}  	 
		
    	$scope.modelo = function(modelo) {
		    $scope.bloco.modelo = modelo;
    	} 
		
		$scope.cor = function(cor) {
		    $scope.bloco.cor = cor;
    	}   

		$scope.interior = function(interior) {
		    $scope.bloco.interior = interior;
    	}

    	$scope.createCar = function() {
			
			$scope.bloco.construcao_solicitada = true;
			$scope.contador = 0;
			$http.get($scope.blockchain_ip + '/update?chave='+$scope.bloco.chave+"&valor="+JSON.stringify($scope.bloco)).then(function(response) {
			});
			//TODO Inicia o processo de construção do veículo
			//TODO cria threads paa simular o preenchimento dos campos
			setTimeout(() =>  {
				$scope.bloco.chassicriado = true;
				$http.get($scope.blockchain_ip + '/update?chave='+$scope.bloco.chave+"&valor="+JSON.stringify($scope.bloco));

			},Math.floor(Math.random() * 15000));
						
			setTimeout(() =>  {
				$scope.bloco.pinturacriada = true;
				$http.get($scope.blockchain_ip + '/update?chave='+$scope.bloco.chave+"&valor="+JSON.stringify($scope.bloco));
			},Math.floor(Math.random() * 15000));

			setTimeout(() => {
				$scope.bloco.interiorcriado = true;
				$http.get($scope.blockchain_ip + '/update?chave='+$scope.bloco.chave+"&valor="+JSON.stringify($scope.bloco));
			},Math.floor(Math.random() * 15000));
		
    	}
    	
    	$scope.solicitaSeguro = function() {
			
			$scope.mensagem = 'Solicitação para o seguro enviada';
    	}
		
    	$scope.hasFinished = function() {
			if ($scope.bloco.construido)
				$scope.mensagem = 'Seu veículo foi construido com sucesso';  
			return $scope.bloco.construido;
    	}
		
   }]);
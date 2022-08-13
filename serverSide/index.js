// content of index.js
const http = require('http')
const contract = require('./invoke.js')
const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');
const _ = require('lodash');
const path = require('path');
const { json } = require('body-parser');

const port = 3546

// async function main() {
//   contract.create("0008", "00008")
// }
main();


async function main() {

app = express();

app.use(express.json())
app.use(fileUpload({
    createParentPath: true
}));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev'))
app.use(express.static('static'));
app.use('/', express.static("static"))

app.get("/create", async (req, res) => {
   ret = await contract.create(req.query.chave, req.query.valor);
   console.log("chave " + chave +  " valor " + valor);
   res.send(ret);
})

app.get("/update", async (req, res) => {
   ret = await contract.update(req.query.chave, req.query.valor);
   console.log(ret);
   res.send(ret);
})

app.get("/retrieve", async (req, res) => {     
   ret = await contract.retrieve(req.query.chave);    
   res.send(ret);
})

app.get("/delete", async (req, res) => {     
   ret = await contract.delete(req.query.chave);
   console.log(ret);
   res.send(ret);
})

app.listen(port, function(err) {
   console.log("Servidor rodando na porta" + port);
})

}

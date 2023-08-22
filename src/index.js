const express = require('express')
const mysql = require('mysql')
const myconnect = require('express-myconnection')
require('dotenv').config();
const routes = require('./routes/routes')

port = process.env.PORT
const app = express();
app.use(express.json());


dbOptions = {
    host: process.env.HOST_BD,
    port: process.env.PORT_BD,
    user: process.env.USER_BD,
    password: process.env.PSWD_BD,
    database: process.env.DB_NAME
}

app.use(myconnect(mysql, dbOptions, 'single'))
app.use('/api', routes);

app.listen(port, ()=>console.log(`Esuchando por http://localhost:${port}`));
const express = require('express');
const routes = express.Router();


routes.get('/get', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err);
        conn.query('SELECT * FROM books', (err, rows)=>{
            if(err) return res.send(err);

            res.json(rows);
        });
    })
});

routes.post('/post', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err);
        conn.query('INSERT INTO books set ?', [req.body], (err, rows)=>{
            if(err)return res.send(err);
            console.log([req.body]);
            res.json(rows);
        })        
    })

});

routes.put('/put', (req, res)=>{

});

routes.delete('/delte', (req, res)=>{

});

module.exports = routes;
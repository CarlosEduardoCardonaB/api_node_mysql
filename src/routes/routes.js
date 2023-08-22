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

routes.get('/get/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err);
        conn.query('SELECT * FROM books where idbooks = ?',[req.params.id], (err, rows)=>{
            if(err) return res.send(err);

            res.json(rows);
        });
    })
});

routes.post('/post', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err);
        conn.query('INSERT INTO books set ?', [req.body], (err, rows)=>{
            if(err) 
            {
                //console.log(err.errno);
                if(err.errno){
                    if(err.errno==1062) return res.send('ID duplicado')
                }
                return res.send(err); 
            }             
            else if(rows.protocol41){
                if(rows.protocol41==true) res.send('Ingresado con éxito')
            }
        })        
    })

});

routes.put('/put/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('UPDATE books set ? WHERE idbooks = ?', [req.body, req.params.id], (err, rows)=>{
            if(err) return res.send(err);
            res.send(`Libro con id: ${req.params.id} borrado con éxito`);
        })
    })

});

routes.delete('/delte/:id', (req, res)=>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query('DELETE FROM books WHERE idbooks = ?', [req.params.id], (err, rows)=>{
            if(err) return res.send(err);
            res.send('Libro borrado con éxito');
        })
    })

});

module.exports = routes;
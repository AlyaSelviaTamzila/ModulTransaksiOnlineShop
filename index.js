const express = require('express')
const mysql = require('mysql')
const bodyParser = require('body-parser')

const app = express();
const port = 3000;

const db = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'node_olshop'
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))


app.get('/produk', (req,res) =>{
    db.query(`
        select * from products    
    `, (error, result)=>{
        if (error) throw error
            res.json ({
                success: true,
                message: 'Success get product list',
                data: result
            })
    })
})

app.get('/produk/:id', (req, res)=>{
    db.query(`
        select * from products where id = ?
    `, [req.params.id], (error, results)=>{
        if (error) throw error

        if(results.lengt <= 0){
            res.json({
                success: false,
                message: 'There is no product with id ' + req.params.id
            })
        } else {
            res.json({
                success: true,
                message: 'Success get product with id ' + req.params.id,
                data: results[0]
            })
        }
    })
})

app.post('/produk/:id/buy', (req, res)=>{
    let request = req.body

    db.query(`
        select * from products where id = ?
    `, [req.params.id], (error, results)=>{
        if (error) throw error

        if(results.lengt <= 0 ){
            res.json({
                success: false,
                message: 'There is no product with id ' + req.params.id
            })
        } else{
            let data = results [0]

            res.json({
                success: true,
                message: 'You are about to buy ' + data.name + ' with qty ' + request.qty + ' and will be delivered to ' +
                request.shipping_address + '. You will be charged Rp. ' + (request.qty * data.price) + '. Pleace choose your payment method. ',
                data: {
                    transaction_code: 'ORD' + getCurrentTimestamp(),
                    shipping_address: request,
                    payment_methode: [{
                            code: '001',
                            name: 'BRI Virtual Account'
                        },
                        {
                            code: '002',
                            name: 'BNI Virtual Account'
                        },
                        {
                            code: '003',
                            name: 'BCA Virtual Account'
                        },
                        {   
                            code: '004',
                            name: 'Mandiri Virtual Account'
                        }
                    ]
                }
            })
        }
    })
})

app.post('/checkout', (req, res)=>{
    res.json({
        success: true,
        message: 'Your order has been recorded. Complete your product.',
        data: req.body
    })
})

app.listen(port, ()=>{
    console.log('App running on port ' + port);
    
})
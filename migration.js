'use strict'
const express = require('express')
const mysql = require('mysql')

const db = mysql.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'node_olshop'
})


const createTables = () => {
    db.query(`
        DROP TABLE IF EXISTS node_olshop.products
    `)
    db.query(`
        CREATE TABLE node_olshop.
        products(
            id BIGINT NOT NULL AUTO_INCREMENT,
            name VARCHAR(100) NOT NULL,
            stock INT NOT NULL,
            price DOUBLE NOT NULL,
            PRIMARY KEY(id) ENGINE = InnoDB
        )
    `)
}

createTables()
console.log('Table created. Press Ctrl+C to exit.');

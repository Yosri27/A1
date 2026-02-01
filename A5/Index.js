import express from 'express';
const app = express();
app.use(express.json());
import mysql from 'mysql2';
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test1'
});
connection.connect((err)=>
    {
        if(err)
        {
            console.log('Error connecting to database:', err);
            return;
        }
        console.log('Database connected successfully');
    })

app.get('/add-category', (req, res) => {

    connection.query(`ALTER TABLE products ADD COLUMN Category varchar(255)`)
});

app.get('/remove-category', (req, res) => {
    connection.query(`ALTER TABLE products DROP COLUMN Category`)
        
});
app.get('/supllier-phone', (req, res) => {
    connection.query(`ALTER TABLE suppliers MODIFY ContactNumber varchar(15)`)
});
app.get('/product-name', (req, res) => {
    connection.query(`ALTER TABLE products MODIFY ProductName varchar(255) NOT null`)
});
app.post('/add-supplier', (req, res) => {
    let { Name, contact } = req.body;
    connection.query(`INSERT INTO suppliers(SupplierName,ContactNumber) VALUES ('${Name}', '${contact}')`)
});
app.post('/add-products', (req, res) => {
    let { ProductName, Price, StockQuantity, SupplierID } = req.body;
    connection.query(`INSERT INTO products( ProductName, Price, StockQuantity,SupplierID) VALUES ('${ProductName}', ${Price}, ${StockQuantity}, ${SupplierID})`)
});
app.post('/add-sale', (req, res) => { 
    let { ProductID, QuantitySold, SaleDate } = req.body;
    connection.query(`INSERT INTO sales( ProductID, QuantitySold, SaleDate) VALUES (${ProductID},${QuantitySold},'${SaleDate}')`)
});
app.patch('/update-price', (req, res) => {
    let {ProductName}= req.body;
    connection.query(`UPDATE products SET Price=25.00 WHERE ProductName = "${ProductName}"`)
});
app.delete('/delete-product', (req, res) => {
    let {ProductName}= req.body;
    connection.query(`DELETE from products WHERE productName = "${ProductName}"`)
});
app.get('/products-stock', (req, res) => {
    connection.query(`SELECT *  FROM products ORDER BY StockQuantity  DESC`)
});
app.get('/supllier-f', (req, res) => {
    connection.query(`SELECT * FROM suppliers WHERE supplierName LIKE 'F%'`)
});
//Sql
/*
    connection.query(`CREATE USER "store_manager" @'localhost' IDENTIFIED BY "1234";
GRANT SELECT,INSERT,UPDATE
ON test1.*
TO 'store_manager'@'localhost';`)


    connection.query(`REVOKE UPDATE 
        ON test1.*
        FROM 'store_manager'@'localhost';`)


    connection.query(`GRANT DELETE
         ON sales
          TO 'store_manager'@'localhost'`)

*/

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
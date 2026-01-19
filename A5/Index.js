import express from 'express';
const app = express();
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

function one()
{
    connection.query(`ALTER TABLE products ADD COLUMN Category varchar(255)`)
        
}
function two()
{
    connection.query(`ALTER TABLE products DROP COLUMN Category`)
        
}
function three()
{
    connection.query(`ALTER TABLE suppliers MODIFY ContactNumber varchar(15)`)
}
function four()
{
    connection.query(`ALTER TABLE products MODIFY ProductName varchar(255) NOT null`)
}
function five(req)
{
    let { Name, contact } = req.body;
    connection.query(`INSERT INTO suppliers(SupplierName,ContactNumber) VALUES ('${Name}', '${contact}')`)
}
function six(req)
{
    let { ProductName, Price, StockQuantity, SupplierID } = req.body;
    connection.query(`INSERT INTO products( ProductName, Price, StockQuantity,SupplierID) VALUES ('${ProductName}', ${Price}, ${StockQuantity}, ${SupplierID})`)
}
function seven(req)
{   
    let { ProductID, QuantitySold, SaleDate } = req.body;
    connection.query(`INSERT INTO sales( ProductID, QuantitySold, SaleDate) VALUES (${ProductID},${QuantitySold},'${SaleDate}')`)
}
function eight(req)
{
    let {ProductName}= req.body;
    connection.query(`UPDATE products SET Price=25.00 WHERE ProductName = "${ProductName}"`)
}
function nine()
{
    let {ProductName}= req.body;
    connection.query(`DELETE from products WHERE productName = "${ProductName}"`)
}
function ten()
{
    connection.query(`SELECT *  FROM products ORDER BY StockQuantity  DESC`)
}
function eleven()
{
    connection.query(`SELECT * FROM suppliers WHERE supplierName LIKE 'F%'`)
}
function twelve()
{
    connection.query(`CREATE USER "store_manager" @'localhost' IDENTIFIED BY "1234";
GRANT SELECT,INSERT,UPDATE
ON test1.*
TO 'store_manager'@'localhost';`)
}
function thirteen()
{
    connection.query(`REVOKE UPDATE 
        ON test1.*
        FROM 'store_manager'@'localhost';`)
}
function fourteen()
{
    connection.query(`GRANT DELETE
         ON sales
          TO 'store_manager'@'localhost'`)
}


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
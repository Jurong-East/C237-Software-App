const express = require('express');
const mysql = require('mysql2');
const app = express();
// Create MySQL connection
const connection = mysql.createConnection({
host: '127.0.0.1',
user: 'root',
password: 'T0105061z',
database: 'c237_supermarketapp'
});
connection.connect((err) => {
if (err) {
console.error('Error connecting to MySQL:', err);
return;
}
console.log('Connected to MySQL database');
});
// Set up view engine
app.set('view engine', 'ejs');
// enable static files
app.use(express.static('public'));
// enable form processing
app.use(express.urlencoded({
    extended: false
}));
// Define routes
app.get('/', (req, res) => {
const sql = 'SELECT * FROM products';
// Fetch data from MySQL
connection.query( sql , (error, results) => {
if (error) {
console.error('Database query error:', error.message);
return res.send('Error Retrieving products');
}
// Render HTML page with data
res.render('index', { products: results });
});
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
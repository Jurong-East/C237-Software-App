const express = require('express');
const app = express();
 
// Setting EJS as the view engine
app.set('view engine', 'ejs');
 
// Middleware to parse form data from req.body
app.use(express.urlencoded({ extended: true }));
 
// Arrays declared outside routes so they persist between requests
let clothesList = ['T-shirt', 'Jacket', 'Jeans'];
let toiletriesList = ['Toothbrush', 'Shampoo', 'Sunscreen'];
 
// GET route - renders the packing list page
app.get('/', (req, res) => {
    res.render('index', { clothesList, toiletriesList });
});
 
// POST route - handles the Add Item form submission
app.post('/add', (req, res) => {
    const { item, category } = req.body;
 
    if (category === 'clothes') {
        clothesList.push(item);
    } else {
        toiletriesList.push(item);
    }
 
    // Redirect back to GET route to re-render the updated lists
    res.redirect('/');
});
 
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});




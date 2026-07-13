// Import required modules
const express = require('express');

// Create an Express application
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse request bodies
app.use(express.urlencoded({ extended: true }));

// Array to store tasks
const tasks = [];

//Define a route to render the index page
app.get('/', (req, res) => {
    res.render('index', {
        name : 'Peter',
        age: 19
    });
});

//Define a route to render the contact us page
app.get('/contact', (req, res) => {
    res.render('contact');
});

app.post('/submit', (req, res) => {
    const { name, email, contact, comments } = req.body;
    res.render('submitted', {name, email, contact, comments});
});

//Task page
app.get('/task', (req, res) => {
    res.render('task');
});

//Task Submission
app.post('/tasksubmit', (req, res) => {
    const { title, description, deadline, priority } = req.body;
    tasks.push({ title, description, deadline, priority });
    res.redirect('/confirm');
});

// Confirm page
app.get('/confirm', (req, res) => {
    res.render('confirm', { tasks });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
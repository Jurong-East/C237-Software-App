// Import the Express module
const express = require('express');
// Create an Express application
const app = express();
// Define the port number the server will run on
const port = 3000;
// Define a route for the homepage "/"
// When a user visits http://localhost:3000/
// Route to display list of students
app.get('/students', (req, res) => {
    // Create an empty string to store the list items
    let list = '';

    // Loop through the array of students and add each one as a <li>
    for (let i = 0; i < students.length; i++) {
        list += `<li>${students[i]}</li>`;
    }

    // Send back an HTML response with the student list
    res.send(`
        <h1>List of Students</h1>
        <ul>${list}</ul>
        <a href="/">Back to Home</a>
    `);
});

app.get('/addStudent', function(req, res) {
    res.send("Add Student Page");
});

app.get('/', function(req, res) 
{
// Send a response back to the browser
res.send('Hello, World!');
});

// Start the server and listen on the specified port
app.listen(port, () => {
console.log(`Server is running at http://localhost:${port}`);
});
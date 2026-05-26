// Import required modules
const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Create an Express application
const app = express();

// Groq AI setup — paste your NEW API key here
const Groq = require('groq-sdk');
const groq = new Groq({ apiKey: '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' });

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse form request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Array to store task data
const tasks = [];

// Serve static files from the public folder
app.use(express.static('public'));

// Array storing all game information
const games = [
    {
        id: 1,
        title: "Counter-Strike 2",
        platform: "PC",
        status: "Playing",
        genre: "FPS",
        image: "/Images/CS2.jpg",
        rating: 4
    },
    {
        id: 2,
        title: "Elden Ring",
        platform: "PC",
        status: "Completed",
        genre: "RPG",
        image: "/Images/eldenring.jpg",
        rating: 5
    }
];

// Route to render the home page
app.get('/', (req, res) => {
    res.render('Home/Home Page');
});

// Route to display all games in the backlog
app.get('/ListPage', (req, res) => {
    res.render('List/ListPage', { games });
});

// Route to render the add game page
app.get('/Add', (req, res) => {
    res.render('List/Add Item Page', { games });
});

// Route to add a new game into the array
app.post('/games/add', (req, res) => {
    const { title, platform, status, genre, notes, image, rating } = req.body;
    games.push({ 
        id: games.length + 1, 
        title, platform, status, genre, notes,
        rating: parseInt(rating),
        image: image || '/Images/default.jpg'
    });
    res.redirect('/ListPage');
});

// Route to delete a game by ID
app.post('/list/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = games.findIndex(game => game.id === id);
    if (index !== -1) {
        games.splice(index, 1);
    }
    res.redirect('/ListPage');
});

// Route to render the edit game page
app.get('/list/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const game = games.find(game => game.id === id);
    res.render('List/Edit Item Page', { game });
});

// Route to handle the edit form submission
app.post('/list/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = games.findIndex(game => game.id === id);
    if (index !== -1) {
        const { title, platform, status, genre, notes, rating } = req.body;
        games[index] = { ...games[index], title, platform, status, genre, notes, rating: parseInt(rating) };
    }
    res.redirect('/ListPage');
});

// Route to render the details page for a specific game
app.get('/list/details/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const game = games.find(game => game.id === id);
    res.render('List/Item Details Page', { game });
});

// Chatbot route
app.post('/chat', async (req, res) => {
    const { message } = req.body;

    const prompt = `
        You are a helpful game assistant for a Game Backlog Tracker website.
        
        Here are the games currently in the user's backlog:
        ${JSON.stringify(games, null, 2)}
        
        Answer questions about the user's game list, game release dates, 
        game recommendations, and anything gaming related.
        Keep answers short and friendly.
        
        User's question: ${message}
    `;

    const result = await groq.chat.completions.create({
    messages: [{ role: 'user', content: prompt }],
    model: 'llama-3.3-70b-versatile',
});

    const reply = result.choices[0].message.content;
    res.json({ reply });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});
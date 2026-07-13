// Import required modules
const express = require('express');
const app = express();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse form request bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the public folder
app.use(express.static('public'));

// Array storing all movie information
const movies = [
    {
        id: 1,
        title: "Inception",
        genre: "Sci-Fi",
        status: "Completed",
        rating: 5,
        notes: "Mind-blowing movie about dreams within dreams.",
        image: "https://m.media-amazon.com/images/M/MV5BMjExMjkwNTQ0Nl5BMl5BanBnXkFtZTcwNTY0OTk1Mw@@._V1_.jpg"
    },
    {
        id: 2,
        title: "Interstellar",
        genre: "Sci-Fi",
        status: "Completed",
        rating: 5,
        notes: "Amazing visuals and emotional story.",
        image: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg"
    },
    {
        id: 3,
        title: "The Dark Knight",
        genre: "Action",
        status: "Plan to Watch",
        rating: 0,
        notes: "",
        image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_FMjpg_UX1000_.jpg"
    }
];

// Route to render the home page
app.get('/', (req, res) => {
    res.render('Home/Home Page');
});

// Route to display all movies
app.get('/MovieList', (req, res) => {
    res.render('Movies/MovieList', { movies });
});

// Route to render the add movie page
app.get('/Add', (req, res) => {
    res.render('Movies/Add Movie Page');
});

// Route to add a new movie
app.post('/movies/add', (req, res) => {
    const { title, genre, status, rating, notes, image } = req.body;
    movies.push({
        id: movies.length + 1,
        title, genre, status, notes,
        rating: parseInt(rating) || 0,
        image: image || 'https://via.placeholder.com/300x450?text=No+Image'
    });
    res.redirect('/MovieList');
});

// Route to delete a movie
app.post('/movies/delete/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = movies.findIndex(movie => movie.id === id);
    if (index !== -1) {
        movies.splice(index, 1);
    }
    res.redirect('/MovieList');
});

// Route to render the edit movie page
app.get('/movies/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const movie = movies.find(movie => movie.id === id);
    res.render('Movies/Edit Movie Page', { movie });
});

// Route to handle the edit form submission
app.post('/movies/edit/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = movies.findIndex(movie => movie.id === id);
    if (index !== -1) {
        const { title, genre, status, rating, notes } = req.body;
        movies[index] = { ...movies[index], title, genre, status, notes, rating: parseInt(rating) || 0 };
    }
    res.redirect('/MovieList');
});

// Route to render the details page
app.get('/movies/details/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const movie = movies.find(movie => movie.id === id);
    res.render('Movies/Movie Details Page', { movie });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

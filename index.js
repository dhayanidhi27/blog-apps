// index.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware for parsing JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Middleware for static files
app.use(express.static('public'));

// Dummy posts array (for demonstration)
let posts = [];

// Route to render the home page and display posts
app.get('/', (req, res) => {
    res.render('index', { posts });
});

// Route to render the post creation page
app.get('/create', (req, res) => {
    res.render('create');
});

// Route to handle post creation
app.post('/create', (req, res) => {
    const { title, content } = req.body;
    // Save the post data (you can use an array or any in-memory storage for now)
    posts.push({ id: generateId(), title, content });
    res.redirect('/');
});

// Route to render the post editing page
app.get('/edit/:postId', (req, res) => {
    const postId = req.params.postId;
    const post = posts.find(post => post.id === postId);
    if (!post) {
        res.status(404).send('Post not found');
    } else {
        res.render('edit', { post });
    }
});

// Route to handle post update
app.post('/edit/:postId', (req, res) => {
    const postId = req.params.postId;
    const { title, content } = req.body;
    const postIndex = posts.findIndex(post => post.id === postId);
    if (postIndex !== -1) {
        posts[postIndex] = { ...posts[postIndex], title, content };
    }
    res.redirect('/');
});

// Route to handle post deletion
app.get('/delete/:postId', (req, res) => {
    const postId = req.params.postId;
    posts = posts.filter(post => post.id !== postId);
    res.redirect('/');
});

// Function to generate a unique ID for posts
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

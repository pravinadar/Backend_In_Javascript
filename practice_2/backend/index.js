import express from 'express'

const app = express();

app.get('/', (req, res) => {
    res.send('Server is ready');
});

app.get('/api/heroes', (req, res) => {
    const heroes = [
        { id: 1, heroName: "Iron Man", description: "Genius, billionaire, playboy, philanthropist." },
        { id: 2, heroName: "Captain America", description: "Super-soldier with enhanced strength and durability." },
        { id: 3, heroName: "Thor", description: "God of Thunder with superhuman strength and flight." },
        { id: 4, heroName: "Hulk", description: "Scientist who transforms into a raging green monster." },
        { id: 5, heroName: "Black Widow", description: "Master spy and martial artist." }
    ];
    res.json(heroes);
});


const port = process.env.PORT || 3000; // important for production

app.listen(port, () => {
    console.log(`server is running at http://localhost:${port}`);
})
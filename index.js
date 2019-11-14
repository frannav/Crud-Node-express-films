const express = require('express');
const app = express();
app.use(express.json());  

const movies = require('./data/movies.json');

// Show movies
app.get('/movies', (req, res) => {
    res.json(movies);
});

// Add movie

//Hay que validar lo que nos llega del usuario, con una funcion en la condicion del if por ejemplo
app.post('/add', (req, res) => {
    const {title, director, year, rate} = req.body;
    if (title && director && year && rate) {
        const id = movies.length +1
        const newMovie = {...req.body, id};
        movies.push(newMovie);
        res.json(movies);
    } else {
        res.status(500).json({error: 'There was an error.'})
    }
});

// Remove movie

app.delete('./films', (req, res) => {
    var id = req.body.id;
    var film = films.findIndex(film => film.ID == id);
    films.splice(film);
});

app.delete('/movies/:id', (req, res) => {
    const movieId = req.params.id;
    if (!idIsNumber(movieId)) {
        return res.status(400).send('El id debe ser un número');
    }
    const movie = movies.find(movie => movie.id === parseInt(movieId));
    if (!movies.includes(movie)) {
        return res.status(400).send('Película no encontrada');
    }
    const position = movies.indexOf(movie);
    movies.splice(position, 1);
    return res.status(200).send('Película eliminada correctamente');
});

app.delete('/remove/:id', (req, res) => {
    const idToRemove  = req.params.id;
    for (let i = 0; i < movies.length; i++) {
        if(movies[i].id == idToRemove){
            movies.splice(i, 1);
            } else {
            res.status(404).send("No se ha encontrado ninguna película con ese ID.")
            }
    }
    res.json(movies);
}); 

//Update a movie


//Hay que poner una funcion sanitazeBody para 
app.put('/update/:id', (req, res) => {
    const movieToUpdateId = req.params.id;
    const updatedMovie = req.body;
    for (let i = 0; i < movies.length; i++) {
    {
        if(movies[i].id == movieToUpdateId) {
            movies[i].title = updatedMovie.title ||  movies[i].title;
            movies[i].director = updatedMovie.director ||  movies[i].director;
            movies[i].year = updatedMovie.year ||  movies[i].year ;
            movies[i].rate = updatedMovie.rate ||  movies[i].rate ; 
        }
        }
        
    }
    res.json(movies);
});

app.put('/update/:id', (req,res) => {

})

// A
app.listen(3000, () => {
    console.log('Ready on port 3000!');
});



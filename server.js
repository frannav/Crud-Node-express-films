const express = require('express');
const app = express();
app.use(express.json());  


app.get('/users', (req, res) => {
    //console.log('Request: ', req);
    //res.send('Hello World');
    res.json(users);
});


//El método Object.keys() devuelve un array de las propiedades namesde un objeto, en este caso me devuelve -> [ 'name', 'id' ]
app.post('/users', (req, res) => {
    let userValues = req.body
    if(Object.keys(req.body).length === 0){
        res.status(400).send('Empty body');
        console.log(Object.keys(req.body));
    }
    else {
        const newUser = req.body
        newUser.id = Math.random()
        users.push(newUser)
        res.json(newUser)
        console.log(newUser);
        console.log(Object.keys(req.body));
    }
})

app.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    const regExp = /^\d+$/;
    if (userId.match(regExp)) {
        const user = users.find(user => user.id === parseInt(userId));
        res.json(user);
    }
    else {
        res.json({err: 'El parámetro debe ser un número'});
    }
});

app.get('/dice', (req, res) => {
    dice = (1 + Math.floor(Math.random() * 6));    //Numero aleatorio del 1 al 6
    res.json({number: `${dice}`}); 
})

app.get('/dice/:side', (req, res) => {
    let side = req.params.side;
    dice = (1 + Math.floor(Math.random() * side));    //Numero aleatorio del 1 al 6
    res.json({number: `${dice}`}); 
})


app.listen(3000, () => {
    console.log('Ready on port 3000!');
});
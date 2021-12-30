const express = require('express');
const app = express();
const port = process.env.PORT || '8080';

app.use(express.static(__dirname + '/public'));
app.use('/public', express.static('public'))
app.set('view engine', 'ejs');

const text1 = false;
const text2 = false;


app.get('/', (req,res) => {
    res.render('home');
});

app.get('/entry', (req,res) => {
    res.render('entry', {data: false});
});

// code for the entry point, using a switch case to decide which direction to go to
app.get('/entry/:direction', (req,res) => {
    const direction = req.params['direction'];
    console.log("Player chooses to go: ", direction);

    switch (direction){
        case 'left':
            res.render('left');
            break;
        case 'upstairs':
            res.render('upstairs');
            break;
        case 'right':
            res.render('right');
            break;
        case 'hintOne':
            res.render('entry', {data: true});
            break;
        case 'mirror':
            res.render('mirror');
            break;
        case 'couch':
            res.render('couch');
            break;
        case 'key':
            res.render('key');
            break;
        case 'fridge': 
            res.render('fridge');
            break;
    }

});


app.listen(port,() => {
    console.log(`app is listening on port ${port}`);
});


const express = require('express');
const session = require('express-session');
const app = express();
const port = process.env.PORT || '8080';

app.use(express.static(__dirname + '/public'));
app.use('/public', express.static('public'))
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    secret: 'qrkfnqerf',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: false}
}));


app.get('/', (req,res) => {
    let invalid_login = false;
    let url_reason = req.query.reason;
    if (url_reason == 'invalid_login'){
        invalid_login = true;
    }
    const session_username = req.session ? req.session.username : "no user set";
    res.render('homepage', {my_user: session_username, invalid_login: invalid_login});
});

app.get('/homepage', (req,res) => {
    res.render('home');
});

app.get('/home', (req,res) => {
    if (req.session && req.session.username){
        const session_username = req.session ? req.session.username : "no user set";
        res.render('home', {my_user: session_username});
    } else {
        res.redirect('/');
    }
});

app.post('/signup', (req,res)=>{
    const valid_users = [
        {'name': 'sue', 'password': 'sue'},
        {'name': 'joe', 'password': 'joe'},
        {'name': 'silvan', 'password': 'silvan'},
        {'name': 'lee', 'password': 'lee'},
    ];

    const user = req.body.username;
    const pass = req.body.password;
    
    const found_user = valid_users.find(usr => usr.name == user && usr.password == pass);

    if (found_user){
        req.session.username = user;
        res.redirect('/home')
    } else {
        req.session.destroy(() => {
            console.log('user reset')
        });
        res.redirect('/?reason=invalid_login');
    }

  });

app.get('/entry', (req,res) => {
    if (req.session && req.session.username){
        const session_username = req.session ? req.session.username : "no user set";
        res.render('entry', {data: false, my_user: session_username});
    } else {
        res.redirect('/');
    }
});

// code for the entry point, using a switch case to decide which direction to go to
app.get('/entry/:direction', (req,res) => {

    if(req.session && req.session.username){
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
                res.render('entry', {data: true, my_user: req.session.username});
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
                res.render('fridge', {my_user: req.session.username});
                break;
            case 'hallway':
                res.render('hallway');
                break;
        }
    } else {
        res.redirect('/')
    }
    
});


app.listen(port,() => {
    console.log(`app is listening on port ${port}`);
});


require("dotenv").config()

const express = require('express');
const bodyParser = require('body-parser');

const postroute = require('./routes/postroute');
const userpostroute = require('./routes/userroute');

const {graphqlHTTP}=require('express-graphql');
const graphqlSchema=require('./graphql/schema');
const graphqlResolver=require('./graphql/resolvers');
const port=process.env.PORT||4000;
const app = express();
const mongoose = require('mongoose');
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if(req.method==='OPTIONS'){
        return res.sendStatus(200);
    }
    next();
});
const product = require("../backend/model/post");
console.log(port);
app.use('/post', postroute);
app.use('/user', userpostroute);
app.use('/graphql',graphqlHTTP({
    schema:graphqlSchema,
    rootValue:graphqlResolver,
    graphiql: true,

}));
mongoose.connect('mongodb+srv://jaisoni:JaiSoni@react-node-app.ciiujfr.mongodb.net/?retryWrites=true&w=majority' ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(res => {
         app.listen(port);
        
    });






















// const express = require('express');
// const bodyParser = require('body-parser');

// const postroute = require('./routes/postroute');
// const userpostroute = require('./routes/userroute');

// const {graphqlHTTP}=require('express-graphql');
// const graphqlSchema=require('./graphql/schema');
// const graphqlResolver=require('./graphql/resolvers');
// const port=process.env.PORT||4000;
// const app = express();
// const mongoose = require('mongoose');
// app.use(bodyParser.json());

// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//     if(req.method==='OPTIONS'){
//         return res.sendStatus(200);
//     }
//     next();
// });
// const product = require("../backend/model/post");

// app.use('/post', postroute);
// app.use('/user', userpostroute);
// app.use('/graphql',graphqlHTTP({
//     schema:graphqlSchema,
//     rootValue:graphqlResolver,
//     graphiql: true,

// }));
// mongoose.connect('mongodb://127.0.0.1:27017/userpost')
//     .then(res => {
//          app.listen(port);
        

//     });










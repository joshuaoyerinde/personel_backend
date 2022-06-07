require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
app.use(cookieParser());
const mongoose = require('mongoose')
const route = require('./router/index')
const http = require('http');
const cors = require('cors');
// const socketIO = require('socket.io');
const server = http.createServer(app)
// const checkjwt = require('./Controllers/middleware')

//sockect cors

const { MONGO_URI, API_PORT } =  process.env
const port = process.env.PORT || API_PORT;

app.use('./uploads/',express.static('uploads'))
app.use(express.urlencoded({extended:false}))
app.use(express.json());
//conneting data base
mongoose.connect(MONGO_URI,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(res=>{
    server.listen(port,()=>{
        console.log("database is connected"+" " +port)
    })
}).catch(err => console.log(err))

//for cors origin
app.use(cors({origin:'*'}))


app.get('/', (req,res)=>{
    res.send('hello josh')
})

// initiallizing the app ......
app.use('/api', route)

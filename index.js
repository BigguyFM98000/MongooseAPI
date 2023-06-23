const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const cluster =  require("cluster");
const { cpus } = require("os");
const { pid } = require("process");

const authRoutes = require('./Server/routes/auth_routes');
const userRoutes = require('./Server/routes/user_routes');
const employeeRoutes = require('./Server/routes/employee_routes');
const googleLoginRoutes = require('./Server/routes/googleoauth');
const resetPasswordRoutes = require('./Server/routes/reset_password');
const PORT = process.env.PORT || 8001;
const cors = require('cors');

const corsOptions = {
    origin: ["https://hrconnectapi.onrender.com/", 'https://hrconnectapi.onrender.com/auth/signin', 'https://hrconnectapi.onrender.com/auth/signup', 'https://hrconnectapi.onrender.com/employee', "https://hrconnectapi.onrender.com/user/:id" , "https://hrconnectapi.onrender.com/google", "http://localhost:3000", "*", "https://hr-connect.vercel.app/", "http://localhost:8001", "http://localhost:8001/users", "http://localhost:8001/employees", "http://localhost:8001/reset/forgotpassword", "http://localhost:8001/reset/status", "http://localhost:8001/reset/password/:token", "http://localhost:8001/auth", "http://localhost:8001/google", "http://localhost:10000", "https://hrconnectapi.onrender.com/reset/forgotpassword", "https://hrconnectapi.onrender.com/user/status", "https://hrconnectapi.onrender.com/reset/password/:token","https://hrconnectapi.onrender.com/user/files", cors()]
}

// Middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
const apiLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

mongoose.connect(`mongodb+srv://${process.env.APP_USER}:${process.env.APP_PASS}@webmobileapplication.jx4opz3.mongodb.net/${process.env.APP_COLLECTION}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
  }).then(() => {
    console.log('Connected to MongoDB instance');
}).catch((err) => {
    console.log(err.message);
});

if (cluster.isPrimary) {
    console.log(`Primary ${pid} is running`);
  
    // Fork workers.
    for (let i = 0; i < cpus().length; i++) {
      cluster.fork();
    }
  
    cluster.on("exit", (worker) => {
      console.log(`worker ${worker.process.pid} died`);
    });
  } else {

    app.get('/', (req, res) => {
        res.json({message: "Welcome to my MongoDB API" });
    });
    
    //routes middleware
    app.use('/auth', apiLimiter, authRoutes);
    app.use('/users', apiLimiter, userRoutes);
    app.use('/employees', apiLimiter, employeeRoutes);
    app.use('/googlelogin', apiLimiter, googleLoginRoutes);
    app.use('/reset', apiLimiter, resetPasswordRoutes);
    
    app.listen(PORT, () => {
        console.log(`Server started on http://localhost:${PORT}`);
    });

    console.log(`Worker ${pid} started`);

  }


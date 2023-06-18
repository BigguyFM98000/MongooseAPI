const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const authRoutes = require('./Server/routes/auth_routes');
const userRoutes = require('./Server/routes/user_routes');
const employeeRoutes = require('./Server/routes/employee_routes');
const googleRoutes = require('./Server/routes/google_route');
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

mongoose.connect(`mongodb+srv://${process.env.APP_USER}:${process.env.APP_PASS}@webmobileapplication.jx4opz3.mongodb.net/${process.env.APP_COLLECTION}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
  }).then(() => {
    console.log('Connected to MongoDB instance');
}).catch((err) => {
    console.log(err.message);
});

app.get('/', (req, res) => {
    res.json({message: "Welcome to my MongoDB API" });
});

//routes middleware
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/employees', employeeRoutes);
app.use('/google', googleRoutes);
app.use('/reset', resetPasswordRoutes);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
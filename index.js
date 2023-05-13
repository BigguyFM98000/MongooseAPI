const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const authRoutes = require('./Server/routes/auth_routes');
const userRoutes = require('./Server/routes/user_routes');
const employeeRoutes = require('./Server/routes/employee_routes');
const googleRoutes = require('./Server/routes/google_route');
const PORT = process.env.PORT || 8001;
const cors = require('cors');

const corsOptions = {
    origin: ["https://hrconnectapi.onrender.com/", 'https://hrconnectapi.onrender.com/auth/signin', 'https://hrconnectapi.onrender.com/signup', 'https://hrconnectapi.onrender.com/employee', "https://hrconnectapi.onrender.com/user" , "https://hrconnectapi.onrender.com/google", "http://localhost:3000", "*", "https://hr-connect-app.vercel.app", "http://localhost:8001", "http://localhost:10000"]
}

// Middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(process.env.CONN_STRING, {
    useNewUrlParser: true,
  }).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err.message);
});

app.get('/', (req, res) => {
    res.json({message: "Welcome to my MongoDB API" });
});

//routes middleware
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/employee', employeeRoutes);
app.use('/google', googleRoutes);

app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
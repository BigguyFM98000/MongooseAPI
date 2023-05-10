const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();
const configData = require('./Server/configs/db_config');
const authRoutes = require('./Server/routes/auth_routes');
const userRoutes = require('./Server/routes/user_routes');
const employeeRoutes = require('./Server/routes/employee_routes');
const googleRoutes = require('./Server/routes/google_route');
const PORT = process.env.PORT || configData.PORT;
const cors = require('cors');

app.use(cors());

mongoose.connect(process.env.conn_string || configData.conn_string, {
    useNewUrlParser: true,
  }).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err.message);
});

// Middlewares
app.use(bodyParser.json());

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
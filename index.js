const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const configData = require('./Server/configs/db_config')
const authRoutes = require('./Server/routes/auth_routes')
const userRoutes = require('./Server/routes/user_routes')
const employeeRoutes = require('./Server/routes/employee_routes')

mongoose.connect(configData.conn_string, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err.message);
})

// Middlewares
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({message: "Welcome to my MongoDB API" });
});

//routes middleware
app.use('/auth', authRoutes);
app.use('/user', userRoutes)
app.use('/employee', employeeRoutes)

app.listen(configData.PORT, () => {
    console.log(`Server started on http://localhost:${configData.PORT}`);
});
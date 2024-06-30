require('dotenv').config();

const app = require('./app')
const mongoose = require('mongoose')

// MongoDB Connection String
const connString = process.env.CONN
const PORT = process.env.PORT || 5000

// Connecting to MongoDB
mongoose.connect(connString)
    .then(() => {
        console.log("Database Connected")
    })
    .catch(err => console.log(err))


app.listen(PORT, (req, res) => {
    console.log('Server is running on port ' + PORT);
})
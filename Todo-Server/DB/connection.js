const mongoose = require('mongoose')
const connectionString = process.env.DATABASE
mongoose.connect(connectionString).then(() => {
    console.log("MongoDB connection Success")
}).catch((err) => {
    console.log("MongoDB connection failed")
    console.log(err)
})
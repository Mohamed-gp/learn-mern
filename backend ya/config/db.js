const mongoose = require("mongoose")

const connectToDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("connected succsefully")
    } catch (error) {
        console.log(err)
    }
}

module.exports = connectToDB


// old syntax 
// mongoose.connect(process.env.MONGO_URI)
// .then(() => {console.log("connected succsefully")})
// .catch(err => console.log(err))
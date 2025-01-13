import mongoose from "mongoose"

const connectToDB = async () => {
    try {
        const dbConnection = await mongoose.connect(process.env.MONGODB_URL)
        console.log("MONGODB Connected! Connection HOST:", dbConnection.connection.host)
    } catch (error) {
        console.log("Mongodb Error:", error)
        throw new Error(error)
    }
}

export default connectToDB
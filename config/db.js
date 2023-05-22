import mongoose from "mongoose";

const connectdb=async (DATABASE_URL)=>{
    try {
        const DB_OPTIONS={
            dbname:'AUTHJWT'
        }
        await mongoose.connect(DATABASE_URL,DB_OPTIONS)
        console.log('Connected Succesfully')
        
    } catch (error) {
        console.log(error);
        
    }
}

export default connectdb;
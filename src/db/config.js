import mongoose from 'mongoose'

export async function init() {
    try {
        console.log("Database Connecting..");

        const connect = mongoose.connect(process.env.MONGODB_URL,{
            dbName: 'users'
        });

        connect.then(() => {
            console.log("Mongo Connected..");
        }).catch((error) => {
            console.log("Mongo Connection Error ",error);
        })
        
    } catch (error) {
        console.log("Mongo Error ",error);
    }
}
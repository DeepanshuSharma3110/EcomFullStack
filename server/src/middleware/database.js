import mongoose from "mongoose";

const database = mongoose.connect(process.env.DATABASE_URI)
                .then((response)=>('database got connected'))
                .catch((err)=>{(err)})
export default database;
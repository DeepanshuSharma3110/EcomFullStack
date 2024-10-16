import app from './index.js';
import database from './src/middleware/database.js';
const port = process.env.PORT;
app.listen(port,()=>{
    console.log('server is listning on port no :',port);
    database;
});

import express from 'express';
import dotenv from 'dotenv';
import errorHandler from './src/middleware/errorHandler.js';
import userRought from './src/user/userRought.js';
import cors from 'cors';
import adminRought from './src/admin/adminRought.js';
import path from 'path';
import itemRought from './src/items/itemRought.js';
import cookieParser from 'cookie-parser';
import cartRought from './src/Cart/cartRought.js';
import OrderRought from './src/order/orderRought.js';

const app = express();
//middleware 
dotenv.config();
app.use(cors(
{
    origin:process.env.CLIENT,
    credentials: true
}
));


const __dirname = path.resolve();
app.use(express.json())
app.use('/images', express.static(path.join('public/images')));
app.use(express.urlencoded({}));
app.use(cookieParser());


///apiAdmin/addItem
app.use('/apiUser',userRought);
app.use('/apiAdmin',adminRought);
app.use('/apiProducts',itemRought);
app.use('/apiCart',cartRought);
app.use('/apiOrder',OrderRought);

app.use(express.static(path.join(__dirname,'client','build')));
app.get('*',(_,res)=>{
    res.sendFile(path.resolve(__dirname,"index.html"));
})

app.use(errorHandler);



export default app;

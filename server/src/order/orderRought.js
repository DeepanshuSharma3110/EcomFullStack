// import express from 'express';
// import jwtAuth from '../middleware/jwtAuth.js';
// import { addOrder, getAll,getAllUsersOrders, updateOrderStatus , addPrepaidOrder} from './orderController.js';
// import Razorpay from 'razorpay';



// const OrderRought = express.Router();



// OrderRought.post('/addOrder',jwtAuth, addOrder);
// OrderRought.get('/getAll',jwtAuth,getAll);
// OrderRought.get('/getAllUsersOrders',getAllUsersOrders);
// OrderRought.post('/updateOrderStatus',updateOrderStatus);
// OrderRought.post('/addPrepaidOrder',addPrepaidOrder)




// OrderRought.post('/payment', async (req, res) => {
//   const razorpay = new Razorpay({
//     key_id: process.env.YOUR_RAZORPAY_KEY_ID,
//     key_secret: process.env.YOUR_RAZORPAY_KEY_SECRET
// })

// const options = {
//     amount: req.body.amount,
//     currency: req.body.currency,
//     receipt: "receipt#1",
//     payment_capture: 1
// }

// try {
//     const response = await razorpay.orders.create(options)

//     res.json({
//         order_id: response.id,
//         currency: response.currency,
//         amount: response.amount
//     })
// } catch (error) {
//     res.status(500).send("Internal server error")
// }
// });


// OrderRought.get("/payment/:paymentId", async(req, res) => {
//   const {paymentId} = req.params;

//   const razorpay = new Razorpay({
//     key_id: process.env.YOUR_RAZORPAY_KEY_ID,
//     key_secret: process.env.YOUR_RAZORPAY_KEY_SECRET
//   })
  
//   try {
//       const payment = await razorpay.payments.fetch(paymentId)

//       if (!payment){
//           return res.status(500).json("Error at razorpay loading")
//       }

//       res.json({
//           status: payment.status,
//           method: payment.method,
//           amount: payment.amount,
//           currency: payment.currency
//       })
//   } catch(error) {
//       res.status(500).json("failed to fetch")
//   }
// });
// export default OrderRought;


import express from 'express';
import jwtAuth from '../middleware/jwtAuth.js';
import { addOrder, getAll, getAllUsersOrders, updateOrderStatus, addPrepaidOrder } from './orderController.js';
import Razorpay from 'razorpay';
import dotenv from 'dotenv';

dotenv.config();

const OrderRought = express.Router();

OrderRought.post('/addOrder', jwtAuth, addOrder);
OrderRought.get('/getAll', jwtAuth, getAll);
OrderRought.get('/getAllUsersOrders', getAllUsersOrders);
OrderRought.post('/updateOrderStatus', updateOrderStatus);
OrderRought.post('/addPrepaidOrder', addPrepaidOrder);

const razorpay = new Razorpay({
    key_id: process.env.YOUR_RAZORPAY_KEY_ID || '',
    key_secret: process.env.YOUR_RAZORPAY_KEY_SECRET || ''
});

// Check if the Razorpay keys are set properly
if (!process.env.YOUR_RAZORPAY_KEY_ID || !process.env.YOUR_RAZORPAY_KEY_SECRET) {
    throw new Error("Razorpay key_id or key_secret is not set in environment variables.");
}

OrderRought.post('/payment', async (req, res) => {
    const options = {
        amount: req.body.amount, // Amount should be in paise (subunit of the currency)
        currency: req.body.currency || 'INR',
        receipt: "receipt#1",
        payment_capture: 1
    }

    try {
        const response = await razorpay.orders.create(options);

        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount
        });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).send("Internal server error");
    }
});

OrderRought.get("/payment/:paymentId", async (req, res) => {
    const { paymentId } = req.params;

    try {
        const payment = await razorpay.payments.fetch(paymentId);

        if (!payment) {
            return res.status(500).json("Error at razorpay loading");
        }

        res.json({
            status: payment.status,
            method: payment.method,
            amount: payment.amount,
            currency: payment.currency
        });
    } catch (error) {
        console.error('Error fetching payment:', error);
        res.status(500).json("Failed to fetch payment details");
    }
});

export default OrderRought;

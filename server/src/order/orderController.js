import { add,findAll, findAllUsersOrders, updateStatus, addPrepaid } from "./orderRepository.js";
const addOrder = async(req, res, next) => {
  try {
    const {amount,cart, mode, user} = req.body;
    if(!amount || !cart || !mode || !user){
        const error = {statusCode:401,message:'please try again'}
        return next (error)
    }

    
   const result = await add(amount, cart, mode, user);
   return res.status(201).json(result);
  } catch (err) {
    return next(err)
  }
};


const getAll = async(req,res,next)=>{
  try{
    const userId = req.user.userId;
    const result =await findAll(userId)
    if(result){
      return res.status(200).json(result);
    }return res.status(400).json({message:'No Orders Created', status:false});
  }catch(err){
    return next(err); 
  }
}


//will return the order of all the users present
const getAllUsersOrders = async(req,res,next)=>{
  try{
    const result = await findAllUsersOrders();
    return res.status(200).json(result);
  }catch(err){
    return next(err);
  }
}

const updateOrderStatus = async(req,res,next)=>{
  try{
    const {orderId, newStatus} = req.body;
    if(!orderId || !newStatus){
      error = {statusCode:400, message:'Please Try Again'};
      return next(error);
    }
    const verifyOrder = await updateStatus(orderId, newStatus);
   if(verifyOrder){
     return res.status(200).json(verifyOrder) ;
   }
    error = {statusCode:400, message:'not a valid order'};
    return next(error) ;
  }catch(err){
return next(err);
  }
}


const addPrepaidOrder = async(req,res,next)=>{
  try {
    const {amount,cart, mode, user, responseId} = req.body;
    if(!amount || !cart || !mode || !user || !responseId){
        const error = {statusCode:401,message:'please try again'}
        return next (error)
    }

    
   const result = await addPrepaid(amount, cart, mode, user, responseId);
   return res.status(201).json(result);
  } catch (err) {
    return next(err)
  }
}



export { addOrder, getAll, getAllUsersOrders, updateOrderStatus, addPrepaidOrder };

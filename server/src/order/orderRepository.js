import orderModel from "./orderSchema.js";
const add = async (amount, cart, mode, user) => {
  try {
    
    const result = new orderModel({
      amount,
      cart,
      mode,
      user,
    });


    const saveOrder = await result.save();
   return saveOrder;
  } catch (err) {
    throw err;
  }
};


const addPrepaid =async (amount,cart, mode, user, responseId)=>{
  try {
    
    const result = new orderModel({
      amount,
      cart,
      mode,
      user,
      responseId
    });


    const saveOrder = await result.save();
   return saveOrder;
  } catch (err) {
    throw err;
  }
}

const findAll = async(_id)=>{
  try{
    const result = await orderModel.find({'user._id':_id});
    if(result){
      return result;
    }return null;
  }catch(err){
     throw err;
  }
}


const findAllUsersOrders = async()=>{
  try{
    const result = await orderModel.find();
    return result;
  }catch(err){
    throw err;
  }
}


const updateStatus = async (_id,newStatus)=>{
try{
  const result = await orderModel.findByIdAndUpdate({_id},{status:newStatus});
  if(result){
    return result
  }return null;
}catch(err){
  throw err;
}
}





export { add ,findAll,findAllUsersOrders, updateStatus, addPrepaid};

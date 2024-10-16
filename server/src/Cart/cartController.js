import { add, checkItemPresent,getItems,updateCartQ, deleteCart } from "./cartRepository.js";

const addItem =async (req,res,next)=>{
try{
    const {item} = req.body;
    if(!item || !req.user){
        error = {statusCode:400, message:'some thing went wrong please login again'};
        return next(error);
    }
    const {_id, title, price,image} = item;
    //check if the item is already inside the cart

    const checkItem = await checkItemPresent(_id,req.user.userId)
    if(checkItem){
        const error = {statusCode:400, message:'item already added'}
        return next(error)
    }else{
        const result = await add(_id, title, price,image ,req.user.userId);
        return res.status(201).json({message:'item addes sucessfully', result})
    }

}catch(err){
    next(err);
}
}


const clearCart = async(req,res,next)=>{
    try{
        
        const userId = req.user.userId;
        const result = await deleteCart(userId)
        if(result){
          return  res.status(200).json({message:'Sucess',status:true})
        }else{
           return res.status(200).json({message:'UnSucessfull',status:false})
        }
        
    }catch(err){
        return next (err)
    }
}

const getAllCartItem = async(req,res,next)=>{
    try{
        if(!req.user){
            error = {statusCode:400, message:'some thing went wrong please login again'};
            return next(error)
        }
        const result = await getItems(req.user.userId);
        return res.status(200).json(result);
    }catch(err){
         return next(err)
    }
}

const updateQuantity = async(req,res,next)=>{
    try{
        const{id, quantity, operation}= req.body;
        const userId = req.user; 

        if(!id || !quantity || !operation || !userId.userId){
            error = {statusCode:400, message:'some thing went wrong please login again'};
            return next(error);
        }
        const result = await updateCartQ(id, quantity, operation, userId.userId);

        ('Updated quantity is', id, quantity, operation, userId.userId);
       return res.status(200).json(result);
       
}catch(err){
    return next(err)
}
}



export {addItem, getAllCartItem, updateQuantity,clearCart}
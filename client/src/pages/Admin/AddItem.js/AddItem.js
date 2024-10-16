import React, { useEffect, useState } from 'react';
import style from './AddItem.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { addItem } from '../../../redux/reducers/admin.Reducers.js';
import { fetchAllCategories } from '../../../redux/reducers/ProductReducer.js';

const AddItem = () => {
    const dispatch = useDispatch();
    const [imagePreview, setImagePreview] = useState('');
    const [cate,setCate] = useState([]);

    const [data, setData] = useState({
        title: '',
        description: '',
        categories: '',
        price: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'image') {
            const file = e.target.files[0];
            setData({ ...data, image: file });
            setImagePreview(URL.createObjectURL(file));
        } else {
            setData({ ...data, [name]: value });
        }
    };


    const handleCategorySelect = (category) => {
        setData({ ...data, categories: category });
    };

    const validate = () => {
        const { title, description, categories, price, image } = data;
        if (!title || !description || !categories || !price || !image) {
            toast.error('Please Fill All The Details');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validate()) {
            const formData = new FormData();
            formData.append('title', data.title);
            formData.append('description', data.description);
            formData.append('categories', data.categories);
            formData.append('price', data.price);
            formData.append('image', data.image);

            const response = await dispatch(addItem(formData));

            if (response.meta.requestStatus === "fulfilled") { 
                toast.success('Product Added Successfully'); 
                setData({
                    title: '',
                    description: '',
                    categories: '',
                    price: '',
                    image: ''
                });
                setImagePreview(''); 
            }
        }
    };

 
    const fetchCategories = async () => {
        const result = await dispatch(fetchAllCategories());
        setCate(result.payload);
        
      };

      useEffect(()=>{
        fetchCategories();
      },[dispatch])
    return (
        <div className={style.main}>
            <ToastContainer />
            <div className={style.container}>
                <form onSubmit={handleSubmit}>
                    <input 
                        placeholder='Enter Item Title' 
                        type='text' 
                        name='title' 
                        value={data.title}
                        onChange={handleChange} 
                    />
                    <input 
                        placeholder='Enter Item Description' 
                        type='text' 
                        name='description'
                        value={data.description} 
                        onChange={handleChange} 
                    />
                    <ul>
                { cate && cate.map((i)=>(
                <li onClick={() => handleCategorySelect(i)}>{i}</li>    
                )) }
                    </ul>
                    <input 
                        placeholder='Selected Categories' 
                        type='text' 
                        name='categories' 
                        value={data.categories} 
                        readOnly // Make it read-only if selecting from list
                    />
                    <input 
                        placeholder='Enter Item Price' 
                        type='number' 
                        name='price' 
                        value={data.price} 
                        onChange={handleChange} 
                    />
                    <input 
                        type='file' 
                        placeholder='Upload Image' 
                        name='image' 
                        id='image' 
                        accept="image/*"
                        className={style.image} 
                        onChange={handleChange} 
                    />
                    {imagePreview && <img src={imagePreview} alt="Preview" className={style.imagePreview} />}
                    <button type='submit'>Create</button>
                </form>
            </div>
        </div>
    );
};

export default AddItem;

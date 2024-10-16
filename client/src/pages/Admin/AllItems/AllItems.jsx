import React, { useEffect, useState } from 'react';
import style from './AllItems.module.css';
import useNav from '../../../hooks/useNavHook';
import { useDispatch } from 'react-redux';
import { deleteItem, updateItem } from '../../../redux/reducers/ProductReducer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllItems = ({ item, fetchItems }) => {
  const navigate = useNav();
  const dispatch = useDispatch();
  
  // State to manage updates
  const [editItemId, setEditItemId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState('');
  const [updatedCategories, setUpdatedCategories] = useState('');
  const [updatedPrice, setUpdatedPrice] = useState('');
  const [updatedDescription, setUpdatedDescription] = useState('')
  const handleAdd = () => {
    navigate('/admin-add', 0);
  };

  const handleDelete = async (_id) => {
    const response = await dispatch(deleteItem({ _id }));
    if (response.meta.requestStatus === "fulfilled") {
      toast.success("Item deleted successfully.");
      fetchItems();
    } else {
      toast.error("Failed to delete the item.");
    }
  };

  const handleEdit = (item) => {
    setEditItemId(item._id);
    setUpdatedTitle(item.title);
    setUpdatedCategories(item.categories);
    setUpdatedPrice(item.price);
    setUpdatedDescription(item.description);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const response = await dispatch(updateItem({ _id: editItemId, title: updatedTitle, categories: updatedCategories, price: updatedPrice, description:updatedDescription}));
    if (response.meta.requestStatus === "fulfilled") {
      toast.success("Item updated successfully.");
      fetchItems();
      setEditItemId(null); // Reset the edit state
    } else {
      toast.error("Failed to update the item.");
    }
  };

  useEffect(() => {
    fetchItems();
  }, [dispatch]);

  return (
    <div className={style.main}>
      <button onClick={handleAdd}>Add New Item</button>
      <ul>
        <ToastContainer />
        {item.map((i) => (
          <li key={i._id}>
            <img src={i.image} alt={i.title} />
            <div>
              <p>{i.title}</p>
              <p>{i.categories}</p>
              <p>{i.price}</p>
            </div>
            <button onClick={() => handleDelete(i._id)}>Delete</button>
            <button onClick={() => handleEdit(i)}>Edit</button>
          </li>
        ))}
      </ul>

      {editItemId && (
        <div className={style.updateContainer}>
          <h3>Update Item</h3>
          <form onSubmit={handleUpdateSubmit}>
            <input 
              placeholder='Enter The New Title'
              value={updatedTitle}
              onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <input 
              placeholder='Enter The New Categories'
              value={updatedCategories}
              onChange={(e) => setUpdatedCategories(e.target.value)}
            />
            <input 
              placeholder='Enter The New Price'
              value={updatedPrice}
              onChange={(e) => setUpdatedPrice(e.target.value)}
            />
             <input 
              placeholder='Enter The New Description'
              value={updatedDescription}
              onChange={(e) => setUpdatedDescription(e.target.value)}
            />
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setEditItemId(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AllItems;

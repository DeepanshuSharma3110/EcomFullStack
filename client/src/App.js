
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/NavBar/Navbar";
import Home from "./pages/Home/Home";
import Footer from "./component/Footer/Footer";
import './App.module.css';
import Login from "./pages/Login/Login";
import Cart from "./pages/Cart/Cart";
import Register from "./pages/Register/Register";
import AddItem from "./pages/Admin/AddItem.js/AddItem";
import Profile from "./pages/ProfilePage/Profile";
import Checkout from "./pages/Checkout/Checkout";
import Admin from "./pages/Admin/Admin";

function App() {

  return (
    <BrowserRouter>
    <Navbar />
    <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/login" element={<Login />}/>
    <Route path="/cart" element={<Cart />}/>
    <Route path="/register" element={<Register />} />
    <Route path="/user" element={<Profile />}/>
    <Route path="/checkout" element={<Checkout />} />
    <Route path='/addItem' element={<AddItem />} />
    <Route path="/admin" element={<Admin/>}/>
    <Route path="/admin-add" element={<AddItem />}/>
    </Routes>
    <Footer />
    </BrowserRouter>
  );
}

export default App;

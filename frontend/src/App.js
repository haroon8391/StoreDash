import './App.css';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import PrivateRoute from './Components/PrivateRoute';
import SignUp from './Components/SignUp';
import AddProduct from './Components/AddProduct';
import ProductList from './Components/ProductList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UpdateProduct from './Components/UpdateProduct';
import Profile from './Components/Profile';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route path='/' element={<ProductList />}></Route>
            <Route path='/add' element={<AddProduct />}></Route>
            <Route path='/update/:id' element={<UpdateProduct />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
            <Route path='/logout' element={<h2>Logout</h2>}></Route>
          </Route>
          <Route path='/SignUp' element={<SignUp />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

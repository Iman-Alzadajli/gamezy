import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/include/Navbar';
import Footerr from './components/include/Footerr';
import Home from './pages/Home';
import Products from "./pages/Products";
import Login from "./pages/Login";
import Registration from "./pages/Registration";
import { useAuth } from "./contexts/AuthContext"; 
import Cart from './pages/Cart'; 




import './App.css';

function App() {
  const { currentUser } = useAuth(); // للحصول على المستخدم الحالي

  return (
    <div className="app-container">
      <Navbar />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/cart" element={<Cart />} /> 
         
  

          

          {/* ✅ إذا المستخدم مسجل دخول، امنعه من الدخول لـ login/register */}
          <Route
            path="/login"
            element={!currentUser ? <Login /> : <Navigate to="/" replace />}
          />
          <Route
            path="/register"
            element={!currentUser ? <Registration /> : <Navigate to="/" replace />}
          />
        </Routes>

       

      </div>
      <Footerr />
    </div>
  );
}

export default App;

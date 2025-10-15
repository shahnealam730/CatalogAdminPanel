import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminPanel from "./pages/AdminPanel";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./redux/authSlice";
import { ToastContainer } from "react-toastify";

function App() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  return (
    <Router>
      <ToastContainer />
      <header className="app-header">
        <Link to="/">CatalogAdminPanel</Link>
        <nav>
          <Link to="/">Home</Link>
          {token ? (
            <Link to="/admin">Admin</Link>
          ) : (
            <Link to="/login">AdminLogin</Link>
          )}
          {token && <button onClick={() => dispatch(logout())}>Logout</button>}
        </nav>
      </header>
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;

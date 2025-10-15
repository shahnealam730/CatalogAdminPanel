import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className="app-header">
      <Link to="/">CatalogAdminPanel</Link>
      <nav>
        <Link to="/">Home</Link>
        {token ? (
          <Link to="/admin"></Link>
        ) : (
          <Link to="/login">AdminLogin</Link>
        )}
        {token && <button onClick={() => dispatch(logout())}>Logout</button>}
      </nav>
    </header>
  );
}

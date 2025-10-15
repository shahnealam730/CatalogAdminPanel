import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productsSlice";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";

export default function Home() {
  const dispatch = useDispatch();
  const { items, loading } = useSelector((s) => s.products);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const q = search ? `?search=${encodeURIComponent(search)}` : "";
    dispatch(fetchProducts(q));
  }, [dispatch, search]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🛒 Our Products</h2>
      <input
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.search}
      />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className={styles.grid}>
          {items.map((p) => (
            <div key={p._id} className={styles.card}>
              <img src={p.image || ""} alt={p.name} />
              <div className={styles.info}>
                <h3>{p.name}</h3>
                <p>₹{p.price}</p>
                <Link to={`/product/${p._id}`} className={styles.button}>
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

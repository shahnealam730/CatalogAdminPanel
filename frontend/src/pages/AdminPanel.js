import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProduct } from "../redux/productsSlice";
import { toast } from "react-toastify";
import styles from "./AdminPanel.module.css";

export default function AdminPanel() {
  const token = useSelector((s) => s.auth.token);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [modelUrl, setModelUrl] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        addProduct({ name, price: Number(price), image, modelUrl }, token)
      );
      toast.success("Product added successfully");
      setName("");
      setPrice("");
      setImage("");
      setModelUrl("");
    } catch (err) {
      toast.error("Add failed ");
    }
  };

  if (!token) return <p>Please login as admin.</p>;

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={submit}>
        <h3>Add New Product</h3>
        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          placeholder="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <input
          placeholder="3D Model URL (optional)"
          value={modelUrl}
          onChange={(e) => setModelUrl(e.target.value)}
        />
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

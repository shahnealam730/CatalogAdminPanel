import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./ProductDetail.module.css";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch(console.error);
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={product.image || ""} alt={product.name} />
        <div className={styles.info}>
          <h2>{product.name}</h2>
          <p className={styles.price}>₹{product.price}</p>
          <p className={styles.desc}>
            Explore this amazing product! (3D view omitted)
          </p>
        </div>
      </div>
    </div>
  );
}

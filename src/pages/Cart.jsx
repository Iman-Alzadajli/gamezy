import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/Product.css";

import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const res = await axios.get(
          "https://www.cheapshark.com/api/1.0/deals?storeID=1&pageSize=20"
        );
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching deals:", error);
        setLoading(false);
      }
    };

    fetchDeals();
  }, []);

  const handleAddToCart = (product) => {
    if (!currentUser) {
      // توجيه المستخدم لصفحة تسجيل الدخول مباشرة
      navigate("/login");
      return;
    }

    // بناء المنتج المراد إضافته للسلة (مع quantity = 1)
    const itemToAdd = {
      dealID: product.dealID,
      title: product.title,
      thumb: product.thumb,
      price: product.salePrice,
      quantity: 1,
    };

    dispatch(addToCart(itemToAdd));
  };

  if (loading) return <p>⏳ Loading deals...</p>;

  return (
    <div className="products-container">
      {products.map((product) => (
        <div className="product-card" key={product.dealID}>
          <img src={product.thumb} alt={product.title} loading="lazy" />
          <h2>{product.title}</h2>
          <p>Normal Price: ${product.normalPrice}</p>
          <p>Sale Price: ${product.salePrice}</p>
          <a
            href={`https://www.cheapshark.com/redirect?dealID=${product.dealID}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View Deal
          </a>

          <button
            onClick={() => handleAddToCart(product)}
            className="btn btn-primary mt-2"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default Products;

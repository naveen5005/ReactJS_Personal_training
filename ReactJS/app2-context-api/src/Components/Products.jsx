import React from "react";
import { Link, Outlet } from "react-router-dom";

const Products = () => {
  return (
    <div>
      <h2>Welcome to Products</h2>
      <ul>
        <li>
          <Link to={'electronics'}>Electronics</Link>
        </li>
        <li>
          <Link to={'clothing'}>Clothing</Link>
        </li>
      </ul>
      <Outlet /> {/* Here! */}

    </div>
  );
};

export default Products;

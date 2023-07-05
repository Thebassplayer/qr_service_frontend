import React from "react";
import styles from "./SearchProduct.module.scss";
import { BiSearch } from "react-icons/bi";

const SearchProduct = ({ value, onChange }) => {
  return (
    <div className={styles.search}>
      <BiSearch size={18} className={styles.icon} />
      <input
        type="text"
        placeholder="Search products"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchProduct;

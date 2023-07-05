import { useEffect } from "react";
// Redux
import { useDispatch, useSelector } from "react-redux";
import {
  selectTotalStoreValue,
  selectOutOfStock,
  selectCategory,
  CALC_STORE_VALUE,
  CALT_OUT_OF_STOCK,
  CALC_CATEGORIES,
} from "../../../redux/features/product/productSlice";

// Components
import InfoBox from "../../infoBox/InfoBox";
// Icons
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
// Styles
import "./ProductSummary.scss";

// Icons
const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
const productIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;

// Format Amount
export const formatNumbers = x => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductSummary = ({ products }) => {
  const dispatch = useDispatch();

  // Total Store Value
  const totalStoreValue = useSelector(selectTotalStoreValue);
  // Out of stock Products
  const outOfStock = useSelector(selectOutOfStock);
  // Categories
  const categories = useSelector(selectCategory);

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
    dispatch(CALT_OUT_OF_STOCK(products));
    dispatch(CALC_CATEGORIES(products));
  }, [dispatch, products]);
  return (
    <div className="product-summary">
      <h3 className="--mt">Inventory</h3>
      <div className="info-summary">
        <InfoBox
          icon={productIcon}
          title={"Total Products"}
          count={products.length}
          bgColor="card1"
        />
        <InfoBox
          icon={earningIcon}
          title={"Total Store Value"}
          count={`$${formatNumbers(totalStoreValue.toFixed(2))}`}
          bgColor="card2"
        />
        <InfoBox
          icon={outOfStockIcon}
          title={"Out of Stock"}
          count={outOfStock}
          bgColor="card3"
        />
        <InfoBox
          icon={categoryIcon}
          title={"All Categories"}
          count={categories.length}
          bgColor="card4"
        />
      </div>
    </div>
  );
};

export default ProductSummary;

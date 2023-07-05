import { useEffect } from "react";
// Components
import Card from "../../card/Card";
// Styles
import "./ProductDetail.scss";
// Custom Hooks
import useRedirectLoggedOutUser from "../../../Hooks/useRedirectLoggedOutUser";
// Redux
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../../redux/features/auth/authSlice";
import { getProduct } from "../../../redux/features/product/productSlice";
// React Router
import { useParams } from "react-router-dom";
import { SpinnerImg } from "../../loader/Loader";
// DOM Purify
import DOMPurify from "dompurify";

const ProductDetail = () => {
  useRedirectLoggedOutUser("/login");
  const dispatch = useDispatch();
  const { id } = useParams();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { product, isLoading, isError, message } = useSelector(
    state => state.product
  );
  const stockStatus = quantity => {
    if (quantity > 0) {
      return <span className="--color-success">In Stock</span>;
    }
    return <span className="--color-danger">Out of Stock</span>;
  };

  useEffect(() => {
    if (isLoggedIn === true) {
      dispatch(getProduct(id));
    }

    if (isError) {
      console.log(message);
    }
  }, [isLoggedIn, isError, message]);

  return (
    <div className="product-detail">
      <h3 className="--mt">Product Detail</h3>
      <Card cardClass={"card"}>
        {isLoading && <SpinnerImg />}
        {product && (
          <div className="detail">
            <Card cardClass="group">
              {product?.image ? (
                <img src={product.image.url} alt={product.image.name} />
              ) : (
                <p>No image set for this product</p>
              )}
            </Card>
            <h4>Product Availability: {stockStatus(product.quantity)}</h4>
            <hr />
            <h4>
              <span className="badge">Name: </span> &nbsp; {product.name}
            </h4>
            <p>
              <b>&rarr; SKU : </b>
              {product.sku}
            </p>
            <p>
              <b>&rarr; Category : </b>
              {product.category}
            </p>
            <p>
              <b>&rarr; Price : </b>
              {"$"}
              {product.price}
            </p>
            <p>
              <b>&rarr; Quantity in Stock : </b>
              {product.quantity}
            </p>
            <p>
              <b>&rarr; Total value in Stock : </b>
              {"$"}
              {product.quantity * product.price}
            </p>
            <hr />
            <p>
              <b>&rarr; Description : </b>
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(product.description),
              }}
            ></div>
            <hr />
            <code className="--color-dark">
              Created on: {product.createdAt.toLocaleString("es-AR")}
            </code>
            <br />
            <code className="--color-dark">
              Last Updated: {product.updatedAt.toLocaleString("es-AR")}
            </code>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ProductDetail;

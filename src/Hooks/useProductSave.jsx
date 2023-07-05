import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  updateProduct,
  getProducts,
} from "../redux/features/product/productSlice.js";
import { useNavigate } from "react-router-dom";
import useImageProductUploader from "./useImageProductUploader.jsx";

const useProductSave = initialState => {
  const [product, setProduct] = useState(initialState);
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { productImage, imagePreview, handleImageChange } =
    useImageProductUploader();

  const saveProductOnDB = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", product?.name);
    formData.append("category", product?.category);
    formData.append("quantity", product?.quantity);
    formData.append("price", product?.price);
    formData.append("description", description);
    if (productImage) {
      formData.append("image", productImage);
    }

    // Dispatch the appropriate action based on the component
    if (initialState.id) {
      // Update product
      await dispatch(updateProduct({ id: initialState.id, formData }));
    } else {
      // Create product
      await dispatch(createProduct(formData));
    }

    // Perform common actions for both components
    await dispatch(getProducts());
    navigate("/dashboard");
  };

  return {
    product,
    setProduct,
    description,
    setDescription,
    productImage,
    imagePreview,
    handleImageChange,
    saveProductOnDB,
  };
};

export default useProductSave;

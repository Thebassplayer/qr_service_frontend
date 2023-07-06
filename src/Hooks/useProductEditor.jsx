import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  updateProduct,
  getProducts,
} from "../redux/features/product/productSlice";
import { useNavigate, useParams } from "react-router-dom";

const useProductEditor = (
  initialProduct,
  initialDescription,
  onSave,
  productImage
) => {
  const { id } = useParams();
  const [product, setProduct] = useState(initialProduct);
  const [description, setDescription] = useState(initialDescription);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = e => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async e => {
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

    await onSave(formData);
  };

  return {
    product,
    description,
    handleInputChange,
    handleSubmit,
    setProduct,
    setDescription,
  };
};

export default useProductEditor;

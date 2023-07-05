import { useEffect, useState } from "react";
// Redux
import { useSelector, useDispatch } from "react-redux";
import {
  FILTER_PRODUCTS,
  selectFilteredPoducts,
} from "../../../redux/features/product/filterSlice";
import {
  deleteProduct,
  getProducts,
} from "../../../redux/features/product/productSlice";
// React Router
import { Link } from "react-router-dom";
// Components
import { SpinnerImg } from "../../loader/Loader";
import SearchProduct from "../searchProduct/SearchProduct";
import ReactPaginate from "react-paginate";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
// Utilitys
import nameShorter from "../../../utils/nameShorter.js";
//Styles
import "./ProductList.scss";
// Icons
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { AiOutlineEye } from "react-icons/ai";

const ProductList = ({ products, isLoading }) => {
  const [searchInputValue, setSearchInputValue] = useState("");
  const filteredProducts = useSelector(selectFilteredPoducts);
  const dispatch = useDispatch();

  // Delete Pop up
  const handleDeleteProduct = async id => {
    await dispatch(deleteProduct(id));
    dispatch(getProducts());
  };

  const confirmDelete = id => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure you want to delete this product",
      buttons: [
        {
          label: "Delete",
          onClick: () => handleDeleteProduct(id),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  //   Begin Pagination
  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(filteredProducts.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(filteredProducts.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, filteredProducts]);

  const handlePageClick = event => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };
  //   End Pagination

  useEffect(() => {
    dispatch(FILTER_PRODUCTS({ products, searchInputValue }));
  }, [products, searchInputValue, dispatch]);

  return (
    <div className="product-list">
      <hr />
      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h3>Inventory Items</h3>
          </span>
          <span>
            <SearchProduct
              value={searchInputValue}
              onChange={e => setSearchInputValue(e.target.value)}
            />
          </span>
        </div>
        {isLoading && <SpinnerImg />}
        <div className="table">
          {!isLoading && products.length === 0 ? (
            <p>No product found, please add a product</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((product, index) => {
                  const { _id, name, category, price, quantity } = product;
                  return (
                    <tr key={_id}>
                      <td>{index + 1}</td>
                      <td>{nameShorter(name, 18)}</td>
                      <td>{category}</td>
                      <td>{`$${price}`}</td>
                      <td>{quantity}</td>
                      <td>{`$${price * quantity}`}</td>
                      <td className="icons">
                        <span>
                          <Link to={`/product-detail/${_id}`}>
                            <AiOutlineEye size={25} color={"purple"} />
                          </Link>
                        </span>
                        <Link to={`/edit-product/${_id}`}>
                          <span>
                            <FaEdit size={20} color={"green"} />
                          </span>
                        </Link>
                        <span>
                          <FaTrashAlt
                            size={20}
                            color={"red"}
                            onClick={() => confirmDelete(_id)}
                          />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default ProductList;

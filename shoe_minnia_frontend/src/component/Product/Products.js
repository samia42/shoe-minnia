import React, { useEffect, useState } from "react";
import { Container, Grid, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getProduct } from "../../actions/productAction";
import ProductCard from "../Home/ProductCard";
import "./productDetail.css";
// import Pagination from "react-js-pagination";
import Pagination from "@mui/material/Pagination";
import Header from "../../component/layout/Header/Header";

const categories = ["Laptop", "FootWear", "Shoes"];

function Products(props) {
  const dispatch = useDispatch();

  const [page, setPage] = React.useState(1);
  const [category, setCategory] = useState("Shows");

  const handleChange = (event, value) => {
    setPage(value);
  };

  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProduct(page));
  }, [dispatch, page]);
  return (
    <>
      <Container>
        {/* <Typography>Categories</Typography> */}
        {/* <ul>
        {categories.map((item) => {
          <li
            className="category-link"
            key={category}
            onClick={() => setCategory(item)}
          >
            {item}
          </li>;
        })}
      </ul> */}

        <div className="all-products">
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
        {}
        {resultPerPage < productsCount && (
          <div className="pagination">
            <Pagination count={10} page={page} onChange={handleChange} />
          </div>
        )}
      </Container>
    </>
  );
}

export default Products;

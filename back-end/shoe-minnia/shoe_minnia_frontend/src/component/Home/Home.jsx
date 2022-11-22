import React, { Fragment } from "react";
import Footer from "../layout/Footer/Footer";
import Header from "../layout/Header/Header";
import { getProduct } from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import "./home.css";
import Product from "./ProductCard";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import Toast from "../Toast/Toast";
import UserOptions from "../layout/Header/UserOptions";

const Home = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    if (error) {
      return Toast(error, "error");
    }
    dispatch(getProduct());
  }, [dispatch, error]);

  // eslint-disable-next-line no-restricted-globals
  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="mainContainer">
            {isAuthenticated && <UserOptions user={user} />}

            <div className="banner">
              <p>Welcome to Shoe Minnia</p>
              <h1>Find Amazing Products Below</h1>
              <a href="#container">
                <button>Scroll</button>
              </a>
            </div>
          </div>

          <h2 className="homeHeading">Featured Products</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              ))}
          </div>
          <Footer />
        </Fragment>
      )}
    </>
  );
};

export default Home;

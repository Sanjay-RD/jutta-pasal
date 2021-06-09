import React, { useEffect } from "react";
import { getTopProducts } from "../actions/productAction";
import Loader from "./Loader";
import Message from "./Message";

import { useSelector, useDispatch } from "react-redux";
import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

const ProductCarousel = () => {
  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { products, loading, error } = productTopRated;

  useEffect(() => {
    dispatch(getTopProducts());
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Carousel pause="hover" className="bg-dark">
          {products.map((product) => (
            <Carousel.Item key={product._id}>
              <Link to={`/product/${product._id}`}>
                <Image src={product.image} alt={product.name} fluid />
                <Carousel.Caption className="carousel-caption">
                  <h3>
                    {product.name} (
                    <span style={{ textTransform: "capitalize" }}>Rs:</span>{" "}
                    {product.price})
                  </h3>
                </Carousel.Caption>
              </Link>
            </Carousel.Item>
          ))}
        </Carousel>
      )}
    </>
  );
};

export default ProductCarousel;

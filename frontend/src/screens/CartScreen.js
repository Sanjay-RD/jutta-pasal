import React, { useEffect } from "react";
import { connect } from "react-redux";
import { addToCart, removeToCart } from "../actions/cartAction";
import Message from "../components/Message";

import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const CartScreen = ({
  match,
  location,
  history,
  addToCart,
  cartItem,
  removeToCart,
}) => {
  const productId = match.params.id;

  console.log(productId);

  const qty = location.search ? Number(location.search.split("=")[1]) : 1;

  useEffect(() => {
    addToCart(productId, qty);
  }, []);

  const removeFromCartHandler = (id) => {
    console.log("Remove Cart");
    removeToCart(id);
  };

  const checkoutHandler = () => {
    console.log("checkout");
    history.push("/login?redirect=shipping");
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItem.length === 0 ? (
          <Message>
            Your Cart is Empty <Link to="/">Back</Link>{" "}
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItem.map((item) => (
              <ListGroup.Item key={item.product}>
                <Row>
                  <Col md={2}>
                    <Image
                      src={item.image}
                      alt={cartItem.image}
                      fluid
                      rounded
                    />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </Col>
                  <Col md={2}>Rs: {item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as="select"
                      value={item.qty}
                      onChange={(e) =>
                        addToCart(item.product, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <i className="fas fa-trash"></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>
                Subtotal ({cartItem.reduce((acc, item) => acc + item.qty, 0)})
                Items
              </h3>
              Rs:{" "}
              {cartItem
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item>
              <Button
                type="button"
                className="btn-block"
                disabled={cartItem.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

const mapStateToProps = (state) => {
  return {
    cartItem: state.cart.cartItem,
  };
};

export default connect(mapStateToProps, { addToCart, removeToCart })(
  CartScreen
);

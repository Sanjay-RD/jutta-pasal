import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push("/");
    }
  };

  return (
    <Form onSubmit={searchHandler} inline>
      <Form.Control
        type="text"
        placeholder="search..."
        className="mr-sm-2 ml-sm-5"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button variant="outline-success" type="submit" className="p-2">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;

import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Items from "../Items/Items";
import backendServer from "../../webconfig";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [sortType, setSortType] = useState("");

  useEffect(() => {
    console.log("Fetch items");
    fetchItems();
  }, []);

  const types = {
    price: "price",
    quantity: "available_quantity",
    salescount: "salescount",
  };

  useEffect(() => {
    const sortItems = (type) => {
      const sortProperty = types[type];
      const sorted = [...filteredItems].sort(
        (a, b) => b[sortProperty] - a[sortProperty]
      );
      setFilteredItems(sorted);
    };

    sortItems(sortType);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortType]);

  const filterItems = (searchText) => {
    if (searchText !== "") {
      let filtered = filteredItems.filter(
        (item) =>
          item.itemname.toUpperCase().indexOf(searchText.toUpperCase()) !== -1
      );
      setFilteredItems(filtered);
    } else {
      const sortProperty = types[sortType];
      const sorted = [...items].sort(
        (a, b) => b[sortProperty] - a[sortProperty]
      );
      setFilteredItems(sorted);
    }
  };

  const fetchItems = async () => {
    console.log("Fetching Items in dashboard");
    const token = sessionStorage.getItem("token");
    let res = await fetch(`${backendServer}/api/items/`, {
      method: "GET",
      headers: {
        "auth-token": token,
        "Content-Type": "application/json",
      },
      mode: "cors",
    });
    let result = await res.json();
    if (result) {
      setItems(result);
      setFilteredItems(result);
      setSortType("price");
    }
    console.log("Items" + result);
  };

  return (
    <div>
      <Navbar onSearch={filterItems}></Navbar>
      <Row>
        <Col xs={2}>Filer by price</Col>
        <Col xs={8}></Col>
        <Col xs={2}>
          <select onChange={(e) => setSortType(e.target.value)}>
            <option value="price">Price</option>
            <option value="quantity">Quantity</option>
            <option value="salescount">Sales count</option>
          </select>
        </Col>
      </Row>

      <Items items={filteredItems}></Items>
    </div>
  );
}

export default Dashboard;
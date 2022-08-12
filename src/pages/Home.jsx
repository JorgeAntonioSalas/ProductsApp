import React from 'react';
import { useEffect, useState } from 'react';
import { filterProductThunk, getProductsThunk, filterCategoryThunk } from '../store/slices/products.slice';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {Row, Card, Col, InputGroup, Form, Button, ListGroup} from 'react-bootstrap';
import axios from "axios";


const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchValue, setSearchValue] = useState("");
    const [ categories, setCategories ] = useState([]);

    const products = useSelector(state => state.products);

    useEffect(()=> {
        dispatch(getProductsThunk())

        axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/products/categories')
            .then(res => setCategories(res.data.data.categories));

    },[])

    console.log(filterCategoryThunk);

    return (
        <div>
          <Row>
            <Col lg={3}>
              <ListGroup>
              {categories.map((category) => (
                  <ListGroup.Item
                    key={category.id}
                    onClick={() => dispatch(filterCategoryThunk(category.id))}
                  >
                    {category.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Col>
            <Col>
              <h1>Home</h1>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="Recipient's username"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={(e) => setSearchValue(e.target.value)}
                  value={searchValue}
                />
                <Button
                  variant="outline-secondary"
                  onClick={() => dispatch(filterProductThunk(searchValue))}
                >
                  Button
                </Button>
              </InputGroup>
    
              <Row xs={1} md={2} xl={3} className="g-4">
                {products.map((productsItem) => (
                  <Col key={productsItem.id}>
                    <Card onClick={() => navigate(`/product/${productsItem.id}`)}>
                      <Card.Img variant="top" src={productsItem.productImgs} />
                      <Card.Body>
                        <Card.Title>{productsItem.title}</Card.Title>
                        <Card.Text>{productsItem.price}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        </div>
      );
    };
    
    export default Home;
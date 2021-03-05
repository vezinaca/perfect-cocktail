import React, { useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
// import "../Boostrap.css";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import FormGroup from "react-bootstrap/FormGroup";
import Label from "react-bootstrap/FormLabel";
import FormControl from "react-bootstrap/FormControl";
import Cocktail from "../components/Cocktail";

export default function Favorites(){
    return(
        <Container className="mt-5">
            <Row className="justify-content-center">
                
                    <Jumbotron className="col-12 col-md-10">
                        <h1 className="text-center">My Favorites</h1>
                        <Row>
                            <Col>
                            <table id="favorites" class="table table-light">
                                    <thead class="bg-danger">
                                        <tr>
                                            <th scope="col">Image</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">View</th>
                                            <th scope="col">Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody></tbody>
                                </table>
                                
                            </Col>
                        </Row>
                        
                       
                    </Jumbotron>
                
            </Row>
            

        </Container>
        
    )
}
import React, { useState } from "react";
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

// Search cocktail by name
// https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita


export default function Home(){

    const [cocktailName, setCocktailName] = useState([]);
    const [cocktails, setCocktails] = useState([]);

     async function fetchCocktail(e){
        e.preventDefault();
        const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`);
        const data = await res.json();
        console.log('les drinks: ', data.drinks);
        setCocktails(data.drinks);




    }
    return(
        <Container>
            <Row className="justify-content-center">
                <Col>
                    <Jumbotron>
                        <h1 className="text-center">Search Cocktails by Name</h1>
                        <Row>
                            <Col>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Cocktail Name: </Form.Label>
                                        <InputGroup>
                                            
                                        <Form.Control type="text" onChange={(e) => setCocktailName(e.target.value)} value={cocktailName} name="user" placeholder="i.e Margarita"/>
                                        </InputGroup>
                                    </Form.Group>
                                
                                    <Button variant="success" onClick={fetchCocktail}>Get cocktails</Button>
                                </Form>
                            </Col>
                        </Row>
                    </Jumbotron>
                </Col>
            </Row>
            

        </Container>
        
    )
}
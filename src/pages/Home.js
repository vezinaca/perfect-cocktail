import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Cocktail from "../components/Cocktail";

export default function Home(){

    const [cocktailName, setCocktailName] = useState([]);
    const [cocktails, setCocktails] = useState([]);
    
     async function fetchCocktail(e){
        e.preventDefault();
        const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`);
        const data = await res.json();
        setCocktails(data.drinks);
    }

    const allCocktails = cocktails.map(cocktail => (
        <Cocktail key={cocktail.idDrink} cocktail={cocktail} />
    ))

    return(
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Jumbotron className="col-12 col-md-10">
                    <h3 className="text-center">Search Cocktails by Name</h3>
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
                    {cocktails.length !== 0 ? <h3 className="text-center mt-5">Results: <span id="total"></span></h3> : null}
                    <Row className="mt-5">
                        
                            {allCocktails}
                        
                    </Row>
                </Jumbotron>                
            </Row>
        </Container>        
    )
}
import React, { useState, useContext, useEffect } from "react";
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
import Drink from "../components/Drink";


// Search cocktail by name
// https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita

// Filter by alcoholic
// https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic
// https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic

export default function Home(){

    const [drinks, setDrinks] = useState([]);
    const [alcoholics, setAlcoholics] = useState([]);
  
    // Get Drinks By Category
    async function getDrinksByAlcoholicCategory( category ) {
        // Search by Category
        const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${category}`);
        // Wait for response then return JSON
        const data = await res.json();
        //console.log("in getDrinksByCategory in Category.js: ", data.drinks);
        setDrinks(data.drinks)
        
   }

    // Retrieves all the Categories from the REST API
    async  function fetchAlcoholic() {
        const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list');
        // Wait for response and return JSON
        const data = await res.json();
        //console.log(data.drinks);
        setAlcoholics(data.drinks);
   }

    function handleChange(e){
        e.preventDefault();
        
        //console.log('change option', e.target.value);
        getDrinksByAlcoholicCategory(e.target.value);
        
    }

    useEffect(() =>{
        fetchAlcoholic();
    }, [])

    const allDrinks = drinks.map(drink => (
        <Drink key={drink.idDrink} drink={drink} />
    ))
    //console.log(drinks);
    //console.log(drinks.length === 0);
    return(
        
        <Container className="mt-5">
            <Row className="justify-content-center">
                
                    <Jumbotron className="col-12 col-md-10">
                        <h3 className="text-center">Search Cocktails by Alcohol / Non Alcohol</h3>
                        <Row>
                            <Col>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Category Name: </Form.Label>
                                            <Form.Control as="select" onChange={handleChange}>
                                                <option>- Select -</option>
                                                {
                                                    alcoholics.map((alcoholic, index) => (
                                                        <option key={index}>{alcoholic.strAlcoholic}</option>
                                                    ))
                                                }
                                                
                                           </Form.Control>
                                    </Form.Group>
                                    {/* <Button variant="success" onClick={fetchCocktail}>Get cocktails</Button> */}
                                </Form>
                            </Col>
                        </Row>
                        {drinks.length !== 0 ? <h3 className="text-center mt-5">Results: <span id="total"></span></h3> : null}
                        
                        <Row className="mt-5">
                            
                                {allDrinks}
                            
                        </Row>
                    </Jumbotron>
                
            </Row>
            

        </Container>
        
    )
}
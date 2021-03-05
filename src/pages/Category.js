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


export default function Home(){

    const [drinks, setDrinks] = useState([]);
    const [categories, setCategories] = useState([]);
    
    //  async function fetchCocktail(e){
    //     console.log('click');
    //     e.preventDefault();
    //     const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`);
    //     const data = await res.json();
    //     console.log('les drinks: ', data.drinks);
    //     //setCocktails(data.drinks);

    // }

    // Get Drinks By Category
    async function getDrinksByCategory( category ) {
        // Search by Category
        const res = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);
        // Wait for response then return JSON
        const data = await res.json();
        console.log(data.drinks);
        setDrinks(data.drinks)
        
   }

    // Retrieves all the Categories from the REST API
    async  function fetchCategories() {
        const res = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        // Wait for response and return JSON
        const data = await res.json();
        console.log(data.drinks);
        setCategories(data.drinks);
   }

    function handleChange(e){
        e.preventDefault();
        
        console.log('change option', e.target.value);
        getDrinksByCategory(e.target.value);
        
    }

    useEffect(() =>{
        fetchCategories();
    }, [])

    const allDrinks = drinks.map(drink => (
        <Drink key={drink.idDrink} drink={drink} />
    ))
    return(
        
        <Container className="mt-5">
            <Row className="justify-content-center">
                
                    <Jumbotron className="col-12 col-md-10">
                        <h3 className="text-center">Search Cocktails by Category</h3>
                        <Row>
                            <Col>
                                <Form>
                                    <Form.Group>
                                        <Form.Label>Category Name: </Form.Label>
                                            <Form.Control as="select" onChange={handleChange}>
                                                <option>- Select -</option>
                                                {
                                                    categories.map(category => (
                                                        <option key={category.strCategory}>{category.strCategory}</option>
                                                    ))
                                                }
                                                
                                           </Form.Control>
                                    </Form.Group>
                                    {/* <Button variant="success" onClick={fetchCocktail}>Get cocktails</Button> */}
                                </Form>
                            </Col>
                        </Row>
                        <h3 className="text-center mt-5">Results: <span id="total"></span></h3>
                        <Row className="mt-5">
                            
                                {allDrinks}
                            
                        </Row>
                    </Jumbotron>
                
            </Row>
            

        </Container>
        
    )
}
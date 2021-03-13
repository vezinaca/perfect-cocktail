import React, { useContext, useState } from "react";
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
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { ACTIONS } from "../reducers/FavoritesReducer";

import { FavoriteContext } from "../contexts/FavoritesContext";

export default function Favorites(){

    const [state, dispatch] = useContext(FavoriteContext);
    const [showModal, setShowModal] = useState(false);
    const [myDrink, setMyDrink] = useState({});
    const [ingredients, setIngredients] = useState([]);

    function getIngredients(){
        //console.log('myDrink dans getIngredeints: ', myDrink);
        let ingredients = [];
          for(let i = 1; i < 16; i++) {
               const ingredientMeasure = {};
               if( myDrink[`strIngredient${i}`] !== null ) {
                    ingredientMeasure.ingredient = myDrink[`strIngredient${i}`];
                    ingredientMeasure.measure = myDrink[`strMeasure${i}`];
                    ingredients.push(ingredientMeasure);
               }
          }
          
          setIngredients(ingredients);
      }

    async function getDrinkById(drinkId) {
        
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`);
        const cocktail = await apiResponse.json();
        setMyDrink(cocktail.drinks[0]);
        getIngredients();
    }

    function handleShow(e){
        e.preventDefault();
        getDrinkById(e.target.value);
        setShowModal(true);
    }

    function handleRemove(e){
        
        dispatch({type: ACTIONS.REMOVE_FROM_FAVORITES, payload: e.target.value})
    }

    function handleClose(){
        setShowModal(false);
    }

    const allFavorites = state.favorites.map(favorite => (
        <tr key={favorite.idDrink}>
            <td><img width="100px" src={favorite.strDrinkThumb} alt="problem"></img></td>
            <td>{favorite.strDrink}</td>
            <td><Button size="sm" variant="success" onClick={handleShow} value={favorite.idDrink}>View</Button></td>
            <td><Button size="sm" variant="danger" onClick={handleRemove} value={favorite.idDrink}>Remove</Button></td>
        </tr>
    ))

   
    const allIngredients = ingredients.map(ingredient => (
        <ListGroupItem key={ingredient.ingredient}>{ingredient.ingredient} - {ingredient.measure}</ListGroupItem>
    ))

    return(
        <>
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Jumbotron className="col-12 col-md-10">
                        <h1 className="text-center">My Favorites</h1>
                        <Row>
                            <Col>
                                <Table id="favorites" className="table table-light">
                                
                                        <thead className="bg-danger">
                                            <tr>
                                                <th scope="col">Image</th>
                                                <th scope="col">Name</th>
                                                <th scope="col">View</th>
                                                <th scope="col">Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {allFavorites}
                                        </tbody>
                                </Table>
                            </Col>
                        </Row>
                        
                       
                    </Jumbotron>
                
            </Row>
            

        </Container>

        <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{myDrink.strDrink}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        <ListGroupItem variant="success">Preparation</ListGroupItem>
                        <ListGroupItem >{myDrink.strInstructions}</ListGroupItem>
                        <ListGroupItem variant="success">Ingredients </ListGroupItem>
                        
                            {allIngredients}
                        
                    </ListGroup>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                
                </Modal.Footer>
            </Modal>
        </>
        
    )
}
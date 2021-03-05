import React, { useContext, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { FavoriteContext } from "../contexts/FavoritesContext";
import { ACTIONS } from "../reducers/FavoritesReducer";
import Modal from "react-bootstrap/Modal";
//import { getDrinksByName } from "../utilities/Utilities";


export default function Drink({drink}){

    const [state, dispatch] = useContext(FavoriteContext);
    const [showModal, setShowModal] = useState(false);
    const [myDrink, setMyDrink] = useState({});

    let allIngredients;

    function getIngredients(){
        let ingredients = [];
          for(let i = 1; i < 16; i++) {
               const ingredientMeasure = {};
               if( drink[`strIngredient${i}`] !== null ) {
                    ingredientMeasure.ingredient = drink[`strIngredient${i}`];
                    ingredientMeasure.measure = drink[`strMeasure${i}`];
                    ingredients.push(ingredientMeasure);
               }
          }
          console.log(drink);
          return ingredients;
          

    }

    function addToFavorites(e){
        e.preventDefault();
        console.log('added to fav');
        dispatch({type: ACTIONS.ADD_TO_FAVORITES, payload: drink})
        console.log(state.favorites);
    }

    const handleShow = () => {
        
        console.log("les drinks by name ds handlwShow: " + getDrinksByName(drink.strDrink));
        console.log("myDrink: ", myDrink);
        allIngredients = getIngredients().map(ingredient => (
            <ListGroupItem>{ingredient.ingredient} - {ingredient.measure}</ListGroupItem>
        ))
        setShowModal(true);
    }
    const handleClose = () => setShowModal(false);

    async function getDrinksByName(drinkName) {
        // Search by name
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drinkName}`);
        // Returns a json respone
        const cocktails = await apiResponse.json();
        
        
        const lesDrinks = cocktails.drinks;
        setMyDrink(lesDrinks);
    }

    
    return(
        <>
            <Col md="6" >
                <Card className="my-3 mx-auto" style={{ width: '22rem' }}>
                    <Button onClick={addToFavorites} className="favorite-btn btn btn-outline-info">+</Button>
                    <Card.Img variant="top" src={drink.strDrinkThumb} width="10px"/>
                    <Card.Body>
                        <Card.Title className="text-center">{drink.strDrink}</Card.Title>
                        
                        <Card.Text>
                            
                            <Button onClick={handleShow} variant="success">GET RECIPE</Button>
                        </Card.Text>
                        
                    </Card.Body>
                </Card>
            </Col>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{drink.strDrink}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        <ListGroupItem variant="success">
                            Ingredients
                        </ListGroupItem>
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
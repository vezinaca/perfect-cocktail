import React, { useContext, useEffect, useState } from "react";
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
    const [ingredients, setIngredients] = useState([])

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

    function addToFavorites(e){
        e.preventDefault();
        dispatch({type: ACTIONS.ADD_TO_FAVORITES, payload: drink})
    }

    const handleShow = () => {
        
        //console.log("myDrink dans handleShow: ", myDrink);
        getIngredients();
        setShowModal(true);
    }

    const handleClose = () => setShowModal(false);

    async function getDrinkById(drinkId) {
        
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`);
        const cocktail = await apiResponse.json();
        setMyDrink(cocktail.drinks[0]);
    }

    useEffect(() => {
        getDrinkById(drink.idDrink);
    }, []);

    const allIngredients = ingredients.map(ingredient => (
        <ListGroupItem key={ingredient.ingredient}>{ingredient.ingredient} - {ingredient.measure}</ListGroupItem>
    ))

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
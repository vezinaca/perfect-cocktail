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

    let allIngredients;

    function getIngredients(){
        console.log('myDrink dans getIngredeints: ', myDrink[0]);
        let ingredients = [];
          for(let i = 1; i < 16; i++) {
               const ingredientMeasure = {};
               if( myDrink[0][`strIngredient${i}`] !== null ) {
                    ingredientMeasure.ingredient = myDrink[0][`strIngredient${i}`];
                    ingredientMeasure.measure = myDrink[0][`strMeasure${i}`];
                    ingredients.push(ingredientMeasure);
               }
          }
          console.log("current drink in getIngredients: ", myDrink);
          console.log("ingredients in getIngredients: ", ingredients);
          setIngredients(ingredients);

        //   allIngredients = ingredients.map(ingredient => (
        //     <ListGroupItem>{ingredient.ingredient} - {ingredient.measure}</ListGroupItem>
        // ))
          

    }

    function addToFavorites(e){
        e.preventDefault();
        //console.log('added to fav');
        dispatch({type: ACTIONS.ADD_TO_FAVORITES, payload: drink})
        //console.log(state.favorites);
    }

    const handleShow = () => {
        
        console.log("drink: ", drink);
        console.log("drink.idDrink: ", drink.idDrink);
        //getDrinkById(drink.IdDrink);
        console.log("myDrink dans handleShow: ", myDrink);
        getIngredients();
        //const tousLesIngredients = getIngredients();
        //console.log("tousLesIngredients: ", tousLesIngredients);
        // allIngredients = tousLesIngredients.map(ingredient => (
        //     <ListGroupItem>{ingredient.ingredient} - {ingredient.measure}</ListGroupItem>
        // ))
        // for ( let i = 0; i < 5; i++){
        //     allIngredients.push(<ListGroupItem>allo</ListGroupItem>);

        // }
        console.log('state ingredients: ', ingredients);
        // allIngredients = ingredients.map(ingredient => (
        //  <ListGroupItem>{ingredient.ingredient} - {ingredient.measure}</ListGroupItem>
    // ))
       
        console.log('tous les ListItems: ', allIngredients);
        setShowModal(true);
    }
    const handleClose = () => setShowModal(false);

    async function getDrinkById(drinkId) {
        // Search by ID
        //https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=15300
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`);
        // Returns a json respone
        const cocktail = await apiResponse.json();
        
        //console.log("dans getDrinkById: ", cocktail.drinks);
        setMyDrink(cocktail.drinks);
    }

    // function showIngredients(){
    //     console.log("showIngredietns: ", ingredients);
    // }

    useEffect(() => {
        //console.log('useEffect :', drink.idDrink);
        getDrinkById(drink.idDrink);
        //getIngredients();

    }, []);

    allIngredients = ingredients.map(ingredient => (
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
                {/* <Button variant="secondary" onClick={showIngredients}>
                    Show Ingredients
                </Button> */}
                
                </Modal.Footer>
            </Modal>
        </>
    )
}
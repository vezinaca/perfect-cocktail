import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { FavoriteContext } from "../contexts/FavoritesContext";
import { ACTIONS } from "../reducers/FavoritesReducer";


export default function Drink({drink}){

    const [state, dispatch] = useContext(FavoriteContext);

    // function getIngredients(){
    //     let ingredients = [];
    //       for(let i = 1; i < 16; i++) {
    //            const ingredientMeasure = {};
    //            if( cocktail[`strIngredient${i}`] !== null ) {
    //                 ingredientMeasure.ingredient = cocktail[`strIngredient${i}`];
    //                 ingredientMeasure.measure = cocktail[`strMeasure${i}`];
    //                 ingredients.push(ingredientMeasure);
    //            }
    //       }

    //       return ingredients;

    // }

    function addToFavorites(e){
        e.preventDefault();
        console.log('added to fav');
        dispatch({type: ACTIONS.ADD_TO_FAVORITES, payload: drink})
        console.log(state.favorites);
    }

    // const allIngredients = getIngredients().map(ingredient => (
    //     <ListGroupItem>{ingredient.ingredient} - {ingredient.measure}</ListGroupItem>
    // ))
    const previewImage = drink.strDrinkThumb + "/preview";
    return(
        <>
            <Col md="6" >
                <Card className="my-3 mx-auto" style={{ width: '22rem' }}>
                    <Button onClick={addToFavorites} className="favorite-btn btn btn-outline-info">+</Button>
                    <Card.Img variant="top" src={previewImage} width="10px"/>
                    <Card.Body>
                        <Card.Title className="text-center">{drink.strDrink}</Card.Title>
                        
                        <Card.Text>
                            {/* <ListGroup>
                                <ListGroupItem variant="danger">
                                    Ingredients
                                </ListGroupItem>
                                {/* {allIngredients} 
                            </ListGroup> */}
                            <Button onClick={addToFavorites} variant="success">GET RECIPE</Button>
                        </Card.Text>
                        
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}
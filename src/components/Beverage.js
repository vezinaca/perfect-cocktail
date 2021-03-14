import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { FavoriteContext } from "../contexts/FavoritesContext";
import { ACTIONS } from "../reducers/FavoritesReducer";


export default function Beverage({beverage}){

    const [state, dispatch] = useContext(FavoriteContext);

    function getIngredients(){
        let ingredients = [];
          for(let i = 1; i < 16; i++) {
               const ingredientMeasure = {};
               if( cocktail[`strIngredient${i}`] !== null ) {
                    ingredientMeasure.ingredient = cocktail[`strIngredient${i}`];
                    ingredientMeasure.measure = cocktail[`strMeasure${i}`];
                    ingredients.push(ingredientMeasure);
               }
          }

          return ingredients;

    }

    function addToFavorites(e){
        e.preventDefault();
        dispatch({type: ACTIONS.ADD_TO_FAVORITES, payload: beverage})
    }

    const allIngredients = getIngredients().map((ingredient, index) => (
        <ListGroupItem key={index}>{ingredient.ingredient} - {ingredient.measure}</ListGroupItem>
    ))
    
    return(
        <>
            <Col md="6" >
                <Card className="my-3 mx-auto" style={{ width: '22rem' }}>
                    <Button onClick={addToFavorites} className="favorite-btn btn btn-outline-info">+</Button>
                    <Card.Img variant="top" src={beverage.strDrinkThumb} />
                    <Card.Body>
                        <Card.Title className="text-center">{beverage.strDrink}</Card.Title>
                        <Card.Text className="font-weight-bold">Instructions</Card.Text>
                        <Card.Text>{beverage.strInstructions}</Card.Text>
                            <ListGroup>
                                <ListGroupItem variant="danger">
                                    Ingredients
                                </ListGroupItem>
                                {allIngredients}
                            </ListGroup>
                        <Card.Text className="font-weight-bold">Extra Information: </Card.Text>
                        <Card.Text>
                            <span className="badge badge-pill badge-success">{beverage.strAlcoholic}</span>
                            <span className="badge badge-pill badge-warning">Category: {beverage.strCategory}</span>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}
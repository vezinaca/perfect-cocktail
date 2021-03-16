import React, { useContext } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { FavoriteContext } from "../contexts/FavoritesContext";
import { ACTIONS } from "../reducers/FavoritesReducer";
import {getIngredients} from "../utilities/Utilities"

export default function Cocktail({cocktail}){

    const [state, dispatch] = useContext(FavoriteContext);

    function handleFavorites(e){
        e.preventDefault();
        if (!isFavorite){
            dispatch({type: ACTIONS.ADD_TO_FAVORITES, payload: cocktail})
        } else {
            dispatch({type: ACTIONS.REMOVE_FROM_FAVORITES, payload: cocktail.idDrink})
        }
        
    }

    const allIngredients = getIngredients(cocktail).map((ingredient, index) => (
        <ListGroupItem key={index}>{ingredient.ingredient} - {ingredient.measure}</ListGroupItem>
    ))
    
    //state.cartItems[state.cartItems.findIndex(item => item.idDrink === action.payload)].quantity
    let isFavorite = (state.favorites.findIndex(item => item.idDrink === cocktail.idDrink) !== -1);
    //console.log("isFavorite: ", isFavorite);
    
    // let btnFavText = '';
    

    // if (isFavorite){
    //     btnFavText = '-';
        
    // }
    // else
    //     btnFavText = '+';
        
    let btnFavText = isFavorite ? '-' : '+';

    let classNotFav = 'favorite-btn btn btn-outline-info';
    let classFav = 'favorite-btn btn btn-outline-info is-favorite';

    return(
        <>
            <Col md="6" >
                <Card className="my-3 mx-auto" style={{width: '22rem'}} >
                    {/* <Button onClick={handleFavorites} className={isFavorite ? classNotFav : classFav}>{btnFavText}</Button> */}
                    <button onClick={handleFavorites} className={isFavorite ? classFav : classNotFav}>{btnFavText}</button>
                    <Card.Img variant="top" src={cocktail.strDrinkThumb} />
                    <Card.Body>
                        <Card.Title className="text-center">{cocktail.strDrink}</Card.Title>
                        <Card.Text className="font-weight-bold">Instructions</Card.Text>
                        <Card.Text>{cocktail.strInstructions}</Card.Text>
                            <ListGroup>
                                <ListGroupItem variant="danger">
                                    Ingredients
                                </ListGroupItem>
                                {allIngredients}
                            </ListGroup>
                        <Card.Text className="font-weight-bold">Extra Information: </Card.Text>
                        <Card.Text>
                            <span className="badge badge-pill badge-success">{cocktail.strAlcoholic}</span>
                            <span className="badge badge-pill badge-warning">Category: {cocktail.strCategory}</span>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </>
    )
}
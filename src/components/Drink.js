import React, { useContext, useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { FavoriteContext } from "../contexts/FavoritesContext";
import { ACTIONS } from "../reducers/FavoritesReducer";
import {getIngredients} from "../utilities/Utilities";
import MyModal from "./MyModal";

export default function Drink({drink}){

    const [state, dispatch] = useContext(FavoriteContext);
    const [showModal, setShowModal] = useState(false);
    const [myDrink, setMyDrink] = useState({});
    const [ingredients, setIngredients] = useState([])

    function handleFavorites(e){
        e.preventDefault();
        if (!isFavorite){
            dispatch({type: ACTIONS.ADD_TO_FAVORITES, payload: drink})
        } else {
            dispatch({type: ACTIONS.REMOVE_FROM_FAVORITES, payload: drink.idDrink})
        }
        
    }

    const handleShow = () => {
        
        //console.log("myDrink dans handleShow: ", myDrink);
        setIngredients(getIngredients(myDrink));
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
    
    let isFavorite = (state.favorites.findIndex(item => item.idDrink === drink.idDrink) !== -1);

    let btnFavText = isFavorite ? '-' : '+';
    let classNotFav = 'favorite-btn btn btn-outline-info';
    let classFav = 'favorite-btn btn btn-outline-info is-favorite';

    return(
        <>
            <Col md="6" >
                <Card className="my-3 mx-auto" style={{ width: '22rem' }}>
                    {/* <Button onClick={handleFavorites} className={isFavorite ? classNotFav : classFav}>{btnFavText}</Button> */}
                    <button onClick={handleFavorites} className={isFavorite ? classFav : classNotFav}>{btnFavText}</button>
                    <Card.Img variant="top" src={drink.strDrinkThumb} width="10px"/>
                    <Card.Body>
                        <Card.Title className="text-center">{drink.strDrink}</Card.Title>
                        
                        <Card.Text>
                            
                            <Button onClick={handleShow} variant="success">GET RECIPE</Button>
                        </Card.Text>
                        
                    </Card.Body>
                </Card>
            </Col>
            <MyModal showModal={showModal} handleClose={handleClose} beverage={myDrink} allIngredients={allIngredients} />
        </>
    )
}
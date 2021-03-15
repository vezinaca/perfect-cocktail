import React, { useContext, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Jumbotron from "react-bootstrap/Jumbotron";
import Table from "react-bootstrap/Table";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import { ACTIONS } from "../reducers/FavoritesReducer";
import { FavoriteContext } from "../contexts/FavoritesContext";
import MyModal from "../components/MyModal";
import {getIngredients} from "../utilities/Utilities";

export default function Favorites(){

    const [state, dispatch] = useContext(FavoriteContext);
    const [showModal, setShowModal] = useState(false);
    const [myDrink, setMyDrink] = useState({});
    const [ingredients, setIngredients] = useState([]);   

    async function getDrinkById(drinkId) {        
        const apiResponse = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${drinkId}`);
        const cocktail = await apiResponse.json();
        setMyDrink(cocktail.drinks[0]);
        setIngredients(getIngredients(myDrink));
    }

    function handleShow(e){
        e.preventDefault();
        getDrinkById(e.target.value);
        setShowModal(true);
    }

    function handleRemove(e){   
        console.log('e.target.value dans favs page: ', e.target.value);     
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

   
    const allIngredients = ingredients.map((ingredient, index) => (
        <ListGroupItem key={index}>{ingredient.ingredient} - {ingredient.measure}</ListGroupItem>
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
            <MyModal showModal={showModal} handleClose={handleClose} beverage={myDrink} allIngredients={allIngredients} />
        </>
        
    )
}
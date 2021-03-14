import React from "react";

import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/ListGroupItem";
import Modal from "react-bootstrap/Modal";

export default function MyModal({showModal, handleClose, beverage, allIngredients}){

    return (
        <>
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{beverage.strDrink}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ListGroup>
                        <ListGroupItem variant="success">Preparation</ListGroupItem>
                        <ListGroupItem >{beverage.strInstructions}</ListGroupItem>
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
    );
}
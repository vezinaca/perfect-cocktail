import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
// import "../Boostrap.css";
import Nav from "react-bootstrap/Nav";
import NavLink from "react-bootstrap/NavLink";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

export default function Header(){
    return(
        <>
            <header>
                <Nav className="navbar navbar-expand-lg navbar-dark bg-secondary"> 
                    <Container>
                        <ul className="navbar-nav mr-auto">
                            <Nav.Item>
                                <Nav.Link as={Link} to="/"><li><h4 className="sitename">PERFECT<span>COCKTAIL</span></h4></li></Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/"><li className="nav-item">Cocktail Name</li></Nav.Link>
                            </Nav.Item>  
                            <Nav.Item>
                                <Nav.Link as={Link} to="/ingredient"><li>Ingredient</li></Nav.Link>
                            </Nav.Item>  
                            <Nav.Item>
                                <Nav.Link as={Link} to="/category"><li>Category</li></Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link as={Link} to="/alcoholic"><li>Alcohol/non alcohol</li></Nav.Link>
                            </Nav.Item>  
                        </ul>     
                        <Nav.Item>
                                {/* <NavLink to="/favorites"><Button variant="danger" size="sm">My Favorites</Button> */}
                                    <div className="dropdown">
                                        <Link to="/favorites"><Button variant="danger" size="sm">My Favorites</Button></Link>
                                    </div>
                                {/* </NavLink> */}
                            </Nav.Item>
                    </Container>
                </Nav>
                
            </header>
        </>
    )
}
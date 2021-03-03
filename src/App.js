import React, {useState} from 'react';
import './App.css';
import "./Bootstrap.css";
import './Custom.css';

import Header from "./components/Header";
import Footer from "./components/Footer";
import Alcoholic from "./pages/Alcoholic";
import Category from "./pages/Category";
import Ingredient from "./pages/Ingredient";
import Home from "./pages/Home";
import Favorites from './components/Favorites';

import {BrowserRouter as Browser, Switch, Route} from "react-router-dom";


// import Button from "react-bootstrap/Button";
// import Jumbotron from "react-bootstrap/Jumbotron";
// import Form from "react-bootstrap/Form";
// import FormControl from "react-bootstrap/FormControl";
// import Repo from "./Repo";
// import Container from "react-bootstrap/Container";
// import ListGroup from "react-bootstrap/ListGroup";


function App() {

   
  return (
      <Browser>
        
            <div className="App">  
            <Header /> 
                <Switch>         
                    <Route exact path="/" component={Home}/>
                    <Route path="/ingredient" component={Ingredient}/>
                    <Route path="/category" component={Category}/>
                    <Route path="/alcoholic" component={Alcoholic}/>
                    <Route path="/favorites" component={Favorites} />
                </Switch>
            <Footer />
            </div>
        
      </Browser>
    
    
  );
}

export default App;

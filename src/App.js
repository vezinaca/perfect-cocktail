import React, { useState } from 'react';
import './App.css';
import "./Bootstrap.css";
import './Custom.css';

import Header from "./components/Header";
import Footer from "./components/Footer";
import Alcoholic from "./pages/Alcoholic";
import Category from "./pages/Category";
import Ingredient from "./pages/Ingredient";
import Home from "./pages/Home";
import Favorites from './pages/Favorites';
import { FavoriteContextProvider } from "./contexts/FavoritesContext";

import { BrowserRouter as Browser, Switch, Route } from "react-router-dom";

function App() {
   
  return (
    <FavoriteContextProvider>
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
    </FavoriteContextProvider>
    
  );
}

export default App;

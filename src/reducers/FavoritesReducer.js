import React from "react";

export const ACTIONS = {
    ADD_TO_FAVORITES : "add-to-favorites",
    REMOVE_FROM_FAVORITES: "remove-from-favorites",
}

const setStorage = (favorites) => {
    localStorage.setItem('favorites', JSON.stringify(favorites.length > 0 ? favorites: []));
}

let updatedFavorites;
export function FavoritesReducer(state, action){
    switch(action.type){
        case ACTIONS.ADD_TO_FAVORITES:
            updatedFavorites = [...state.favorites];
            updatedFavorites.push({...action.payload}); 
            setStorage(updatedFavorites);
            return { favorites: updatedFavorites, done: false};

        case ACTIONS.REMOVE_FROM_FAVORITES:
            updatedFavorites = state.favorites.filter(favorite => favorite.idDrink !== action.payload)
            setStorage(updatedFavorites);
            return {favorites: updatedFavorites, done: false }

        default:
            return state;

    }
}
import React from "react";

export const ACTIONS = {
    ADD_TO_FAVORITES : "add-to-favorites",
    REMOVE_FROM_FAVORITES: "remove-from-favorites",
}

export function FavoritesReducer(state, action){
    switch(action.type){
        case ACTIONS.ADD_TO_FAVORITES:
            let updatedFavorites = [...state.favorites];
            updatedFavorites.push({...action.payload});    

            return { favorites: updatedFavorites, done: false};

        case ACTIONS.REMOVE_FROM_FAVORITES:
            return state;
        default:
            return state;

    }
}
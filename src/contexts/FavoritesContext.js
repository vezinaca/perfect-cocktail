import React, { useReducer, createContext} from "react";
import { FavoritesReducer } from "../reducers/FavoritesReducer";

export const FavoriteContext = createContext();

const initialState = {favorites: [], done: false}

export function FavoriteContextProvider({children}){

    const [state, dispatch] = useReducer(FavoritesReducer, initialState);

    return(
        <FavoriteContext.Provider value={[state, dispatch]}>
            {children}
        </FavoriteContext.Provider>
    )
}

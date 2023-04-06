import React from "react";
import {ListPropsType} from "./Typisation";

type StateType = ListPropsType[]
type ActionType =
    AddShopListACType
    | RemoveShopListACType
    | changeFilterACType
    | ChangeTitleForTodolistACType

const IniState:StateType =[]

export const reducerForShopList = (state: StateType = IniState, action: ActionType) => {
    switch (action.type) {
        case "ADD-SHOPLIST" :
            const newShopList: ListPropsType
                = {id: action.payload.newID, title: action.payload.newShopListTitle, filter: "all"}
            return [newShopList, ...state]
        case "REMOVE-SHOPLIST" :
            return state.filter(el => el.id !== action.payload.shopListID)
        case "CHANGE-FILTER" :
            return state.map(el => el.id === action.payload.shopListID
                ? {...el, filter: action.payload.newFilterValue}
                : el)
        case "CHANGE-TITLE-FOR-TODOLIST" :
            return state.map(el => el.id === action.payload.shopListID ? {...el, title: action.payload.newTitle} : el)

    }
};

type AddShopListACType = ReturnType<typeof addShopListAC>
const addShopListAC = (newShopListTitle: string, newID: string) => {
    return {
        type: "ADD-SHOPLIST",
        payload: {
            newShopListTitle,
            newID
        }
    } as const
}

type RemoveShopListACType = ReturnType<typeof removeShopListAC>
const removeShopListAC = (shopListID: string) => {
    return {
        type: "REMOVE-SHOPLIST",
        payload: {
            shopListID
        }
    } as const
}

type changeFilterACType = ReturnType<typeof changeFilterAC>
const changeFilterAC = (shopListID: string, newFilterValue: string) => {
    return {
        type: "CHANGE-FILTER",
        payload: {
            shopListID,
            newFilterValue
        }
    } as const
}

type ChangeTitleForTodolistACType = ReturnType<typeof changeTitleForTodolistAC>
const changeTitleForTodolistAC = (shopListID: string, newTitle: string) => {
    return {
        type: "CHANGE-TITLE-FOR-TODOLIST",
        payload: {
            shopListID,
            newTitle
        }
    } as const
}
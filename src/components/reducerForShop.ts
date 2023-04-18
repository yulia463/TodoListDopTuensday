import {ShopListsType} from "../Typisation";
import {v1} from "uuid";

const IniState: StateType = {}

type StateType = ShopListsType

type ActionType =
    changeTitleForGoodsACType
    | changeCartStatusForGoodsACType
    | deleteGoodACType
    | addGoodACType
    | addGoodListACType


export const reducerForGoods = (state: StateType = IniState, action: ActionType): StateType => {
    switch (action.type) {
        case 'CHANGE-TITLE-FOR-GOODS': {

            return {
                ...state,
                [action.payload.shopListID]: state[action.payload.shopListID]
                    .map(el => el.id === action.payload.goodId
                        ? {...el, title: action.payload.newTitle}
                        : el)
            }
        }
        case 'CHANGE-CARD-STATUS-FOR-GOODS': {
            return {
                ...state,
                [action.payload.shopListID]: state[action.payload.shopListID]
                    .map(el => el.id === action.payload.goodId
                        ? {...el, inCart: action.payload.checked}
                        : el)
            }
        }
        case 'DELETE-GOOD': {
            return {
                ...state, [action.payload.shopListID]: state[action.payload.shopListID]
                    .filter(el => el.id !== action.payload.goodID)
            }
        }
        case 'ADD-GOOD': {
            let newGood = {
                id: v1(),
                title: action.payload.newTitle,
                expectedPrice: '$1.99',
                realPrice: '$1.99',
                inCart: false
            };
            return {
                ...state, [action.payload.shopListID]: [newGood, ...state[action.payload.shopListID]]
            }
        }
        case  'ADD-GOOD-LIST': {
            return {...state, [action.payload.shopListID]: []}
        }
        default :
            return state
    }
}


type changeTitleForGoodsACType = ReturnType<typeof changeTitleForGoodsAC>
type changeCartStatusForGoodsACType = ReturnType<typeof changeCartStatusForGoodsAC>
type deleteGoodACType = ReturnType<typeof deleteGoodAC>
type addGoodACType = ReturnType<typeof addGoodAC>
type addGoodListACType = ReturnType<typeof addGoodListAC>

export const changeTitleForGoodsAC = (shopListID: string, goodId: string, newTitle: string) => {
    return {
        type: 'CHANGE-TITLE-FOR-GOODS',
        payload: {
            shopListID,
            goodId,
            newTitle
        }
    } as const

}
export const changeCartStatusForGoodsAC = (shopListID: string, goodId: string, checked: boolean) => {
    return {
        type: 'CHANGE-CARD-STATUS-FOR-GOODS',
        payload: {
            shopListID,
            goodId,
            checked
        }
    } as const

}
export const deleteGoodAC = (shopListID: string, goodID: string) => {
    return {
        type: 'DELETE-GOOD',
        payload: {
            shopListID,
            goodID
        }
    } as const

}
export const addGoodAC = (shopListID: string, newTitle: string) => {
    return {
        type: 'ADD-GOOD',
        payload: {
            shopListID,
            newTitle
        }
    } as const

}
export const addGoodListAC = (shopListID: string) => {
    return {
        type: 'ADD-GOOD-LIST',
        payload: {
            shopListID
        }
    } as const

}
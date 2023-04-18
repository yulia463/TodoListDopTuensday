import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterType, ShopListPropsType, ShopListsType} from './Typisation';
import s from './App.module.css'
import {UniversalFieldInput} from "./components/UniversalFieldInput";
import {UniversalSpan} from "./components/UniversalSpan";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./components/store";
import {addGoodAC, changeCartStatusForGoodsAC, changeTitleForGoodsAC} from "./components/reducerForShop";
import {changeFilterAC, changeTitleForTodolistAC, removeShopListAC} from "./reducerForShopList";

export const ShopListWithRedux = (props: ShopListPropsType) => {

    ////const [redactorForTasks, setRedactorForTasks] = useState(false)

    const thingsToBuy = useSelector<AppRootStateType, ShopListsType>(state => state.goodsList)
    const dispatch = useDispatch()

    const onClickFilterButtonHandler = (value: FilterType) => {
        dispatch(changeFilterAC(props.shopId, value))
    }

    const buttonColorAll = props.filter === 'all' ? s.buttonActiveColor : '';
    const buttonColorBuy = props.filter === 'buy' ? s.buttonActiveColor : '';
    const buttonColorNotBuy = props.filter === 'not buy' ? s.buttonActiveColor : '';

    const addTask = (newTitle: string) => {
        dispatch(addGoodAC(props.shopId, newTitle))
    }
    const deleteShopListHandler = () => {
       dispatch(removeShopListAC(props.shopId))
    }
    let thingsToShopList =
            props.filter === "buy"
            ? thingsToBuy[props.shopId].filter(el => el.inCart)
            : props.filter === "not buy"
                ? thingsToBuy[props.shopId].filter(el => !el.inCart)
                : thingsToBuy[props.shopId]

    return (
        <div className="shoplist">
            <UniversalSpan title={props.title} callback={(newTitle) => {
              dispatch(changeTitleForTodolistAC(props.shopId, newTitle))
            }}/>
            <span><button onClick={deleteShopListHandler}>X</button></span>

            <UniversalFieldInput callback={addTask}/>
            <ol>
                {thingsToShopList.map((item) => {

                        const onChangeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            dispatch(changeCartStatusForGoodsAC(props.shopId, item.id, e.currentTarget.checked))
                        }

                        const ex = Number(item.expectedPrice.replace(/[$]/g, ''));
                        const real = Number(item.realPrice.replace(/[$]/g, ''));
                        const colorPrice = ex >= real ? s.goodPrice : s.badPrice;
                        const callBackHandler = (newTitle: string) => {
                          dispatch(changeTitleForGoodsAC(props.shopId, item.id, newTitle))
                        }

                        return (
                            <li key={item.id} className={item.inCart ? s.shopList : ''}>
                                <hr/>
                                <div>
                                    <UniversalSpan title={item.title} callback={callBackHandler}/>

                                    <button onClick={() => {
                                        dispatch(removeShopListAC(props.shopId))
                                    }}> -x-
                                    </button>
                                </div>
                                <div className={colorPrice}>{'expected price: ' + item.expectedPrice}</div>
                                <div className={colorPrice}>{'real price: ' + item.realPrice}</div>
                                <span>in basket: </span>
                                <input
                                    type={'checkbox'}
                                    onChange={onChangeCheckBoxHandler}
                                    checked={item.inCart}
                                />
                            </li>
                        )
                    }
                )
                }
            </ol>
            <div className="filter-buttons">
                <button
                    className={buttonColorAll}
                    onClick={() => onClickFilterButtonHandler('all')}>all
                </button>
                <button
                    className={buttonColorBuy}
                    onClick={() => onClickFilterButtonHandler('buy')}>buy
                </button>
                <button
                    className={buttonColorNotBuy}
                    onClick={() => onClickFilterButtonHandler('not buy')}>not buy
                </button>
            </div>
        </div>
    );
};
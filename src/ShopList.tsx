import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterType, ShopListPropsType} from './Typisation';
import s from './App.module.css'
import {UniversalFieldInput} from "./components/UniversalFieldInput";
import {UniversalSpan} from "./components/UniversalSpan";

export const ShopList = (props: ShopListPropsType) => {

    ////const [redactorForTasks, setRedactorForTasks] = useState(false)


    const onClickFilterButtonHandler = (value: FilterType) => {
        props.changeFilter(props.shopId, value)
    }

    const buttonColorAll = props.filterValue === 'all' ? s.buttonActiveColor : '';
    const buttonColorBuy = props.filterValue === 'buy' ? s.buttonActiveColor : '';
    const buttonColorNotBuy = props.filterValue === 'not buy' ? s.buttonActiveColor : '';

    const addTask = (newTitle: string) => {
        props.addTask(props.shopId, newTitle)
    }
    const deleteShopListHandler = () => {
        props.removeShopList(props.shopId)
    }


    return (
        <div className="shoplist">
            <UniversalSpan title={props.title} callback={(newTitle)=>{props.changeTitleForTodolist(props.shopId,newTitle)}}/>
            <span><button onClick={deleteShopListHandler}>X</button></span>

            <UniversalFieldInput callback={addTask}/>
            <ol>
                {props.whatToBuy.map((item) => {

                        const onChangeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeCheckBox(props.shopId, item.id, e.currentTarget.checked)
                        }

                        const ex = Number(item.expectedPrice.replace(/[$]/g, ''));
                        const real = Number(item.realPrice.replace(/[$]/g, ''));
                        const colorPrice = ex >= real ? s.goodPrice : s.badPrice;
                        const callBackHandler = (newTitle:string) => {
                            props.changeTitleForTasks(props.shopId, item.id, newTitle)
                        }

                        return (
                            <li key={item.id} className={item.inCart ? s.shopList : ''}>
                                <hr/>
                                <div>
                                    <UniversalSpan title={item.title} callback={callBackHandler}/>

                                    <button onClick={() => {
                                        props.deleteItemShop(props.shopId, item.id)
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
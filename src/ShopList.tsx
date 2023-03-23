import React, {ChangeEvent, useState, KeyboardEvent} from 'react';
import {FilterType, ShopListPropsType} from './Typisation';
import s from './App.module.css'
import {UniversalFieldInput} from "./components/UniversalFieldInput";

export const ShopList = (props: ShopListPropsType) => {
    const [rezim, setRezim] = useState(false)

    const [changeTitle, setChangeTitle] = useState(props.title)

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

    const onBlurHandler = () => {
        setRezim(false)

    }
    return (
        <div className="shoplist">
            {rezim
                ? <input
                    type={'text'}
                    onBlur={onBlurHandler}
                    autoFocus
                    value={changeTitle}
                    onChange={(e) => {
                        setChangeTitle(e.currentTarget.value)
                    }}/>
                : <span
                    onDoubleClick={() => {
                        setRezim(true)
                    }}>
                    <h3>{props.title}</h3></span>}
            <span>
                       <button onClick={deleteShopListHandler}>X</button>
                   </span>
            <hr/>

            <UniversalFieldInput callback={addTask}/>
            <ol>
                {props.whatToBuy.map((item) => {

                        const onChangeCheckBoxHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeCheckBox(props.shopId, item.id, e.currentTarget.checked)
                        }

                        const ex = Number(item.expectedPrice.replace(/[$]/g, ''));
                        const real = Number(item.realPrice.replace(/[$]/g, ''));
                        const colorPrice = ex >= real ? s.goodPrice : s.badPrice;

                        return (
                            <li key={item.id} className={item.inCart ? s.shopList : ''}>
                                <div><b>{item.title}</b>
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
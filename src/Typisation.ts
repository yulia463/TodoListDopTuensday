export type ShopListsType = {
    [key: string]: ThingsToBuyPropsType[]
}

export type ThingsToBuyPropsType = {
    id: string,
    title: string,
    expectedPrice: string,
    realPrice: string,
    inCart: boolean
}

export type ShopListPropsType = {
    shopId: string
    title: string
    filter:FilterType
    // whatToBuy: ThingsToBuyPropsType[]
    // deleteItemShop: (shopListID: string, itemID: string) => void
    // changeFilter: (shoplistID: string, newFilterValue: FilterType) => void
    // addTask: (shopListID: string, newTitle: string) => void
    // changeCheckBox: (shopListID: string, itemID: string, checked: boolean) => void
    // filterValue: FilterType
    // removeShopList: (shopListID: string) => void
    // changeTitleForTodolist: (shopListID: string, newTitle: string) => void
    // changeTitleForTasks: (shopListID: string, itemId: string, newTitle: string) => void
}
export type ListPropsType = {
    id: string
    title: string
    filter: FilterType
}
export type UniversalSpanType = {
    title:string
    callback:(title:string)=>void
}
export type FilterType = "all" | "buy" | "not buy"




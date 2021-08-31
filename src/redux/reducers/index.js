import { combineReducers, createStore } from "redux"
import perkalian from "./perkalian"
import tambahan from "./penjumlahan"
import HitungKata from "./hitungkata"

const reducers = combineReducers({
    multiply: perkalian,
    tambahan,
    HitungKata
})

export default reducers;
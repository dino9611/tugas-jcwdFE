import {combineReducers} from "redux";
import tambahKurang from "./tambah_reducers";
import kaliBagi from "./perkalian_reducers"
import hitungKata from "./hitung_kata_reducers";

// Tiap folder biasanya ada 1 function yg bertugas ngumpulin (tekniknya gitu)
const reducers = combineReducers({
    // Cara penulisan perkalian & tambahan, mksdnya sama aja
    kaliBagi: kaliBagi,
    tambahKurang,
    hitungKata
  })

  export default reducers;
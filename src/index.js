import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import {createStore} from "redux";
import {Provider} from "react-redux" // Berfungsi utk menghubungkan react & redux, bungkus semua dgn Provider
import reducers from './redux/reducers';

const store = createStore(reducers)
// store semacam kumpulan reducer dalam suatu toko, bisa tinggal pilih2 pas mau pake

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
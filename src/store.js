import { createStore, applyMiddleware, compose, combineReducers } from "redux";
 import { ProductReducer } from "./components/reducers/productReducer";
 

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  combineReducers({
    products: ProductReducer,
   
  }),
  initialState,
  composeEnhancer(applyMiddleware())
);
export default store;
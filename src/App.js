 import React from "react"
import data from "./data.json"
import Product from './components/product'
import Filter from './components/filter'
import Cart from './components/Cart'
import Footer from './components/Footer'
import  Header from './components/header'
import { Provider } from 'react-redux'
import store from "./store"
 
 
class App extends React.Component {
  constructor(){
    super();
    this.state={
      product:data.Product,
      cartItems :localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")):[],
      category: "",
      order:"",
    };
  }
  addToCart = (product) =>{
    const cartItems = this.state.cartItems.slice();
    let alreadyInCart =false;
    cartItems.forEach(item =>{
      if(item._id === product._id){
        item.count++;
        alreadyInCart = true; 
      }
    } );
    if (!alreadyInCart) {
      cartItems.push({...product, count : 1});
    }
this.setState({cartItems});
localStorage.setItem("cartItems",JSON.stringify(cartItems));
  }

  createOrder = (order) => {
    alert("Need to save order for "  + order.name )
  };
removeFromCart = (product) =>{
  const cartItems = this.state.cartItems.slice();
  this.setState({cartItems: cartItems.filter ( (x) =>x._id !== product._id),
    
  });
  localStorage.setItem("cartItems",JSON.stringify(cartItems.filter ( (x) =>x._id !== product._id)));

};

  filterProducts = (event) =>{
   const sort = event.target.value;
   this.setState((state)=>({
    sort : sort,
     product : this.state.product
     .slice()
     .sort((a, b)=>
      sort === "lowest"
      ? a.price > b.price 
      ? 1
      :-1
      : sort === "highest"
      ? a.price < b.price
      ? 1
      :-1
      :a._id > b._id
      ? 1
      :-1
     ),
      }))
    

  }; 
  
  orderProducts = (event) =>{
if(event.target.value === "" ){
  this.setState({category : event.target.value , product:data.Product});
} 
else{
 this.setState({
  category : event.target.value,
   product : data.Product.filter(
     (product) => product.category.indexOf(event.target.value)>=0),
   })}
}; 
    
 render(){ 
  return (
   
    <Provider store={store} >
    <div className="grid-container">
    <header>
<Header/>      
    </header>
    <main>
<div className="content">
<div className="main">
  <Filter count={this.state.product.length}
order={this.state.order}
category={this.state.category}
filterProducts={this.filterProducts} 
 
orderProducts={this.orderProducts} > </Filter>
<Product products={this.state.product} addToCart={this.addToCart}/>
</div>
<div className="sidebar">
<Cart cartItems={this.state.cartItems}
removeFromCart = {this.removeFromCart}
createOrder={this.createOrder}
/>
</div>


</div>


    </main>
   < Footer />
    </div></Provider> 
   );
}}

export default App;

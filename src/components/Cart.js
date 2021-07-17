import React, { Component } from 'react'
import formatCurrency from './dinar';
import { Fade } from 'react-awesome-reveal';
export default class Cart extends Component {
    constructor(props){
        super(props);
        this.state ={ 
            name:"",
            email:"",
            address:"",
            showchekout: false};
    
    }

handleInput =(e)=>{
    this.setState({[e.target.name]: e.target.value})
}
createOrder = (e) =>{
    e.preventDefault();
    const order = {
         name: this.state.name,
         email: this.state.email,
         address: this.state.address,
         cartItems: this.props.cartItems,
    };
    this.props.createOrder(order);
}
    render() {
        const{cartItems} = this.props;
        return (
            <div>
                {cartItems.length === 0? (
                <div className="cart cart-header">Cart is empty</div>
         )  :  (
            <div className="cart cart-header"> You have {cartItems.length} product in the cart {" "}
            </div> 
         )}
          <div className="cart">
          <Fade cascade damping={0.1} triggerOnce direction={"right"}>
                <ul className="cart-items">
                {cartItems.map(item =>
                    <li key={item._id}>
                        <div>
                            <img src={item.image} alt={item.title}></img>
                        </div>
                        <div>
                            <div>{item.title}</div>
                            <div className="rigth">
                                 {formatCurrency(item.price)} x {item.count} {" "}
                                 <button className="btn btn-danger" onClick={()=>this.props.removeFromCart(item)}>
                           Remove Item </button>
                            </div>

                           
                           
                           
                        </div>
                    </li>
                    )}



                </ul>
           </Fade>
            </div>

            {cartItems.length!==0 && (
                <div>

<div className="cart">
<div className ="total">

    <div>
        Total:{" "}
                {formatCurrency(
                    cartItems.reduce((a, c)=> a + c.price * c.count, 0)
                )
    }  </div>
              <button className="btn btn-primary" onClick={() =>  {this.setState({showchekout: true})}}>Proceed</button>


  
</div>
 </div>

{this.state.showchekout &&(
<div className="cart">
<form onSubmit={this.createOrder}>
<ul className="form-container">
<li>
    <label>Name</label>
<input className="form-control"  name="name" type="Text" required onChange={this.handleInput}/>
</li>
<li>
    <label>Email</label>
<input className="form-control"  name="email" type="email" required onChange={this.handleInput}/>
</li>
<li>
    <label>Address</label>
<input className="form-control"  name="address" type="text" required onChange={this.handleInput}/>
</li>
<li>
    <button type="submit" className="btn btn-warning" >Checkout</button>
</li>
</ul>


</form>
</div>
)}
</div>


            )}
 
         </div>
 


           
        )
    }
}

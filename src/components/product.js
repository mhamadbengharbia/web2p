import React, { Component } from 'react'
import formatCurrency from './dinar';
import { Fade,Zoom } from 'react-awesome-reveal';
import Modal from "react-modal";
export default class Product extends Component {
    constructor(props){
        super(props);
        this.state = {
        product : null,
        }; }
        openModal = (product) =>{
            this.setState({product});
        
        };
         closeModal =() =>{
             this.setState ({product : null}); 
         };
    render() {
        const customStyles = {
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
               transform: 'translate(-50%, -50%)',
            },
          };
        const {product} = this.state;
        return (
            <div>
     <Fade cascade damping={0.1} triggerOnce direction={"left"}> 
                <ul className="products">
                    {this.props.products.map ((product)=> (
                         <li key={product._id}>
                             <div className="product">
                        <a href={"#" + product._id} onClick={()=>this.openModal(product)}>
                            <div className="product-image">
                            <img src={product.image} alt={product.image}/>
                        </div>
                        <p>{product.title}</p>
                    </a>
                    <div className="product_price">
                    <div>
                    {formatCurrency(product.price)}  
                     </div>
                        <button onClick={()=>this.props.addToCart(product)} className="btn btn-primary">ADD TO CART</button>
                    </div>
                    </div>
                    </li>
                    ))}
                       

                </ul>
                </Fade>
                {
                    product && (
                        <Modal isOpen = {true}
                         onRequestClose={this.closeModal}
                         style={customStyles}                       
                   
                  
                          >
                         <Zoom>
                        <div >
                         <button className="btn btn-danger" onClick = {this.closeModal} >X </button>


   <div className="M1">
       <div className="Mimage">
   <img  src={product.image} alt={product.image}  />
</div>
<div>
    <h5 className="Mtitle"> <strong>{product.title}</strong> </h5>
    <p className="Mdescription">{product.description}</p>
    <div className="Mbuttom">
    <p className="Mprice"> {formatCurrency(product.price)}  </p>
    <button className="btn btn-primary" onClick={() => {
        this.props.addToCart(product);
        this.closeModal();
    }}>ADD TO CART</button></div>
  </div>
  </div>
                                      
                                    </div>

                                </Zoom>
                        </Modal>

                    )
                }
            </div>
        )
    }
}

import React from 'react';
import './Product.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
const Product = (props) => {
    console.log(props)
    const {img, name, seller, price, stock, key} = props.product;

    return (
        <div className="product">
            <div >
                <img src={img} alt=""/>
            </div>
            <div>
                <p><span className="product-name"><Link to={"/product/"+key}>{name}</Link></span></p>
                <br/>
                <p>by: {seller}</p>
                <p>${price}</p>
                <p><small>Only {stock} left in stock - order soon</small></p>
                {props.showAddTOCart && <button  
                className="btn" onClick={() => props.handleAddProduct(props.product)}>
                 <FontAwesomeIcon icon={faShoppingCart} /> add to cart
                </button>}
            </div>
            
        </div>
    );
};

export default Product;
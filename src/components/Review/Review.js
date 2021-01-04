import React, { useEffect, useState } from 'react';
import {getDatabaseCart, processOrder, removeFromDatabaseCart} from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import happyImage from '../../images/giphy.gif';
import { useHistory } from 'react-router-dom';
const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlace, setOrderPlace] = useState(false);
    let thankYou;
    if(orderPlace){
        thankYou = <img src={happyImage} alt=""/> ;
    } 
    const history = useHistory()
    const handleProceedCheckout = () => {
        history.push('/shipment');
        // setCart([]);
        // processOrder();
        // setOrderPlace(true);
        // console.log("Order Placed")
    }
    const handleRemoveProduct = (productKey) => {
        // console.log("Product Removed",productKey)
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        fetch('http://localhost:5000/productsByKeys', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productKeys)
        })
        .then(res => res.json())
        .then(data => setCart(data))
    }, [])
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                        cart.map(pd => <ReviewItem 
                        key = {pd.key}
                        handleRemoveProduct = {handleRemoveProduct}
                        product = {pd}></ReviewItem>)
                }
                {
                    thankYou
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="btn">
                        Place Order
                    </button>
                </Cart>
            </div>
            
        </div>
    );
};

export default Review;
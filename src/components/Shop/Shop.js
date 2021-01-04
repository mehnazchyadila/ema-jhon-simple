import React, { useEffect, useState } from 'react';
import '../Shop/Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager';
import {Link} from 'react-router-dom';
const Shop = () => {
    // console.log(fakeData);
    // const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState([]);
    const [cart, setCart] =  useState([]);

    useEffect(() =>{
        fetch('http://localhost:5000/products')
        .then(res => res.json())
        .then(data => setProducts(data))
    }, []);

    useEffect(() => {
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
        // console.log(products);
        if(products.length > 0){
            const previousCart = productKeys.map(existingKey => {
                const product = products.find(pd => pd.key == existingKey);
                product.quantity = savedCart[existingKey];
                return product;
       
        })
        setCart(previousCart);
    }
    }, [products])

    const handleAddProduct = (product) =>{
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            const count = sameProduct.quantity + 1;
            sameProduct.quantity = sameProduct.quantity + 1;
            const others = cart.filter(pd => pd.key !== toBeAddedKey)
            newCart = [...others , sameProduct]; 
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        // console.log("Product Added",product);
        setCart(newCart);      
        addToDatabaseCart(product.key , count);
};

    
    return (
        <div className = "shop-container">
            <div className="product-container">
                {/* <ul>{products.length}</ul> */}
            {
                products.map(pd => <Product
                    key = {pd.key}
                    handleAddProduct = {handleAddProduct}
                    showAddTOCart = {true}
                    product = {pd}>

                    </Product>)
            }
            
            </div>
            <div className="cart-container">
                <Cart cart= {cart}>
                <Link to="/order">
            <button className="btn">
                Review Order
            </button>
            </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;
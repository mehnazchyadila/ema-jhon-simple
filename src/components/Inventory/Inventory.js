import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {
    const product = {}
    const handleAddProduct = () => {
        fetch('http://localhost:5000/addProduct', {
            method :'POST',
            headers : {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(product)
        })
    }
    return (
        <div>
            <form action="">
                <p><span>Name : </span><input type="text"/></p>
                <p><span>Price : </span><input type="text"/></p>
                <p><span>Quantity : </span><input type="text"/></p>
                <p><span>Product Upload</span><input type="file"/></p>
            </form>
            <button onClick={handleAddProduct}>Add Product</button>
        </div>
    );
};

export default Inventory;
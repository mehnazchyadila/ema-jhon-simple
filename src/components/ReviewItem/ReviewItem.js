import React, { useState } from 'react';

const ReviewItem = (props) => {
    console.log(props);
    const {name, quantity, key, price} = props.product;
    const reviewStyle = {
        borderBottom : '1px solid lightgray',
        margin : '10px',
        padding :'10px' 
    };
    return (
        <div style={reviewStyle}>
            <h2>{name}</h2>
            <h2>Quantity : {quantity}</h2>
            <h2><small>$ {price}</small></h2>
            <br/>
            <button 
             onClick ={() => props.handleRemoveProduct(key)}
             className="btn">
                Remove
            </button>
           
        </div>
    );
};

export default ReviewItem;
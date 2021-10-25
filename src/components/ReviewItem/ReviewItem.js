import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const ReviewItem = (props) => {
    const { name, img, seller, price,quantity,key } = props.product;
    return (
        <div className="product ">
            <div>
                <img src={img} alt="" />
            </div>
            <div className="product-body">
                <h4 className="product-name">{name}</h4>
                <p><small>by: {seller}</small></p>
                <p>Price: {price}</p>
                <p><small>Quantity : {quantity}</small></p>
       
                <br />
                <button
                    onClick={() => props.handlerRemove(key)}
                    className="btn-regular"
                ><FontAwesomeIcon icon={faShoppingCart} /> Remove</button>
            </div>
        </div>
    );
};

export default ReviewItem;
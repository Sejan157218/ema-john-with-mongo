import React from 'react';
import useProducts from '../hooks/useProducts';
import useCart from '../hooks/useCart';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import { clearTheCart, deleteFromDb } from '../../utilities/fakedb';
import { Link, useHistory } from 'react-router-dom';

const OrderReview = () => {
    const [products] = useProducts();
    const [cart, setCart] = useCart(products);
    const handlerRemove = key => {
        const newCart = cart.filter(pd => pd.key !== key);
        setCart(newCart);
        deleteFromDb(key);
    };
    const history = useHistory()
    const handlerPlaceOrder = () => {
        // setCart([]);
        // clearTheCart();
        history.push('/shipping')
    }
    return (
        <div className="shop-container">
            <div className="product-container">
                {
                    cart.map(product => <ReviewItem
                        handlerRemove={handlerRemove}
                        key={product.key}
                        product={product}
                    >
                    </ReviewItem>)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart}>
                    <button onClick={handlerPlaceOrder} className="btn-regular">proceed to Order</button>
                </Cart>
            </div>
        </div>
    );
};

export default OrderReview;
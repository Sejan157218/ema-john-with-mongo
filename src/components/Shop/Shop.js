import React, { useEffect, useState } from 'react';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import './Shop.css';
import { Link } from 'react-router-dom';
import useCart from '../hooks/useCart';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useCart();
    // products to be rendered on the UI
    const [displayProducts, setDisplayProducts] = useState([]);

    const [pageCount, setPageCount] = useState(0);
    const [page, setPage] = useState(0);
    const size = 10;
    useEffect(() => {
        fetch(`http://localhost:9000/products?page=${page}&&size=${size}`)
            .then(res => res.json())
            .then(data => {
                setProducts(data.products);
                setDisplayProducts(data.products);
                const count = data.count;
                const pageNumber = Math.ceil(count / 10);
                setPageCount(pageNumber);
            });
    }, [page]);

    useEffect(() => {
        if (products.length) {
            const savedCart = getStoredCart();
            const storedCart = [];
            for (const key in savedCart) {
                const addedProduct = products.find(product => product.key === key);
                if (addedProduct) {
                    const quantity = savedCart[key];
                    addedProduct.quantity = quantity;
                    storedCart.push(addedProduct);
                }
            }
            setCart(storedCart);
        }
    }, [])

    const handleAddToCart = (product) => {
        // jhonkar vai solution
        const exists = cart.find(pd => pd.key === product.key);
        const rest = cart.filter(pd => pd.key !== product.key);
        let newCart = [];
        if (exists) {
            exists.quantity = exists.quantity + 1;
            // newCart = [...rest, product]
            // change for monogo
            newCart = [...rest, exists]
            console.log(newCart);
        }
        else {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        setCart(newCart)

        // My solution 
        // const newSetCart = [...cart]
        // const productFind = cart.find(pd => pd.key === product.key)
        // if (productFind) {
        //     productFind.quantity += 1;
        // }
        // else {
        //     product.quantity = 1;
        //     newSetCart.push(product);
        // }
        // setCart(newSetCart);

        // save to local storage (for now)
        addToDb(product.key);
    }

    const handleSearch = event => {
        const searchText = event.target.value;

        const matchedProducts = products.filter(product => product.name.toLowerCase().includes(searchText.toLowerCase()));

        setDisplayProducts(matchedProducts);
    }

    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    onChange={handleSearch}
                    placeholder="Search Product" />
            </div>
            <div className="shop-container">
                <div className="product-container">
                    {
                        displayProducts.map(product => <Product
                            key={product.key}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        >
                        </Product>)
                    }
                    {
                        <div className="pagination">
                            {
                                [...Array(pageCount).keys()].map(number =>
                                    <button className={number === page ? 'selected' : ''}
                                        key={number}
                                        onClick={() => setPage(number)}
                                    >
                                        {number + 1}
                                    </button>)
                            }
                        </div>
                    }
                </div>
                <div className="cart-container">
                    <Cart cart={cart}>
                        <Link to="/review">
                            <button className="btn-regular">Review</button>
                        </Link>
                    </Cart>
                </div>
            </div>
        </>
    );
};

export default Shop;
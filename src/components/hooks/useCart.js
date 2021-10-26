import { useEffect, useState } from "react"
import { getStoredCart } from '../../utilities/fakedb'

const useCart = () => {
    const [cart, setCart] = useState([]);
    useEffect(() => {
        const savedDb = getStoredCart();
        const keys = Object.keys(savedDb);
        fetch('http://localhost:9000/products/bykeys', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(keys)
        }).then(res => res.json())
            .then(products => {
                const savedcart = []
                if (products.length) {
                    for (const key in savedDb) {
                        const addProduct = products.find(product => product.key === key);
                        const quantity = savedDb[key];
                        addProduct.quantity = quantity;
                        savedcart.push(addProduct);
                    }
                };
                setCart(savedcart)
            })

    }, []);
    return [cart, setCart];
}

export default useCart;
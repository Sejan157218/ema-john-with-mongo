import { useEffect, useState } from "react"
import {getStoredCart} from '../../utilities/fakedb'

const useCart =products =>{
    const [cart,setCart] = useState([]);
    useEffect(()=>{
        const savedDb = getStoredCart();
        const savedcart = []
        if (products?.length){
            for(const key in savedDb){
                const addProduct = products.find(product=>product.key===key);
                const quantity = savedDb[key];
                addProduct.quantity = quantity;
                savedcart.push(addProduct);
            }
        };
        setCart(savedcart)
    },[products]);
    return[cart,setCart];
}

export default useCart;
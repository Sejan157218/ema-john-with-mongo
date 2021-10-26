import React from 'react';
import { useForm } from "react-hook-form";
import { clearTheCart, getStoredCart } from '../../utilities/fakedb';
import useAuth from '../hooks/useAuth';
import './Shipping.css'

const Shipping = () => {

    const { user } = useAuth()
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = data => {
        const savedCart = getStoredCart();
        data.order = savedCart;
        fetch('http://localhost:9000/orders', {
            method: "POST",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify(data)
        }).then(res => res.json())
            .then(result => {
                if (result.insertedId) {
                    alert('Your Order Has Been Completed')
                    reset();
                    clearTheCart();

                }
            })

    };
    return (
        <div className="login-form-shipping">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input defaultValue={user.displayName} {...register("name")} />
                <br />
                <input placeholder="Full Name" defaultValue={user.email} {...register("email", { required: true })} />
                <br />
                <input placeholder="address" defaultValue=''{...register("address",)} />
                <br />
                <input placeholder="City Name" defaultValue='' {...register("city",)} />
                <br />
                <input placeholder="Phone Number" defaultValue='' {...register("phone number", { required: true })} />
                <br />
                {errors.email && <span>This field is required</span>}
                <br />
                <input type="submit" />
            </form>
        </div>
    );
};

export default Shipping;
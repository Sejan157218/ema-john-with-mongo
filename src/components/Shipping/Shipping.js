import React from 'react';
import { useForm } from "react-hook-form";
import useAuth from '../hooks/useAuth';
import './Shipping.css'

const Shipping = () => {

    const { user } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = data => {
        console.log(data)
    };
    return (
        <div className="login-form-shipping">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input defaultValue={user.displayName} {...register("name")} />
                <br />
                <input placeholder="Full Name" defaultValue={user.email} {...register("email", { required: true })} />
                <br />
                <input placeholder="Email" defaultValue=''{...register("address",{ required: true })} />
                <br />
                <input placeholder="City Name" defaultValue='' {...register("city",{ required: true })} />
                <br />
                <input placeholder="Phone Number" defaultValue='' {...register("phone number",{ required: true })} />
                <br />
                {errors.email && <span>This field is required</span>}
                <br />
                <input type="submit" />
            </form>
        </div>
    );
};

export default Shipping;
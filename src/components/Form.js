import React from 'react'
import { useForm } from 'react-hook-form';
import List from './List';
import { default as api } from "../store/apiSlice";
import { useParams } from "react-router-dom";

export default function Form() {
    const { month } = useParams();  // Get month from URL params
    const { register, handleSubmit, resetField } = useForm();
    const [addTransaction] = api.useAddTransactionMutation();

    const onSubmit = async (data) => {
        if(!data) return {};

        // Pass both month and the transaction data (initialTransaction)
        await addTransaction({ initialTransaction: data, month }).unwrap();

        // Optionally reset fields after submission
        resetField('title');
        resetField('category');
        resetField('amount');
    }

    return (
        <div className="form max-w-sm mx-auto w-96">
            <h1 className='font-bold pb-4 text-xl'>Transaction</h1>

            <form id='form' onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-4">
                    <div className="input-group">
                        <input 
                            type="text" 
                            {...register('title')} 
                            placeholder='Investment, House Rent, Bank loan' 
                            className='form-input'
                            required
                        />
                    </div>
                    <select className='form-input' {...register('category')}>
                        <option value="needs" defaultValue>Needs</option>
                        <option value="wants">Wants</option>
                        <option value="savings">Savings</option>
                    </select>
                    <div className="input-group">
                        <input 
                            type="text" 
                            {...register('amount')} 
                            placeholder='Amount' 
                            className='form-input'
                            required
                        />
                    </div>
                    <div className="submit-btn">
                        <button className=' py-2 text-white bg-darkerGray w-full' >Make Transaction</button>
                    </div>
                </div>    
            </form>

            <List />
        </div>
    )
}

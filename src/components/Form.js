import React from 'react'
import { useForm } from 'react-hook-form';
import List from './List';
import { default as api } from "../store/apiSlice";
import { useParams } from "react-router-dom";

export default function Form() {
  const { month } = useParams();
  const { register, handleSubmit, resetField } = useForm();
  const [addTransaction] = api.useAddTransactionMutation();

  const onSubmit = async (data) => {
    const transactionWithSalary = { ...data, salaryId: month };
    await addTransaction({ initialTransaction: transactionWithSalary, month }).unwrap();

    resetField('description');
    resetField('category');
    resetField('amount');
  };

  return (
    <div className="form max-w-sm mx-auto w-96 bg-[#242526] p-6 rounded-lg shadow-lg">
      <h1 className="font-bold pb-4 text-xl text-white">Transaction</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="input-group">
            <input 
              type="text" 
              {...register('description')} 
              placeholder="Investment, House Rent, Bank loan" 
              className="w-full px-4 py-2 bg-[#3A3B3C] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
              required
            />
          </div>

          <select className="w-full px-4 py-2 bg-[#3A3B3C] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow" {...register('category')}>
            <option value="needs" defaultValue>Needs</option>
            <option value="wants">Wants</option>
            <option value="savings">Savings</option>
          </select>

          <div className="input-group">
            <input 
              type="text" 
              {...register('amount')} 
              placeholder="Amount" 
              className="w-full px-4 py-2 bg-[#3A3B3C] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow"
              required
            />
          </div>

          <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-lg shadow-md hover:from-blue-500 hover:to-purple-500 transition-all duration-300">
            Make Transaction
          </button>
        </div>
      </form>
      <List/>
    </div>
  );
}

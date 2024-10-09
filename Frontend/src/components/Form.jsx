import React from 'react'
import { useState } from 'react';

const Form = ({ type, funcname }) => {
    const [formData, setFormData] = useState({
        title: '',
        amount: null,
        date: '',
        category: '',
        description: '',
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === 'amount' ? parseInt(value) || '' : value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        funcname(formData);
        setFormData({
            title: '',
            amount: null,
            date: '',
            category: '',
            description: '',
        })
    }


    return (
        <form action="" method='POST' onSubmit={handleSubmit} className='w-full flex flex-col gap-8' >
            <input type="text" name='title' value={formData.title} onChange={handleChange} placeholder={`${type} Title`} className='p-3 text-lg bg-transparent border border-zinc-700 rounded-md' />
            <input type="text" name='amount' value={formData.amount !== null ? formData.amount : ''} onChange={handleChange} placeholder={`${type} Amount`} className='p-3 text-lg bg-transparent border border-zinc-700 rounded-md' />
            <input type="date" name='date' value={formData.date} onChange={handleChange} placeholder='Enter A Date' className='p-3 text-lg bg-transparent border border-zinc-700 rounded-md' />
            <select name="category" value={formData.category} id="" onChange={handleChange} className='p-3 text-lg bg-transparent border border-zinc-700 rounded-md'>
                <option value="">Select {type} Category</option>
                {type === 'Income' ? (
                    <>
                        <option value="salary">Salary</option>
                        <option value="freelancing">Freelancing</option>
                        <option value="investments">Investiments</option>
                        <option value="stocks">Stocks</option>
                        <option value="crypto">Crypto</option>
                        <option value="bank">Bank Transfer</option>
                        <option value="youtube">Youtube</option>
                        <option value="other">Other</option>
                    </>
                ) : (
                    <>
                        <option value="education">Education</option>
                        <option value="rent">Rent</option>
                        <option value="groceries">Groceries</option>
                        <option value="health">Health</option>
                        <option value="subscriptions">Subscriptions</option>
                        <option value="takeaways">Takeaways</option>
                        <option value="clothing">Clothing</option>
                        <option value="travelling">Travelling</option>
                        <option value="other">Other</option>
                    </>
                )}
            </select>
            <textarea name="description" value={formData.description} id="" onChange={handleChange} placeholder='Add a Reference or Short Description' rows={4} className='p-3 text-lg resize-none bg-transparent border border-zinc-700 rounded-md'></textarea>
            <div className="flex items-center justify-center">
                <button type="submit" className="bg-purple-900 text-white font-semibold py-3 px-6 rounded-md">Add {type}</button>
            </div>
        </form>
    )
}

export default Form

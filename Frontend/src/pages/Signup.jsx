import React from 'react'
import { Link,  useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { LuEye, LuEyeOff } from "react-icons/lu";
import axiosInstance from '../api/AxiosInstance';
import { toast } from 'react-toastify';

const Signup = () => {
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false)
    const [formValues, setFormValues] = useState({
        fullname: '',
        email: '',
        password: '',
    })
    const [formErrors, setFormErrors] = useState({})
    const isFormValid = Object.values(formErrors).every((error) => !error) && Object.values(formValues).every((value) => value)

    //validate functions
    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const validatePassword = (password) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/.test(password);
    const validateName = (name) => name.length >= 6 && name.length <= 20;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value, });

        // Real-time validation
        let error = '';
        if (name === 'fullname') {
            error = validateName(value) ? '' : `fullname must be 6-20 characters long`;
        } else if (name === 'email') {
            error = validateEmail(value) ? '' : 'Invalid email address';
        } else if (name === 'password') {
            error = validatePassword(value) ? '' : 'Password must contain at least 1 letter, 1 number, and 1 special character';
        }
        setFormErrors({ ...formErrors, [name]: error });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(formErrors).every((error) => !error)) {
            try {
                const response = await axiosInstance.post('/user/register', formValues);
                const user = response.data?.user;
                if (response.status === 201) {
                    localStorage.setItem('user', JSON.stringify(user));
                }
                localStorage.setItem('isAuthenticated', 'true');
                localStorage.setItem('expiresAt', response.data?.expiresAt);
                toast.success("Signed In Successfully", {
                    position: "top-right",
                });
                setTimeout(() => {
                    navigate('/dashboard');
                }, 2000);
                setFormErrors({})
                setFormValues({
                    fullname: '',
                    email: '',
                    password: '',
                })

            } catch (error) {
                console.error(error);
                toast.error("Error signing in", {
                    position: "top-right"
                })
            }
        }
        
    }





    return (
        <div className='w-full h-full flex items-center justify-center p-6 font-Nunito bg-white'>
            <div className="w-full h-full">
                <img src="./images/signup-illustration.png" alt="" className='w-full h-full object-cover' />
            </div>
            <div className="w-full h-full flex flex-col items-center justify-center p-5">
                <h1 className='text-2xl font-bold underline underline-offset-4 mb-6'>SignUp to Expense Tracker</h1>
                <form onSubmit={handleSubmit} className="w-[80%] h-auto flex flex-col gap-8 items-center p-5">
                    <div className="w-full flex flex-col gap-2">
                        <label htmlFor="fullname" className='text-xl font-medium'>Full Name</label>
                        <div className="relative">
                            <input type="text" value={formValues.fullname} onChange={handleChange} className='px-4 py-2 rounded w-full border border-gray-700' name='fullname' placeholder='John Wick' />
                            {formErrors.fullname && <p className="text-red-500 text-sm max-[768px]:text-xs absolute -bottom-6 left-2">{formErrors.fullname}</p>}
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <label htmlFor="email" className='text-xl font-medium'>Email</label>
                        <div className="relative">
                            <input type="email" value={formValues.email} onChange={handleChange} className='px-4 py-2 w-full rounded border border-gray-700' name='email' placeholder='wick@gmail.com' />
                            {formErrors.email && <p className="text-red-500 text-sm max-[768px]:text-xs absolute -bottom-6 left-2">{formErrors.email}</p>}
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-2">
                        <label htmlFor="Password" className='text-xl font-medium'>Password</label>
                        <div className="relative">
                            <input type={showPass ? 'text' : 'password'} value={formValues.password} onChange={handleChange} className='px-4 py-2 w-full rounded border border-gray-700' name='password' placeholder='Password' />
                            {formErrors.password && <p className="text-red-500 text-sm max-[768px]:text-xs absolute -bottom-6 left-2">{formErrors.password}</p>}
                            <span className='absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-xl text-zinc-700' onClick={() => setShowPass(!showPass)}>{showPass ? <LuEyeOff /> : <LuEye />}</span>
                        </div>
                    </div>
                    <button disabled={!isFormValid} className={`bg-[#ffc72e] ${isFormValid ? 'bg-[#ffc72e] cursor-pointer' : 'bg-[#f3ce6a] cursor-not-allowed'} w-full py-4 text-[#222222] text-xl font-semibold rounded-md mt-4`}>Signup</button>
                    <Link to={'/login'} className='text-lg font-semibold'>Already have an account? <span className='text-gray-800 font-medium'>Login</span></Link>
                </form>
            </div>
        </div>
    )
}

export default Signup

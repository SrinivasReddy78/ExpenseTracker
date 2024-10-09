import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { IoLogOut, IoWallet } from "react-icons/io5";
import { FaMoneyBillTransfer, FaMoneyBillTrendUp } from "react-icons/fa6";
import axiosInstance from '../api/AxiosInstance';
import { toast } from 'react-toastify';

const SideBar = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = async () => {
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
        try {
            const response = await axiosInstance.get('/user/logout');
            toast.success(response.data.message, {
                position: "top-right",
            });
            navigate('/login');

        } catch (error) {
            toast.error('Logout failed. Please try again.', {
                position: "top-right",
            });
        }
    }


    return (
        <aside className='w-full h-full px-4 py-8 flex flex-col justify-between'>
            <div className="">
                    <h1 className='text-3xl text-zinc-900 font-bold text-center'>{user?.fullname} </h1>
                    <h3 className='text-sm font-light text-zinc-500 text-center pb-2 border-b border-zinc-500'>{user?.email}</h3>
                <div className="flex flex-col gap-8 px-4 mt-8">
                    <NavLink
                        to={'/dashboard'}
                        end
                        className={({ isActive }) => `flex items-center gap-3 text-2xl pl-4 ${isActive ? 'border-l-4 border-zinc-900 text-zinc-800' : 'border-none text-zinc-600'}`}>
                        <MdDashboard className="text-inherit" />
                        <h2 className="text-inherit">Dashboard</h2>
                    </NavLink>

                    {/* <NavLink
                        to={'/dashboard/view-transactions'}
                        className={({ isActive }) => `flex items-center gap-3 text-2xl pl-4 ${isActive ? 'border-l-4 border-zinc-900 text-zinc-800' : 'border-none text-zinc-600'}`}>
                        <IoWallet className="text-inherit" />
                        <h2 className="text-inherit">View Transactions</h2>
                    </NavLink> */}

                    <NavLink
                        to={'/dashboard/incomes'}
                        className={({ isActive }) => `flex items-center gap-3 text-2xl pl-4 ${isActive ? 'border-l-4 border-zinc-900 text-zinc-800' : 'border-none text-zinc-600'}`}>
                        <FaMoneyBillTrendUp className="text-inherit" />
                        <h2 className="text-inherit">Incomes</h2>
                    </NavLink>

                    <NavLink
                        to={'/dashboard/expenses'}
                        className={({ isActive }) => `flex items-center gap-3 text-2xl pl-4 ${isActive ? 'border-l-4 border-zinc-900 text-zinc-800' : 'border-none text-zinc-600'}`}>
                        <FaMoneyBillTransfer className="text-inherit" />
                        <h2 className="text-inherit">Expenses</h2>
                    </NavLink>
                </div>
            </div>
            <div onClick={handleLogout} className="w-full flex items-center justify-center gap-3 text-2xl font-medium text-zinc-900">
                <IoLogOut className='text-inherit cursor-pointer' />
                <h2 className="text-inherit cursor-pointer">Logout</h2>
            </div>
        </aside>

    )
}

export default SideBar

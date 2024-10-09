import React from 'react'
import { useContext, useEffect } from 'react'
import GlobalContext from '../context/GlobalContext';
import Form from '../components/Form';
import { FaBitcoin, FaCcVisa, FaFileContract, FaMoneyBill1Wave, FaPiggyBank, FaUsersBetweenLines, FaYoutube } from "react-icons/fa6";
import { MdDateRange, MdDelete } from "react-icons/md";
import { BsChatFill, BsGraphUpArrow } from "react-icons/bs";

const Incomes = () => {
  const { addIncome, totalIncome, incomes, getIncomes, deleteIncome } = useContext(GlobalContext);



  const IncCategoryIcon = ({ category, className }) => {
    switch (category) {
      case 'salary':
        return <FaMoneyBill1Wave className={className} />;
      case 'freelancing':
        return <FaFileContract className={className} />;
      case 'investments':
        return <FaUsersBetweenLines className={className} />;
      case 'stocks':
        return <BsGraphUpArrow className={className} />;
      case 'crypto':
        return <FaBitcoin className={className} />;
      case 'bank':
        return <FaCcVisa className={className} />;
      case 'youtube':
        return <FaYoutube className={className} />;
      case 'other':
        return <FaPiggyBank className={className} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    getIncomes();
  }, [])
  


  return (
    <div className='w-full h-full px-6 py-4 font-Nunito'>
      <h1 className='mx-6 my-4 text-4xl font-bold text-[#271B44]'>Incomes</h1>
      <div className="w-full bg-[#FAF6F9] text-3xl font-bold text-center p-4 rounded-xl mb-6">
        Total Income : <span className='text-green-400 text-4xl'>${totalIncome()}</span>
      </div>
      <div className="flex justify-between gap-6 ">
        {/* form */}
        <div className="w-2/5">
          <Form type='Income' funcname={addIncome} />
        </div>
        {/* history */}
        <div className="w-3/5">
          {/* <h1 className='text-2xl font-bold text-[#271B44] text-center mb-4'>Recent Income History</h1> */}
          <div className="flex flex-col items-center gap-5">
            {incomes && (
              incomes.slice(0,5).map((income, index) => {
                return (
                  <div key={income._id} className="card bg-[#FAF6F9] w-full h-24 rounded-lg flex items-center justify-between px-6 py-2">
                    <div className="flex items-center gap-8">
                      {/* icon */}
                      <IncCategoryIcon category={income.category} className="text-[#222260] text-5xl" />
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <div className="bg-green-400 size-3 rounded-full"></div>
                          <p className='text-[#271B44] text-xl font-bold'>{income.title}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className='text-[#271B44] text-lg font-medium w-20'>$ {income.amount}</p>
                          <p className='flex items-center gap-2 text-lg font-medium w-32'><span><MdDateRange /></span>{new Date(income.date).toLocaleDateString('en-GB')}</p>
                          <p className='flex items-center gap-2 text-lg font-medium w-[24rem] truncate overflow-hidden'>
                            <span><BsChatFill /></span> {income.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div onClick={() => deleteIncome(income._id)} className="bg-[#271B44] cursor-pointer text-white p-2 text-2xl rounded-full"><MdDelete /></div>
                  </div>
                )
              })
            )}

          </div>
        </div>
      </div>
    </div>
  )
}

export default Incomes

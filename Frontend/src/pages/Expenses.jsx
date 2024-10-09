import React from 'react'
import { useContext, useEffect } from 'react'
import GlobalContext from '../context/GlobalContext';
import Form from '../components/Form';
import { MdDateRange, MdDelete, MdFastfood } from 'react-icons/md';
import { BsChatFill } from 'react-icons/bs';
import { FaBook, FaBriefcaseMedical, FaCircleDot, FaEarthAsia, FaHouse, FaShirt, FaTv, FaUtensils } from 'react-icons/fa6';



const Expenses = () => {
  const { expenses, addExpense, getExpenses, totalExpense, deleteExpense } = useContext(GlobalContext);


  const ExpCategoryIcon = ({ category, className }) => {
    switch (category) {
      case 'education':
        return <FaBook className={className} />;
      case 'rent':
        return <FaHouse className={className} />;
      case 'groceries':
        return <MdFastfood className={className} />;
      case 'health':
        return <FaBriefcaseMedical className={className} />;
      case 'subscriptions':
        return <FaTv className={className} />;
      case 'takeaways':
        return <FaUtensils className={className} />;
      case 'clothing':
        return <FaShirt className={className} />;
      case 'travelling':
        return <FaEarthAsia className={className} />;
      case 'other':
        return <FaCircleDot className={className} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    getExpenses();
  }, [])






  return (
    <div className='w-full h-full px-6 py-4 font-Nunito'>
    <h1 className='mx-6 my-4 text-4xl font-bold text-[#271B44]'>Expenses</h1>
    <div className="w-full bg-[#FAF6F9] text-3xl font-bold text-center p-4 rounded-xl mb-6">
      Total Income : <span className='text-red-500 text-4xl'>- ${totalExpense()}</span>
    </div>
    <div className="flex justify-between gap-6 ">
      {/* form */}
      <div className="w-2/5">
        <Form type='Expense' funcname={addExpense} />
      </div>
      {/* history */}
      <div className="w-3/5">
          {/* <h1 className='text-2xl font-bold text-[#271B44] text-center mb-4'>Recent Income History</h1> */}
          <div className="flex flex-col items-center gap-5">
            {expenses && (
              expenses.slice(0,5).map((expense) => {
                return (
                  <div key={expense._id} className="card bg-[#FAF6F9] w-full h-24 rounded-lg flex items-center justify-between px-6 py-2">
                    <div className="flex items-center gap-8">
                      {/* icon */}
                      <ExpCategoryIcon category={expense.category} className="text-[#222260] text-5xl" />
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-2">
                          <div className="bg-red-400 size-3 rounded-full"></div>
                          <p className='text-[#271B44] text-xl font-bold'>{expense.title}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <p className='text-[#271B44] text-lg font-medium w-20'>$ {expense.amount}</p>
                          <p className='flex items-center gap-2 text-lg font-medium w-32'><span><MdDateRange /></span>{new Date(expense.date).toLocaleDateString('en-GB')}</p>
                          <p className='flex items-center gap-2 text-lg font-medium w-[24rem] truncate overflow-hidden'>
                            <span><BsChatFill /></span> {expense.description}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div onClick={() => deleteExpense(expense._id)} className="bg-[#271B44] cursor-pointer text-white p-2 text-2xl rounded-full"><MdDelete /></div>
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

export default Expenses

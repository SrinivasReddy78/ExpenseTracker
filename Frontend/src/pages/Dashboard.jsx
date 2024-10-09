import React from 'react'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement, Scale } from 'chart.js'
import { Line, Doughnut } from 'react-chartjs-2';
import GlobalContext from '../context/GlobalContext';
import { useContext, useEffect } from 'react';
import { dateFormat } from '../utils/dateFormat'


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);




const Dashboard = () => {
  const { incomes, expenses, totalIncome, totalExpense, totalBalance, getExpenses, getIncomes, transactionHistory } = useContext(GlobalContext);
  const [...history] = transactionHistory();
  console.log(history);


  const labels = Array.isArray(incomes) ? incomes.map((inc) => dateFormat(inc.date)) : [];
  const incomeData = Array.isArray(incomes) ? incomes.map((income) => income.amount) : [];
  const expenseData = Array.isArray(expenses) ? expenses.map((expense) => expense.amount) : [];

  useEffect(() => {
    getIncomes();
    getExpenses();
  }, [])

  const data = {
    labels,
    datasets: [
      {
        label: 'Income',
        data: incomeData,
        backgroundColor: 'green',
        tension: 0.2
      },
      {
        label: 'Expenses',
        data: expenseData,
        backgroundColor: 'red',
        tension: 0.2
      }
    ]
  };

  const Piedata = {
    labels: [
      'Total Balance',
      'Total Income',
      'Total Expense'
    ],
    datasets: [{
      label: 'Amount',
      data: [totalBalance(), totalIncome(), totalExpense()],
      backgroundColor: [
        '#4ade80',
        'rgb(54, 162, 235)',
        '#f87171'
      ],
      hoverOffset: 20,
      // Scale : 2
    }]
  };


  return (
    <div className='w-full h-full px-6 py-4' >
      <h1 className='mx-6 my-4 text-4xl font-bold text-[#271B44]'>Dashboard</h1>
      <div className="w-full h-auto mb-6 flex justify-between gap-6">
        <div className="left  w-4/6">
          <div className="w-full bg-[#FAF6F9] px-6 py-2 rounded-xl">
            <Line data={data} />
          </div>
        </div>
        <div className="right w-1/3 p-2">
          <h1 className='text-[#271B44] text-2xl font-bold mb-6'>Recent History</h1>
          <div className="flex flex-col gap-4 items-center">
            {history && (
              history.slice(0, 3).map((item) => {
                return (
                  <div key={item._id} className="w-full bg-[#FAF6F9] h-12 rounded-xl flex items-center justify-between px-3">
                    <h3 className={`text-lg ${item.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>{item.title}</h3>
                    <p className={`text-lg ${item.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>{item.type === 'expense' ? `-${item.amount <= 0 ? 0 : item.amount}` : `+${item.amount <= 0 ? 0 : item.amount}`}</p>
                  </div>
                )
              })
            )}
            <div className="w-full">
              <div className="flex items-center justify-between mb-4">
                <p className='text-lg font-semibold'>Min</p>
                <h1 className='text-xl font-bold'>Incomes</h1>
                <p className='text-lg font-semibold'>Max</p>
              </div>
              <div className="w-full bg-[#FAF6F9] h-12 rounded-xl flex items-center justify-between px-3">
                <h3 className='text-lg text-zinc-500'>${Math.min(...incomes.map(item => item.amount))}</h3>
                <p className='text-lg text-zinc-500'>${Math.max(...incomes.map(item => item.amount))}</p>
              </div>
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between mb-4">
                <p className='text-lg font-semibold'>Min</p>
                <h1 className='text-xl font-bold'>Expenses</h1>
                <p className='text-lg font-semibold'>Max</p>
              </div>
              <div className="w-full bg-[#FAF6F9] h-12 rounded-xl flex items-center justify-between px-3">
                <h3 className='text-lg text-zinc-500'>${Math.min(...expenses.map(item => item.amount))}</h3>
                <p className='text-lg text-zinc-500'>${Math.max(...expenses.map(item => item.amount))}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full bg-[#FAF6F9] px-6 py-2 rounded-xl">
        <h1 className='font-bold text-[#271B44] mb-6 text-3xl text-center'>All Totals</h1>
        <div className="w-full h-[35rem] flex items-center justify-center">
          <Doughnut data={Piedata} />
        </div>
      </div>





    </div>
  )
}

export default Dashboard

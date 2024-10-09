import axiosInstance from "../api/AxiosInstance";
import GlobalContext from "./GlobalContext";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";



const GlobalProvider = (props) => {
    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const [error, setError] = useState('')


    useEffect(() => {
        console.log(incomes);
    }, [incomes])

    useEffect(() => {
        console.log(expenses);
    }, [expenses])



    const addIncome = async (income) => {
        try {
            const response = await axiosInstance.post('/income/add-income', income);
            if (response.status === 201) {
                toast.success(response.data.message, {
                    position: "top-right",
                });
            }
            await getIncomes();
        } catch (error) {
            setError(error.message);
        }

    }

    const getIncomes = async () => {
        const response = await axiosInstance.get('/income/all-incomes')
        setIncomes(response.data?.incomes);
    }


    const totalIncome = () => {
        if (!incomes || !Array.isArray(incomes)) {
            return 0;
        }

        return incomes.reduce((total, income) => total + income.amount, 0);
    };

    const deleteIncome = async (id) => {
        try {
            const res = await axiosInstance.delete(`/income/delete-income/${id}`);
            await getIncomes();
            toast.success(res.data.message, {
                position: "top-right",
            })

        } catch (error) {
            setError(error.message);
        }
    }

    const addExpense = async (expense) => {
        try {
            const response = await axiosInstance.post('/expense/add-expense', expense);
            if (response.status === 201) {
                toast.success(response.data.message, {
                    position: "top-right",
                });
            }
            await getExpenses();
        } catch (error) {
            setError(error.message);
        }
    }

    const getExpenses = async () => {
        try {
            const response = await axiosInstance.get('/expense/all-expenses');
            setExpenses(response.data?.expenses);
        } catch (error) {
            setError(error.message);
        }
    }

    const totalExpense = () => {
        if (!expenses || !Array.isArray(expenses)) {
            return 0;
        }
        return expenses.reduce((total, expense) => total + expense.amount, 0)
    }

    const deleteExpense = async (id) => {
        try {
            const res = await axiosInstance.delete(`/expense/delete-expense/${id}`);
            await getExpenses();
            toast.success(res.data.message, {
                position: "top-right",
            })

        } catch (error) {
            setError(error.message);
        }
    }

    const totalBalance = () => {
        return totalIncome() - totalExpense()
    }

    const transactionHistory = () => {
        const allIncomes = incomes.map((inc) => ({ ...inc, type: 'income' }));
        const allExpenses = expenses.map((exp) => ({ ...exp, type: 'expense' }));
        const history = [...allIncomes, ...allExpenses];  // Merge incomes and expenses
        history.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        return history;
    }


    const values = { incomes, expenses, addIncome, getIncomes, getExpenses, error, setError, totalIncome, addExpense, totalExpense, deleteIncome, deleteExpense, totalBalance, transactionHistory }
    return (
        <GlobalContext.Provider value={values}>
            {props.children}
        </GlobalContext.Provider>
    )
}


export default GlobalProvider;
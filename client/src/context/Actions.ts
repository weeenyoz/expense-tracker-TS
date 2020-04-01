import axios from 'axios';
import { AddAction, DeleteAction, GetTransactionsAction, NewTransactionVariables } from './GlobalState';

export const deleteTransaction = async (id: number): Promise<DeleteAction> => {
    try {
        await axios.delete(`/api/v1/transactions/${id}`);

        return {
            type: 'DELETE_TRANSACTION',
            payload: id,
        };
    } catch (error) {
        return {
            type: 'TRANSACTIONS_ERROR',
            payload: error.error,
        };
    }
};

export const getTransactions = async (): Promise<GetTransactionsAction> => {
    try {
        const result = await axios.get('/api/v1/transactions');
        const { transactions } = result.data;

        return {
            type: 'GET_TRANSACTIONS',
            payload: transactions,
        };
    } catch (error) {
        return {
            type: 'TRANSACTIONS_ERROR',
            payload: error.error,
        };
    }
};

export const addTransaction = async (transaction: NewTransactionVariables): Promise<AddAction> => {
    try {
        const result = await axios.post('/api/v1/transactions', transaction);
        const { newTransaction } = result.data;

        return {
            type: 'ADD_TRANSACTION',
            payload: newTransaction,
        };
    } catch (error) {
        return {
            type: 'TRANSACTIONS_ERROR',
            payload: error.error,
        };
    }
};

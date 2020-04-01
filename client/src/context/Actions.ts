import axios from 'axios';
import { AddAction, DeleteAction, GetTransactionsAction } from './GlobalState';

export const deleteTransaction = async (id: number): Promise<DeleteAction> => {
    const result = await axios.delete(`/api/v1/transactions/${id}`);
    console.log('result in deleteTransactions: ', result);

    return {
        type: 'DELETE_TRANSACTION',
        payload: id,
    };
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

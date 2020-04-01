import axios from 'axios';

export const deleteTransaction = (id: number) => {
    return {
        type: 'DELETE_TRANSACTION',
        payload: id,
    };
};

export const getTransactions = async () => {
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

import { RequestHandler } from 'express';
import Transaction from './transactionModel';

/**
 * GET all transactions
 * /api/v1/transaction/
 */
export const getTransactions: RequestHandler = async (req, res, next) => {
    const result = await Transaction.getTransactions();
    console.log('resut in getTransactions controller', result);
    res.send('GET Transactions');
};

/**
 * POST new transaction
 * /api/v1/transaction/
 */
export const addTransaction: RequestHandler = async (req, res, next) => {
    const data = req.body;

    try {
        const result = await Transaction.addTransaction({ ...data });
        result && res.status(204).send();
    } catch (error) {
        next(error);
    }
};

/**
 * DELETE transaction
 * /api/v1/transaction/:id
 */
export const deleteTransaction: RequestHandler = (req, res, next) => {
    res.send(`DELETE Transaction ${req.params.id}`);
};

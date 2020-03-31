import { RequestHandler } from 'express';
import Transaction from './transactionModel';

/**
 * GET all transactions
 * /api/v1/transaction/
 */
export const getTransactions: RequestHandler = async (req, res, next) => {
    const result = await Transaction.getTransactions();
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
export const deleteTransaction: RequestHandler = async (req, res, next) => {
    const id = parseInt(req.params.id);

    try {
        const result = await Transaction.deleteTransaction(id);
        result && res.status(204).send();
    } catch (error) {
        next(error);
    }
};

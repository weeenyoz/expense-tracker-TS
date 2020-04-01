import { RequestHandler } from 'express';
import Transaction from './transactionModel';

/**
 * GET all transactions
 * /api/v1/transaction/
 */
export const getTransactions: RequestHandler = async (req, res, next) => {
    try {
        const result = await Transaction.getTransactions();
        result &&
            res.status(200).json({
                transactions: result,
            });
    } catch (error) {
        next(error);
    }
};

/**
 * POST new transaction
 * /api/v1/transaction/
 */
export const addTransaction: RequestHandler = async (req, res, next) => {
    const data = req.body;

    try {
        const result = await Transaction.addTransaction({ ...data });
        result && res.status(201).json({ newTransaction: result });
    } catch (error) {
        if (error.name === 'ValidationError') {
            const { data } = error;

            const invalidProperties = Object.keys(error.data);

            const messages = invalidProperties.map(
                (invalidProperty) => `${invalidProperty} ${data[invalidProperty][0].message}`,
            );

            res.status(400).json({ error: messages });
        } else {
            next(error);
        }
    }
};

/**
 * DELETE transaction
 * /api/v1/transaction/:id
 */
export const deleteTransaction: RequestHandler = async (req, res, next) => {
    const id = [parseInt(req.params.id)];

    try {
        const result = await Transaction.deleteTransaction(id);
        result && result > 0
            ? res.status(200).json({ message: 'Transaction deleted' })
            : res.status(404).json({ message: 'No record found' });
    } catch (error) {
        next(error);
    }
};

import { Model, UpsertGraphOptions, transaction } from 'objection';

const knex = require('../../db/knex');
Model.knex(knex);

export interface TransactionInterface {
    id: number;
    text: string;
    amount: number;
}

class Transaction extends Model implements TransactionInterface {
    public static tableName = 'transactions';

    public id: number;
    public text: string;
    public amount: number;

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['text', 'amount'],
            properties: {
                id: { type: 'integer' },
                text: { type: 'string', minLength: 1, maxLength: 255 },
                amount: { type: 'number' },
            },
        };
    }

    public static async getTransactions() {
        try {
            const result = await transaction(Transaction, async (Transaction) => {
                return await Transaction.query().column('id', 'text', 'amount');
            });
            return result;
        } catch (error) {}
    }

    public static async addTransaction(data: TransactionInterface, options?: UpsertGraphOptions) {
        try {
            const result: any = await transaction(Transaction, async (Transaction) => {
                return await Transaction.query().upsertGraphAndFetch(data, options);
            });
            return result;
        } catch (error) {
            console.log(error);
        }
    }

    //   public static async deleteTransaction() {}
}

export default Transaction;

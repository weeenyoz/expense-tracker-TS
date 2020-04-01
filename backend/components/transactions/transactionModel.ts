import { Model, UpsertGraphOptions, transaction } from 'objection';
import _ from 'lodash';

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
        const result = await transaction(Transaction, async (Transaction) => {
            return await Transaction.query().column('id', 'text', 'amount');
        });
        return result;
    }

    public static async addTransaction(data: TransactionInterface, options?: UpsertGraphOptions) {
        const result = await transaction(Transaction, async (Transaction) => {
            return await Transaction.query()
                .upsertGraphAndFetch(data, options)
                .then((res) => {
                    return _.omit(res, ['created_at', 'updated_at']);
                });
        });
        return result;
    }

    public static async deleteTransaction(id: number[]) {
        return await Transaction.query().deleteById(id);
    }
}

export default Transaction;

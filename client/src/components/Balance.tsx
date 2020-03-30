import React, { useContext } from 'react';
import { GlobalContext, TransactionProps } from '../context/GlobalState';

const Balance = () => {
    const { transactions } = useContext(GlobalContext);

    const amounts = transactions.map((transaction: TransactionProps) => transaction.amount);

    // totals each number in amounts array
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    return (
        <>
            <h4>Your Balance</h4>
            <h1>${total}</h1>
        </>
    );
};

export default Balance;

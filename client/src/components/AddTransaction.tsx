import React, { useState, useContext } from 'react';
import { GlobalContext, NewTransactionVariables } from '../context/GlobalState';
import { addTransaction } from '../context/Actions';

const AddTransaction = () => {
    const [text, setText] = useState('');
    const [amount, setAmount] = useState(0);

    const { dispatch } = useContext(GlobalContext);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newTransaction: NewTransactionVariables = {
            text,
            amount,
        };

        const addTransactionAction = await addTransaction(newTransaction);

        dispatch(addTransactionAction);
    };

    return (
        <>
            <h3>Add new transaction</h3>
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label>Text</label>
                    <input
                        type="text"
                        placeholder="Enter text..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label>
                        Amount <br />
                        (negative - expense, positive - income)
                    </label>
                    <input
                        type="number"
                        placeholder="Enter amount..."
                        value={amount}
                        onChange={(e) => setAmount(parseInt(e.target.value))}
                    />
                </div>
                <button type="submit" className="btn">
                    Add transaction
                </button>
            </form>
        </>
    );
};

export default AddTransaction;

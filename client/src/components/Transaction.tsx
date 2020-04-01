import React, { useContext } from 'react';
import { TransactionProps, GlobalContext } from '../context/GlobalState';
import { deleteTransaction } from '../context/Actions';

const Transaction: React.FC<TransactionProps> = (props: TransactionProps) => {
    const { id, text, amount } = props;

    const { dispatch } = useContext(GlobalContext);

    const sign = amount < 0 ? '-' : '+';

    const deleteHandler = async () => {
        const deleteAction = await deleteTransaction(id);
        dispatch(deleteAction);
    };

    return (
        <>
            <li className={sign === '-' ? 'minus' : 'plus'}>
                {text}
                <span>
                    {/* remove negative sign from negative value to display absolute number after +/- sign */}
                    {sign}${Math.abs(amount)}
                </span>
                <button className="delete-btn" onClick={deleteHandler}>
                    x
                </button>
            </li>
        </>
    );
};

export default Transaction;

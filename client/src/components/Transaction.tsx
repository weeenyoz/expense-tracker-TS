import React, { useContext } from 'react';
import { TransactionProps, GlobalContext } from '../context/GlobalState';
import { deleteTransaction } from '../context/Actions';

const Transaction: React.FC<TransactionProps> = (props: TransactionProps) => {
    const { id, text, amount } = props;

    const { dispatch } = useContext(GlobalContext);

    const sign = amount < 0 ? '-' : '+';

    return (
        <>
            <li className={sign === '-' ? 'minus' : 'plus'}>
                {text}
                <span>
                    {/* remove negative sign from negative value to display absolute number after +/- sign */}
                    {sign}${Math.abs(amount)}
                </span>
                <button className="delete-btn" onClick={() => dispatch(deleteTransaction(id))}>
                    x
                </button>
            </li>
        </>
    );
};

export default Transaction;

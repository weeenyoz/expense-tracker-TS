import { TransactionProps, GlobalContextProps, Action } from './GlobalState';

const AppReducer = (state: GlobalContextProps, action: Action): GlobalContextProps => {
    switch (action.type) {
        case 'GET_TRANSACTIONS':
            return {
                ...state,
                loading: false,
                transactions: [...(action.payload as TransactionProps[]), ...state.transactions],
            };
        case 'DELETE_TRANSACTION':
            return {
                ...state,
                transactions: state.transactions.filter((transaction) => transaction.id !== action.payload),
            };

        case 'ADD_TRANSACTION':
            return {
                ...state,
                transactions: [action.payload as TransactionProps, ...state.transactions],
            };
        case 'TRANSACTIONS_ERROR':
            return {
                ...state,
                error: action.payload as GlobalContextProps['error'],
            };
        default:
            return state;
    }
};

export default AppReducer;

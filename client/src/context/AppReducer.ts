import { TransactionProps, GlobalContextProps, Action } from './GlobalState';

const AppReducer = (state: GlobalContextProps, action: Action): GlobalContextProps => {
    switch (action.type) {
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
        default:
            return state;
    }
};

export default AppReducer;

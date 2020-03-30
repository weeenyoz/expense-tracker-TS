import React, { createContext, useReducer, Dispatch } from 'react';
import AppReducer from './AppReducer';

export interface TransactionProps {
    id: number;
    text: string;
    amount: number;
}

export interface GlobalContextProps {
    transactions: Array<TransactionProps>;
    dispatch: Dispatch<AddAction | DeleteAction>;
}

export interface DeleteAction {
    type: string;
    payload: number;
}

export interface AddAction {
    type: string;
    payload: TransactionProps;
}

export type Action = DeleteAction | AddAction;

// initial state
const initialState: GlobalContextProps = {
    transactions: [],
    dispatch: () => {
        return null;
    },
};

// Create Context
export const GlobalContext = createContext<GlobalContextProps>(initialState);

const GlobalStateProvider = (props: any) => {
    const { children } = props;

    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <GlobalContext.Provider
            value={{
                transactions: state.transactions,
                dispatch,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalStateProvider;

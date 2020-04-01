import React, { useEffect, createContext, useReducer, Dispatch } from 'react';
import axios from 'axios';
import AppReducer from './AppReducer';
import { getTransactions } from './Actions';

export interface TransactionProps {
    id: number;
    text: string;
    amount: number;
}

export interface GlobalContextProps {
    transactions: Array<TransactionProps>;
    loading: boolean;
    error: string[];
    dispatch: Dispatch<AddAction | DeleteAction>;
}

export interface DeleteAction {
    type: string;
    payload: number | GlobalContextProps['error'];
}

export interface AddAction {
    type: string;
    payload: TransactionProps | GlobalContextProps['error'];
}

export interface GetTransactionsAction {
    type: string;
    payload: TransactionProps[] | GlobalContextProps['error'];
}

export type Action = DeleteAction | AddAction | GetTransactionsAction;

// initial state
const initialState: GlobalContextProps = {
    transactions: [],
    loading: true,
    error: [''],
    dispatch: () => {
        return null;
    },
};

// Create Context
export const GlobalContext = createContext<GlobalContextProps>(initialState);

const GlobalStateProvider = (props: any) => {
    const { children } = props;

    const [state, dispatch] = useReducer(AppReducer, initialState);

    const getAllTransactions = async () => {
        const getTransactionsAction = await getTransactions();
        dispatch(getTransactionsAction);
    };

    useEffect(() => {
        getAllTransactions();
    }, []);

    return (
        <GlobalContext.Provider
            value={{
                ...state,
                dispatch,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalStateProvider;

import React from "react";
import "./App.scss";
import Header from "./components/Header";
import Balance from "./components/Balance";
import IncomeExpenses from "./components/IncomeExpenses";
import TransactionList from "./components/TransactionList";
import AddTransaction from "./components/AddTransaction";
import GlobalStateProvider from "./context/GlobalState";

function App() {
  return (
    <GlobalStateProvider>
      <Header />
      <div className="container">
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
      </div>
    </GlobalStateProvider>
  );
}

export default App;

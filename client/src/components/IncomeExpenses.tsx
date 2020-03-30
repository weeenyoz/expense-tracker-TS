import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);

  const getTotalValues = (type: string) => {
    const amounts = transactions
      .filter(({ amount }) => {
        return type === "incomes" ? amount > 0 : amount < 0;
      })
      .map(transaction => transaction.amount);

    return amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
  };

  const totalIncomes = parseInt(getTotalValues("incomes"));
  const totalExpenses = parseInt(getTotalValues("expenses"));

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">${totalIncomes}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">${Math.abs(totalExpenses)}</p>
      </div>
    </div>
  );
};

export default IncomeExpenses;

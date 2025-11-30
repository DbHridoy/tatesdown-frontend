import AddExpense from "../../UserComponents/Expenses/AddExpense";

import ExpenseCard from "../../UserComponents/Expenses/ExpenseCard";

import ExpenseFilter from "../../UserComponents/Expenses/ExpenseFilter";

import ExpenseList from "../../UserComponents/Expenses/ExpenseList";

function UserExpenses() {
  return (
    <>
    <div className="space-y-8">
      <AddExpense />
      <ExpenseCard />
      <ExpenseFilter />
      <ExpenseList />
      </div>
    </>
  );
}

export default UserExpenses;

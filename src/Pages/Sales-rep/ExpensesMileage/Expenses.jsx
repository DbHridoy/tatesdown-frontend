import AddExpense from "../../../Components/Sales-rep/Expenses/AddExpense";

import ExpenseCard from "../../../Components/Sales-rep/Expenses/ExpenseCard";

import ExpenseFilter from "../../../Components/Sales-rep/Expenses/ExpenseFilter";

import ExpenseList from "../../../Components/Sales-rep/Expenses/ExpenseList";

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

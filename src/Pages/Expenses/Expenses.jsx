import ExpensesData from "../../Components/Dashboard/ExpensesData";
import ReportsData from "../../Components/Dashboard/ReportsData";
import ExpenseBreakdown from "../../Components/Dashboard/ExpenseBreakdown";

const Expenses = () => {
  return (
    <div>
      <ExpensesData />
      <ReportsData />
      <ExpenseBreakdown />
    </div>
  );
};

export default Expenses;


import ExpenseBreakdown from "../../../Components/Dashboard/ExpenseBreakdown";
import ExpensesData from "../../../Components/Dashboard/ExpensesData";
import ReportsData from "../../../Components/Dashboard/ReportsData";

const Expense = () => {
  return (
    <div>
      <ExpensesData />
      <ReportsData />
      <ExpenseBreakdown />
    </div>
  );
};

export default Expense;

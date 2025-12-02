import ExpenseBreakdown from "../../../Components/Dashboard/ExpenseBreakdown";
import ExpensesData from "../../../Components/Dashboard/ExpensesData";
import ReportsData from "../../../Components/Dashboard/ReportsData";

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

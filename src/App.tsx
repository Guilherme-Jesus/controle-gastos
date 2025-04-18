import { ExpensesProvider } from "@/hooks/use-expenses";
import Layout from "@/layout/layout";
import AddExpense from "@/pages/add-expense";
import Dashboard from "@/pages/dashboard";
import ExpensesList from "@/pages/expense-list";
import ExpenseSummary from "@/pages/expense-summary";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <ExpensesProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="adicionar" element={<AddExpense />} />
          <Route path="lista" element={<ExpensesList />} />
          <Route path="resumo" element={<ExpenseSummary />} />
        </Route>
      </Routes>
    </ExpensesProvider>
  );
}

export default App;

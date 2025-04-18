import type { Expense } from "@/types/expense";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface ExpensesContextType {
  expenses: Expense[];
  addExpense: (expense: Omit<Expense, "id">) => void;
  deleteExpense: (id: string) => void;
}

const ExpensesContext = createContext<ExpensesContextType | undefined>(
  undefined
);

export function ExpensesProvider({ children }: { children: ReactNode }) {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    // Carregar do localStorage se disponível
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("expenses");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  // Salvar no localStorage quando expenses mudar
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense = {
      ...expense,
      id: crypto.randomUUID(),
    };
    setExpenses([...expenses, newExpense]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  return (
    <ExpensesContext.Provider value={{ expenses, addExpense, deleteExpense }}>
      {children}
    </ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);
  if (context === undefined) {
    throw new Error("useExpenses must be used within an ExpensesProvider");
  }
  return context;
}

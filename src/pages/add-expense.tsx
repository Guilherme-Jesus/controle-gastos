import { ExpenseForm } from "@/components/expense-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useExpenses } from "@/hooks/use-expenses";
import type { Expense } from "@/types/expense";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function AddExpense() {
  const { addExpense } = useExpenses();
  const navigate = useNavigate();

  const handleAddExpense = (expense: Omit<Expense, "id">) => {
    addExpense(expense);
    toast("Despesa adicionada", {
      description: "Sua despesa foi registrada com sucesso.",
    });
    navigate("/lista");
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar Despesa</CardTitle>
        <CardDescription>Registre uma nova despesa no sistema.</CardDescription>
      </CardHeader>
      <CardContent>
        <ExpenseForm onAddExpense={handleAddExpense} />
      </CardContent>
    </Card>
  );
}

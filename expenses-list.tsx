import { useExpenses } from "@/hooks/use-expenses"
import { ExpenseList } from "@/components/expense-list"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ExpensesList() {
  const { expenses, deleteExpense } = useExpenses()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Lista de Despesas</CardTitle>
        <CardDescription>Visualize e gerencie todas as suas despesas.</CardDescription>
      </CardHeader>
      <CardContent>
        <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
      </CardContent>
    </Card>
  )
}

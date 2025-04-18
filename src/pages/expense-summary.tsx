import { ExpenseSummary as ExpenseSummaryComponent } from "@/components/expense-summary";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useExpenses } from "@/hooks/use-expenses";

export default function ExpenseSummary() {
  const { expenses } = useExpenses();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo de Despesas</CardTitle>
        <CardDescription>
          Visualize estatísticas e gráficos dos seus gastos.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ExpenseSummaryComponent expenses={expenses} />
      </CardContent>
    </Card>
  );
}

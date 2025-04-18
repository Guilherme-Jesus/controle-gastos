import {
  eachDayOfInterval,
  endOfMonth,
  format,
  isSameDay,
  startOfMonth,
} from "date-fns";
import { ptBR } from "date-fns/locale";
import { useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { type Expense, expenseCategories } from "@/types/expense";

interface ExpenseSummaryProps {
  expenses: Expense[];
}

export function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  // Cores para o gráfico
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
    "#FF6B6B",
    "#6B66FF",
  ];

  // Formatador de moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  // Dados para o gráfico de categorias
  const categoryData = useMemo(() => {
    const categoryMap = new Map<string, number>();

    expenses.forEach((expense) => {
      const currentAmount = categoryMap.get(expense.category) || 0;
      categoryMap.set(expense.category, currentAmount + expense.amount);
    });

    return Array.from(categoryMap.entries())
      .map(([category, amount]) => {
        const categoryInfo = expenseCategories.find(
          (c) => c.value === category
        );
        return {
          name: categoryInfo?.label || category,
          value: amount,
        };
      })
      .sort((a, b) => b.value - a.value);
  }, [expenses]);

  // Dados para o gráfico diário (últimos 30 dias)
  const dailyData = useMemo(() => {
    const today = new Date();
    const startDate = startOfMonth(today);
    const endDate = endOfMonth(today);

    const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

    return daysInMonth.map((day) => {
      const dayExpenses = expenses.filter((expense) => {
        const expenseDate = new Date(expense.date);
        return isSameDay(expenseDate, day);
      });

      const totalAmount = dayExpenses.reduce(
        (sum, expense) => sum + expense.amount,
        0
      );

      return {
        name: format(day, "dd", { locale: ptBR }),
        valor: totalAmount,
      };
    });
  }, [expenses]);

  // Cálculo do total de despesas
  const totalExpenses = useMemo(() => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }, [expenses]);

  // Cálculo da média diária (considerando apenas dias com despesas)
  const averageDailyExpense = useMemo(() => {
    const daysWithExpenses = new Set(
      expenses.map((expense) => format(new Date(expense.date), "yyyy-MM-dd"))
    );

    return daysWithExpenses.size > 0
      ? totalExpenses / daysWithExpenses.size
      : 0;
  }, [expenses, totalExpenses]);

  // Encontrar a maior despesa
  const biggestExpense = useMemo(() => {
    if (expenses.length === 0) return null;
    return expenses.reduce(
      (max, expense) => (expense.amount > max.amount ? expense : max),
      expenses[0]
    );
  }, [expenses]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border p-4">
          <h3 className="text-sm font-medium">Total de Despesas</h3>
          <div className="text-2xl font-bold mt-2">
            {formatCurrency(totalExpenses)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            {expenses.length}{" "}
            {expenses.length === 1
              ? "despesa registrada"
              : "despesas registradas"}
          </p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="text-sm font-medium">Média Diária</h3>
          <div className="text-2xl font-bold mt-2">
            {formatCurrency(averageDailyExpense)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Considerando apenas dias com despesas
          </p>
        </div>
        <div className="rounded-lg border p-4">
          <h3 className="text-sm font-medium">Maior Despesa</h3>
          {biggestExpense ? (
            <>
              <div className="text-2xl font-bold mt-2">
                {formatCurrency(biggestExpense.amount)}
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {biggestExpense.description} (
                {format(new Date(biggestExpense.date), "dd/MM/yyyy", {
                  locale: ptBR,
                })}
                )
              </p>
            </>
          ) : (
            <div className="text-2xl font-bold mt-2">R$ 0,00</div>
          )}
        </div>
      </div>

      <Tabs defaultValue="categorias" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="categorias">Por Categoria</TabsTrigger>
          <TabsTrigger value="diario">Diário</TabsTrigger>
        </TabsList>
        <TabsContent value="categorias" className="mt-6">
          {categoryData.length > 0 ? (
            <div className="h-[300px] w-full border rounded-lg p-4">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(0)}%`
                    }
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) => formatCurrency(value as number)}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[300px] border rounded-lg">
              <p className="text-muted-foreground">
                Nenhuma despesa registrada
              </p>
            </div>
          )}
        </TabsContent>
        <TabsContent value="diario" className="mt-6">
          {expenses.length > 0 ? (
            <div className="h-[300px] w-full border rounded-lg p-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `R$${value}`} />
                  <Tooltip
                    formatter={(value) => formatCurrency(value as number)}
                  />
                  <Bar dataKey="valor" fill="#0088FE" name="Valor" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex items-center justify-center h-[300px] border rounded-lg">
              <p className="text-muted-foreground">
                Nenhuma despesa registrada
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

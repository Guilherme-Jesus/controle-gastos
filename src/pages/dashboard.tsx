"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useExpenses } from "@/hooks/use-expenses";
import {
  ArrowUpRight,
  List,
  PieChart,
  PlusCircle,
  TrendingUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const { expenses } = useExpenses();

  // Calcular o total de despesas
  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  // Formatador de moeda
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-gradient-to-br from-primary/10 to-accent/10 shadow-md hover:shadow-lg transition-all duration-300">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl md:text-2xl">
            Bem-vindo ao Controle de Gastos
          </CardTitle>
          <CardDescription>
            Gerencie suas finanças de forma simples e eficiente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="bg-card rounded-xl p-4 shadow-inner mb-6">
            <h3 className="text-base md:text-lg font-medium text-muted-foreground mb-1">
              Total de Despesas
            </h3>
            <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
              {formatCurrency(totalExpenses)}
            </p>
            <p className="text-xs md:text-sm text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-primary" />
              {expenses.length}{" "}
              {expenses.length === 1
                ? "despesa registrada"
                : "despesas registradas"}
            </p>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <Button
              onClick={() => navigate("/adicionar")}
              className="flex flex-col h-20 md:h-24 items-center justify-center bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transition-all duration-200 group"
            >
              <PlusCircle className="h-5 w-5 md:h-6 md:w-6 mb-1 group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm">Adicionar Despesa</span>
            </Button>
            <Button
              onClick={() => navigate("/lista")}
              variant="outline"
              className="flex flex-col h-20 md:h-24 items-center justify-center border border-border hover:border-primary/50 hover:bg-primary/5 shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              <List className="h-5 w-5 md:h-6 md:w-6 mb-1 text-primary group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm">Ver Lista</span>
              <ArrowUpRight className="h-3 w-3 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </Button>
            <Button
              onClick={() => navigate("/resumo")}
              variant="outline"
              className="flex flex-col h-20 md:h-24 items-center justify-center border border-border hover:border-primary/50 hover:bg-primary/5 shadow-sm hover:shadow-md transition-all duration-200 group"
            >
              <PieChart className="h-5 w-5 md:h-6 md:w-6 mb-1 text-primary group-hover:scale-110 transition-transform duration-200" />
              <span className="text-sm">Ver Resumo</span>
              <ArrowUpRight className="h-3 w-3 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {expenses.length === 0 && (
        <div className="text-center py-6 px-4 bg-accent/20 rounded-xl border border-accent/10">
          <p className="text-muted-foreground">
            Você ainda não tem despesas registradas.
          </p>
          <Button
            onClick={() => navigate("/adicionar")}
            variant="link"
            className="text-primary mt-2"
          >
            Adicione sua primeira despesa agora
          </Button>
        </div>
      )}
    </div>
  );
}

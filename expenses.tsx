"use client"

import { useState, useEffect } from "react"
import { ExpenseForm } from "@/components/expense-form"
import { ExpenseList } from "@/components/expense-list"
import { ExpenseSummary } from "@/components/expense-summary"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Expense } from "@/types/expense"

export function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    // Carregar do localStorage se disponível
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("expenses")
      return saved ? JSON.parse(saved) : []
    }
    return []
  })

  // Salvar no localStorage quando expenses mudar
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses))
  }, [expenses])

  const addExpense = (expense: Omit<Expense, "id">) => {
    const newExpense = {
      ...expense,
      id: crypto.randomUUID(),
    }
    setExpenses([...expenses, newExpense])
  }

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
  }

  return (
    <div className="space-y-8">
      <Tabs defaultValue="adicionar" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="adicionar">Adicionar</TabsTrigger>
          <TabsTrigger value="lista">Lista</TabsTrigger>
          <TabsTrigger value="resumo">Resumo</TabsTrigger>
        </TabsList>
        <TabsContent value="adicionar" className="mt-6">
          <ExpenseForm onAddExpense={addExpense} />
        </TabsContent>
        <TabsContent value="lista" className="mt-6">
          <ExpenseList expenses={expenses} onDeleteExpense={deleteExpense} />
        </TabsContent>
        <TabsContent value="resumo" className="mt-6">
          <ExpenseSummary expenses={expenses} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

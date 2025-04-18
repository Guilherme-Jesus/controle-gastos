export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: Date | string;
}

export const expenseCategories = [
  { value: "alimentacao", label: "Alimentação" },
  { value: "moradia", label: "Moradia" },
  { value: "transporte", label: "Transporte" },
  { value: "saude", label: "Saúde" },
  { value: "educacao", label: "Educação" },
  { value: "lazer", label: "Lazer" },
  { value: "vestuario", label: "Vestuário" },
  { value: "servicos", label: "Serviços" },
  { value: "outros", label: "Outros" },
];

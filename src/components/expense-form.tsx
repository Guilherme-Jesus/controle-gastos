import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { type Expense, expenseCategories } from "@/types/expense";

const formSchema = z.object({
  description: z.string().min(3, {
    message: "A descrição deve ter pelo menos 3 caracteres.",
  }),
  amount: z.coerce.number().positive({
    message: "O valor deve ser maior que zero.",
  }),
  category: z.string({
    required_error: "Selecione uma categoria.",
  }),
  date: z.date({
    required_error: "Selecione uma data.",
  }),
});

type ExpenseFormValues = z.infer<typeof formSchema>;

interface ExpenseFormProps {
  onAddExpense: (expense: Omit<Expense, "id">) => void;
}

export function ExpenseForm({ onAddExpense }: ExpenseFormProps) {
  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: "",
      amount: 0,
      category: "",
      date: new Date(),
    },
  });

  function onSubmit(values: ExpenseFormValues) {
    onAddExpense(values);
    form.reset({
      description: "",
      amount: 0,
      category: "",
      date: new Date(),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="transition-all duration-200 hover:shadow-sm">
              <FormLabel className="font-medium text-foreground">
                Descrição
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Compras no supermercado"
                  className="focus:border-primary"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormField
            control={form.control}
            name="amount"
            render={({ field: { value, ...fieldProps } }) => (
              <FormItem className="transition-all duration-200 hover:shadow-sm">
                <FormLabel className="font-medium text-foreground">
                  Valor (R$)
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    placeholder="0,00"
                    className="focus:border-primary"
                    value={value || ""}
                    {...fieldProps}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem className="transition-all duration-200 hover:shadow-sm">
                <FormLabel className="font-medium text-foreground">
                  Categoria
                </FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="focus:border-primary">
                      <SelectValue placeholder="Selecione uma categoria" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[200px]">
                    {expenseCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col transition-all duration-200 hover:shadow-sm">
              <FormLabel className="font-medium text-foreground">
                Data
              </FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full pl-3 text-left font-normal border focus:border-primary",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP", { locale: ptBR })
                      ) : (
                        <span>Selecione uma data</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) => date > new Date()}
                    initialFocus
                    locale={ptBR}
                    className="rounded-md border"
                  />
                </PopoverContent>
              </Popover>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full mt-6 bg-primary hover:bg-primary/90 transition-all duration-200 shadow-md hover:shadow-lg text-primary-foreground py-6"
        >
          Adicionar Despesa
        </Button>
      </form>
    </Form>
  );
}

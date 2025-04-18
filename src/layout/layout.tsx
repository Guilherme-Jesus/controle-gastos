import { Home, List, PieChart, PlusCircle } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="container mx-auto px-4 pt-6 pb-20 flex flex-col flex-1">
        <header className="mb-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent-foreground bg-clip-text text-transparent">
            Controle de Gastos
          </h1>
          <p className="text-muted-foreground mt-2 text-sm md:text-base">
            Gerencie seus gastos diários de forma simples e eficiente
          </p>
        </header>

        <main className="flex-1 overflow-hidden rounded-xl">
          <Outlet />
        </main>

        <footer className="mt-6 text-center text-xs text-muted-foreground py-2">
          <p>Desenvolvido para o Condomínio Argentina, Uberlândia - MG</p>
          <p className="mt-1">
            © {new Date().getFullYear()} - Consumo e produção responsáveis
          </p>
        </footer>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-background border-t py-2 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] backdrop-blur-sm bg-opacity-80 z-50">
        <div className="container mx-auto flex justify-around items-center">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs transition-all duration-200 ${
                isActive
                  ? "text-primary scale-110 font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
            end
          >
            <Home className="h-5 w-5 mb-1" />
            <span>Início</span>
          </NavLink>
          <NavLink
            to="/adicionar"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs transition-all duration-200 ${
                isActive
                  ? "text-primary scale-110 font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            <PlusCircle className="h-5 w-5 mb-1" />
            <span>Adicionar</span>
          </NavLink>
          <NavLink
            to="/lista"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs transition-all duration-200 ${
                isActive
                  ? "text-primary scale-110 font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            <List className="h-5 w-5 mb-1" />
            <span>Lista</span>
          </NavLink>
          <NavLink
            to="/resumo"
            className={({ isActive }) =>
              `flex flex-col items-center text-xs transition-all duration-200 ${
                isActive
                  ? "text-primary scale-110 font-medium"
                  : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            <PieChart className="h-5 w-5 mb-1" />
            <span>Resumo</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

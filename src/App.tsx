import { Route, Routes } from "react-router"
import { AppLayout } from "./layouts/AppLayout"

import { TicketPage } from "./pages/TicketPage"
import { HomePage } from "./pages/HomePage"
import { NewTicketPage } from "./pages/NewTicketPage"
import { TicketDetailsPage } from "./pages/TicketDetailsPage"
import { NotFoundPage } from "./pages/NotFoundPage"
import { LoginPage } from "./pages/LoginPage"

function App() {
  return (
    <Routes>
      {/* Rota de Login sem a barra de navegação/sidebar */}
      <Route path="login" element={<LoginPage />} />

      {/* Rotas internas protegidas pelo layout padrão */}
      <Route element={<AppLayout />}>
        <Route index element={<HomePage />} />
        <Route path="chamados" element={<TicketPage />} />
        <Route path="chamado/novo" element={<NewTicketPage />} />
        <Route path="chamado/:id" element={<TicketDetailsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
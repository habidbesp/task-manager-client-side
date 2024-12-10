import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateProjectView from "@/views/projects/CreateProjectView";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" index element={<DashboardView />}></Route>
          <Route
            path="/projects/create"
            element={<CreateProjectView />}
          ></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
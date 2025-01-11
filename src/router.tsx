import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import AppLayout from "@/layouts/AppLayout";
import DashboardView from "@/views/DashboardView";
import CreateProjectView from "@/views/projects/CreateProjectView";
import EditProjectView from "./views/projects/EditProjectView";
import ProjectDetailsView from "./views/projects/ProjectDetailsView";
import AuthLayout from "./layouts/AuthLayout";
import LoginView from "./views/auth/LoginView";
import RegisterView from "./views/auth/RegisterView";
import ConfirmAccountView from "./views/auth/ConfirmAccountView";
import RequestNewTokenView from "./views/auth/RequestNewTokenView";
import ResetPasswordView from "./views/auth/ResetPasswordView";
import NewPasswordView from "./views/auth/NewPasswordView";
import ProjectTeamView from "./views/projects/ProjectTeamView";
import ProfileView from "./views/profile/ProfileView";
import ChangePasswordView from "./views/profile/ChangePasswordView";
import ProfileLayout from "./layouts/ProfileLayout";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" index element={<DashboardView />} />
          <Route path="/projects/create" element={<CreateProjectView />} />
          <Route path="/projects/:projectId" element={<ProjectDetailsView />} />
          <Route
            path="/projects/:projectId/edit"
            element={<EditProjectView />}
          />
          <Route
            path="/projects/:projectId/team"
            element={<ProjectTeamView />}
          />

          <Route element={<ProfileLayout />}>
            <Route path="/profile" element={<ProfileView />} />
            <Route path="/profile/password" element={<ChangePasswordView />} />
          </Route>
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginView />} />
          <Route path="/auth/register" element={<RegisterView />} />
          <Route
            path="/auth/confirm-account"
            element={<ConfirmAccountView />}
          />
          <Route path="/auth/request-token" element={<RequestNewTokenView />} />
          <Route path="/auth/reset-password" element={<ResetPasswordView />} />
          <Route path="/auth/new-password" element={<NewPasswordView />} />
        </Route>

        {/* <Route
          path="/404"
          element={
            <div>
              <p>Oups Route not found, you are lost 😕</p>
              <Link to="/">Back to home 🏠</Link>
            </div>
          }
        /> */}

        <Route
          path="/*"
          element={
            <div>
              <p>Oups Route not found, you are lost 😕</p>
              <Link to="/">Back to home 🏠</Link>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

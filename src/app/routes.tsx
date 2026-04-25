import { createBrowserRouter } from "react-router";
import { Landing } from "./pages/landing";
import { SignUp } from "./pages/sign-up";
import { EntrepreneurScan } from "./pages/entrepreneur-scan";
import { ScanResult } from "./pages/scan-result";
import { Dashboard } from "./pages/dashboard";
import { Sprint } from "./pages/sprint";
import { Canvas } from "./pages/canvas";
import { Impact } from "./pages/impact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Landing,
  },
  {
    path: "/signup",
    Component: SignUp,
  },
  {
    path: "/scan",
    Component: EntrepreneurScan,
  },
  {
    path: "/result",
    Component: ScanResult,
  },
  {
    path: "/dashboard",
    Component: Dashboard,
  },
  {
    path: "/sprint",
    Component: Sprint,
  },
  {
    path: "/canvas",
    Component: Canvas,
  },
  {
    path: "/impact",
    Component: Impact,
  },
]);

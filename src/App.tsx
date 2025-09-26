import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/Dashboard.tsx";
import DashboardLogin from "./pages/DashboardLogin.tsx";
import BiddingPage from "./pages/BiddingPage.tsx";
import ReportsPage from "./pages/ReportsPage.tsx";
import ZonesPage from "./pages/ZonesPage.tsx";
import WardsPage from "./pages/WardsPage.tsx";
import DepartmentsPage from "./pages/DepartmentsPage.tsx";
import ExportReportPage from "./pages/ExportReportPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<DashboardLogin />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/bidding" element={<BiddingPage />} />
            <Route path="/zones" element={<ZonesPage />} />
            <Route path="/wards" element={<WardsPage />} />
            <Route path="/departments" element={<DepartmentsPage />} />
            <Route path="/export-report" element={<ExportReportPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;


import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { MainLayout } from "@/components/layout/MainLayout";
import MobileLayout from "@/pages/mobile/layout/MobileLayout";
import DeviceRedirect from "@/components/DeviceRedirect";

// Desktop pages
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import AdminRegister from "@/pages/AdminRegister";
import AdminDashboard from "@/pages/dashboard/AdminDashboard";
import ClientDashboard from "@/pages/dashboard/ClientDashboard";
import SupportDashboard from "@/pages/dashboard/SupportDashboard";
import UsersPage from "@/pages/users/UsersPage";
import TicketsPage from "@/pages/tickets/TicketsPage";
import TicketDetailPage from "@/pages/tickets/TicketDetailPage";
import NewTicketPage from "@/pages/tickets/NewTicketPage";
import NotificationsPage from "@/pages/notifications/NotificationsPage";
import ProfilePage from "@/pages/profile/ProfilePage";
import SettingsPage from "@/pages/settings/SettingsPage";
import AnalyticsPage from "@/pages/analytics/AnalyticsPage";
import KnowledgePage from "@/pages/knowledge/KnowledgePage";
import LandingPage from "@/pages/LandingPage";
import NotFound from "@/pages/NotFound";

// Mobile pages
import MobileIndex from "@/pages/mobile/MobileIndex";
import MobileLogin from "@/pages/mobile/MobileLogin";
import MobileAdminDashboard from "@/pages/mobile/dashboard/MobileAdminDashboard";
import MobileClientDashboard from "@/pages/mobile/dashboard/MobileClientDashboard";
import MobileSupportDashboard from "@/pages/mobile/dashboard/MobileSupportDashboard";
import MobileNewTicketPage from "@/pages/mobile/tickets/MobileNewTicketPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DeviceRedirect />,
    children: [
      {
        index: true,
        element: <Index />,
      },
    ],
  },
  // Desktop routes
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin/register",
    element: <AdminRegister />,
  },
  {
    path: "/landing",
    element: <LandingPage />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/dashboard/admin",
            element: <AdminDashboard />,
          },
          {
            path: "/dashboard/client",
            element: <ClientDashboard />,
          },
          {
            path: "/dashboard/support",
            element: <SupportDashboard />,
          },
          {
            path: "/users",
            element: <UsersPage />,
          },
          {
            path: "/tickets",
            element: <TicketsPage />,
          },
          {
            path: "/tickets/:id",
            element: <TicketDetailPage />,
          },
          {
            path: "/tickets/new",
            element: <NewTicketPage />,
          },
          {
            path: "/notifications",
            element: <NotificationsPage />,
          },
          {
            path: "/profile",
            element: <ProfilePage />,
          },
          {
            path: "/settings",
            element: <SettingsPage />,
          },
          {
            path: "/analytics",
            element: <AnalyticsPage />,
          },
          {
            path: "/knowledge",
            element: <KnowledgePage />,
          },
        ],
      }
    ],
  },
  // Mobile routes
  {
    path: "/mobile",
    element: <MobileIndex />,
  },
  {
    path: "/mobile/login",
    element: <MobileLogin />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MobileLayout />,
        children: [
          {
            path: "/mobile/dashboard/admin",
            element: <MobileAdminDashboard />,
          },
          {
            path: "/mobile/dashboard/client",
            element: <MobileClientDashboard />,
          },
          {
            path: "/mobile/dashboard/support",
            element: <MobileSupportDashboard />,
          },
          {
            path: "/mobile/tickets/new",
            element: <MobileNewTicketPage />,
          },
          // Placeholder routes - using desktop components until mobile versions are created
          {
            path: "/mobile/tickets",
            element: <TicketsPage />,
          },
          {
            path: "/mobile/tickets/:id",
            element: <TicketDetailPage />,
          },
          {
            path: "/mobile/users",
            element: <UsersPage />,
          },
          {
            path: "/mobile/notifications",
            element: <NotificationsPage />,
          },
          {
            path: "/mobile/profile",
            element: <ProfilePage />,
          },
          {
            path: "/mobile/settings",
            element: <SettingsPage />,
          },
          {
            path: "/mobile/analytics",
            element: <AnalyticsPage />,
          },
          {
            path: "/mobile/knowledge",
            element: <KnowledgePage />,
          },
          {
            path: "/mobile/chat",
            element: <div className="p-4 text-white">Chat feature coming soon</div>,
          },
          {
            path: "/mobile/help",
            element: <div className="p-4 text-white">Help Center coming soon</div>,
          },
        ],
      }
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

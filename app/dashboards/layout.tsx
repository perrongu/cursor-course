import { ProtectedRoute } from '../components/ProtectedRoute';
import Sidebar from "./components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProtectedRoute>
      <div className="flex h-full">
        <Sidebar />
        <div className="flex-1">
          {children}
        </div>
      </div>
    </ProtectedRoute>
  );
} 
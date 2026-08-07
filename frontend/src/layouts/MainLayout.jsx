import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      <Outlet />
    </main>
  );
}

export default MainLayout;
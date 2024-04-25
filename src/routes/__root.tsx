import { Button } from "@/components/ui/button";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex gap-4 justify-center w-full p-8 border-b border-slate-400">
        <Button variant="link" className="text-white text-lg">
          <Link to="/" className="[&.active]:font-bold">
            Home
          </Link>
        </Button>
        <Button variant="link" className="text-white text-lg">
          <Link to="/employees" className="[&.active]:font-bold">
            Employees
          </Link>
        </Button>
        <Button variant="link" className="text-white text-lg">
          <Link to="/students" className="[&.active]:font-bold">
            Students
          </Link>
        </Button>
      </div>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});

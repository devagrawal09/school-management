import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/employees/")({
  component: () => (
    <p className="text-center text-lg">Select an employee to view details</p>
  ),
});

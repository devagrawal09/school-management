import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/students/")({
  component: () => (
    <p className="text-center text-lg">Select a student to view details</p>
  ),
});

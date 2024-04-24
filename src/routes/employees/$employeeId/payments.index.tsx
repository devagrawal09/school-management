import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/employees/$employeeId/payments/")({
  component: PaymentsDefaultPage,
});

function PaymentsDefaultPage() {
  return (
    <p className="text-center text-lg">Select a payment to view details</p>
  );
}

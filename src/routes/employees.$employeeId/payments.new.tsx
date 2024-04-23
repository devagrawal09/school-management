import { store } from "@/store";
import {
  createFileRoute,
  useLoaderData,
  useRouter,
} from "@tanstack/react-router";
import { PaymentForm } from "./payments.$paymentId";
import { EmployeePayment } from "./payments";

function NewPaymentPage() {
  const { selectedEmployee } = useLoaderData({
    from: "/employees/$employeeId",
  });

  const selectedPayment: EmployeePayment = {
    id: "0",
    employeeId: selectedEmployee?.id,
  };
  const router = useRouter();

  return selectedEmployee ? (
    <PaymentForm
      payment={selectedPayment}
      onSubmit={(data) => {
        console.log(data);
        const paymentId = store.addRow("payments", data);
        if (!paymentId) return;

        router.invalidate();
        router.navigate({
          to: "/employees/$employeeId/payments/$paymentId",
          params: { employeeId: selectedEmployee.id, paymentId },
        });
      }}
    />
  ) : (
    <p className="text-center">Payment not found!</p>
  );
}

export const Route = createFileRoute("/employees/$employeeId/payments/new")({
  component: NewPaymentPage,
});

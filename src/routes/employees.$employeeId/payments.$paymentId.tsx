import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import {
  createFileRoute,
  useLoaderData,
  useRouter,
} from "@tanstack/react-router";
import { snakeToTitleCase } from "@/lib/utils";
import { store } from "@/store";
import { EmployeePayment } from "./payments";
import { useToast } from "@/components/ui/use-toast";

function PaymentDetailsPage() {
  const { selectedPayment } = useLoaderData({
    from: "/employees/$employeeId/payments/$paymentId",
  });
  const router = useRouter();
  const { toast5s } = useToast();

  return (
    <div>
      {selectedPayment ? (
        <PaymentForm
          key={selectedPayment.id}
          payment={selectedPayment}
          onSubmit={(data) => {
            store.setRow("payments", selectedPayment.id, data);
            toast5s({ title: "Payment Saved" });
            router.invalidate();
          }}
        />
      ) : (
        <p className="text-center">Employee not found!</p>
      )}
    </div>
  );
}

export const Route = createFileRoute(
  "/employees/$employeeId/payments/$paymentId"
)({
  loader: ({ params }) => {
    const payment = store.getRow("payments", params.paymentId);

    return {
      selectedPayment: {
        ...payment,
        id: params.paymentId,
      },
    };
  },
  component: PaymentDetailsPage,
});

export function PaymentForm({
  payment: employee,
  onSubmit,
}: {
  payment: EmployeePayment;
  onSubmit: (e: EmployeePayment) => void;
}) {
  const form = useForm<EmployeePayment>({
    defaultValues: employee,
    onSubmit: async ({ value }) => {
      onSubmit(value);
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div className="grid grid-cols-2 gap-4 my-2">
        <form.Field
          name="month"
          children={(field) => (
            <div>
              <label htmlFor={field.name}>
                {snakeToTitleCase(field.name || ``)}:
              </label>
              <Input
                className="text-black bg-slate-300 border-none"
                type="text"
                id={field.name}
                name={field.name}
                value={field.state.value || ``}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        />
        <form.Field
          name="amount"
          children={(field) => (
            <div>
              <label htmlFor={field.name}>
                {snakeToTitleCase(field.name || ``)}:
              </label>
              <Input
                className="text-black bg-slate-300 border-none"
                type="text"
                id={field.name}
                name={field.name}
                value={field.state.value || ``}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
              />
            </div>
          )}
        />
      </div>
      <form.Subscribe
        selector={(state) => [
          state.canSubmit,
          state.isSubmitting,
          state.isDirty,
        ]}
        children={([canSubmit, isSubmitting, isDirty]) => (
          <Button
            type="submit"
            className="float-right mt-4"
            disabled={!isDirty || !canSubmit || isSubmitting}
          >
            {isSubmitting ? "..." : "Save"}
          </Button>
        )}
      />
    </form>
  );
}

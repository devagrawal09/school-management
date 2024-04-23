import { relationships, store } from "@/store";
import {
  Link,
  Outlet,
  createFileRoute,
  useLoaderData,
  useMatches,
  useNavigate,
} from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

function PaymentsLayout() {
  const { selectedEmployee } = useLoaderData({
    from: "/employees/$employeeId",
  });

  return (
    <div>
      <div className="flex">
        {selectedEmployee ? (
          <Button>
            <Link
              to="/employees/$employeeId/"
              params={{ employeeId: selectedEmployee.id }}
            >
              Employee Details
            </Link>
          </Button>
        ) : null}
        <h2 className="text-xl text-center w-full flex flex-col justify-center">
          Employee Payments
        </h2>
      </div>
      <PaymentsList />
      <Outlet />
    </div>
  );
}

function PaymentsList() {
  const { selectedEmployee } = useLoaderData({
    from: "/employees/$employeeId",
  });

  const nav = useNavigate();
  const { employeePayments } = useLoaderData({
    from: `/employees/$employeeId/payments`,
  });

  const matches = useMatches();

  const matchSelectedPayment = matches.find(
    (m) => m.routeId === "/employees/$employeeId/payments/$paymentId"
  );
  const selectedPaymentId: string =
    matchSelectedPayment?.params &&
    (matchSelectedPayment.params as any)["paymentId"];

  const isNewPaymentRoute = matches.find(
    (m) => m.routeId === "/employees/$employeeId/payments/new"
  );

  return (
    <Table className="min-w-full table-auto my-4">
      <TableHeader>
        <TableRow className="hover:bg-slate-800 hover:bg-opacity-50">
          <TableHead className="px-4 py-2">Month</TableHead>
          <TableHead className="px-4 py-2">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {employeePayments?.map((payment) => (
          <TableRow
            key={payment.id}
            className={cn(
              `hover:bg-slate-800 cursor-pointer`,
              selectedPaymentId === payment.id && "bg-slate-800"
            )}
            onClick={() =>
              nav({
                to: "/employees/$employeeId/payments/$paymentId",
                params: {
                  employeeId: selectedEmployee!.id,
                  paymentId: payment.id,
                },
              })
            }
          >
            <TableCell className="border px-4 py-2">{payment.month}</TableCell>
            <TableCell className="border px-4 py-2">{payment.amount}</TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell
            colSpan={4}
            className={cn(
              "text-center py-4 cursor-pointer hover:bg-blue-400",
              isNewPaymentRoute && "bg-blue-500"
            )}
            onClick={() =>
              nav({
                to: "/employees/$employeeId/payments/new",
                params: { employeeId: selectedEmployee!.id },
              })
            }
          >
            Add New Payment
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export type EmployeePayment = {
  id: string;
  month?: string;
  amount?: string;
  employeeId?: string;
};

export const Route = createFileRoute("/employees/$employeeId/payments")({
  loader: ({ params }) => {
    const employeePaymentIds = relationships.getLocalRowIds(
      "employeePayments",
      params.employeeId
    );
    const employeePayments = employeePaymentIds.map((id) => {
      const payment = store.getRow("payments", id);
      return {
        id,
        ...payment,
      };
    });
    console.log({ employeePayments });
    return { employeePayments };
  },
  component: PaymentsLayout,
});

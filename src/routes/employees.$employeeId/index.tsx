import { store } from "@/store";
import {
  Link,
  createFileRoute,
  useLoaderData,
  useRouter,
} from "@tanstack/react-router";
import { EmployeeForm } from "../employees.$employeeId";
import { Button } from "@/components/ui/button";

function EmployeeDetailsPage() {
  const { selectedEmployee } = useLoaderData({
    from: "/employees/$employeeId",
  });
  const router = useRouter();

  return (
    <div>
      <div className="flex">
        <h2 className="text-xl text-center w-full flex flex-col justify-center">
          Edit Employee Details
        </h2>
        {selectedEmployee ? (
          <Button>
            <Link
              to="/employees/$employeeId/payments"
              params={{ employeeId: selectedEmployee.id }}
            >
              View Payments
            </Link>
          </Button>
        ) : null}
      </div>
      {selectedEmployee ? (
        <EmployeeForm
          key={selectedEmployee.id}
          employee={selectedEmployee}
          onSubmit={(e) => {
            store.setRow("employees", selectedEmployee.id, e);
            router.invalidate();
          }}
        />
      ) : (
        <p className="text-center">Employee not found!</p>
      )}
    </div>
  );
}
export const Route = createFileRoute("/employees/$employeeId/")({
  component: EmployeeDetailsPage,
});
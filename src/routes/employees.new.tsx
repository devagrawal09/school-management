import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Employee } from "./employees";
import { EmployeeForm } from "./employees.$employeeId";
import { store } from "@/store";

function NewEmployeePage() {
  let selectedEmployee: Employee = {
    id: "0",
    name: "",
    post: "Teacher",
    teaching_class: "LKG",
  };
  const router = useRouter();

  return (
    <div>
      <h2 className="text-xl text-center">New Employee Details</h2>
      {selectedEmployee ? (
        <EmployeeForm
          employee={selectedEmployee}
          onSubmit={(e) => {
            const employeeId = store.addRow("employees", e);
            if (!employeeId) return;

            router.invalidate();
            router.navigate({
              to: "/employees/$employeeId",
              params: { employeeId },
            });
          }}
        />
      ) : (
        <p className="text-center">Employee not found!</p>
      )}
    </div>
  );
}

export const Route = createFileRoute("/employees/new")({
  component: NewEmployeePage,
});

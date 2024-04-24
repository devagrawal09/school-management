import { createFileRoute, useRouter } from "@tanstack/react-router";
import { Employee } from "../employees";
import { store } from "@/store";
import { useToast } from "@/components/ui/use-toast";
import { EmployeeForm } from "./$employeeId";

function NewEmployeePage() {
  let selectedEmployee: Employee = {
    id: "0",
    name: "",
    post: "Teacher",
    teaching_class: "LKG",
  };
  const router = useRouter();
  const { toast5s } = useToast();

  return (
    <div>
      <h2 className="text-xl text-center">New Employee Details</h2>
      {selectedEmployee ? (
        <EmployeeForm
          employee={selectedEmployee}
          onSubmit={(e) => {
            const employeeId = store.addRow("employees", e);
            if (!employeeId) return;

            toast5s({ title: "Employee Added" });

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

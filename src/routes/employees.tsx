import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Gender, Post, Class } from "@/enums";
import { cn } from "@/lib/utils";
import { store } from "@/store";
import {
  Outlet,
  createFileRoute,
  useLoaderData,
  useMatches,
  useNavigate,
} from "@tanstack/react-router";

export const Route = createFileRoute("/employees")({
  component: Employees,
  loader: () => {
    const data = store.getTable("employees");
    const employees = Object.entries(data).map(
      ([id, employee]) =>
        ({
          id,
          ...employee,
        }) as Employee
    );
    return { employees };
  },
});

export type Employee = {
  id: string;
  name: string;
  gender?: Gender;
  father_name?: string;
  start_date?: string;
  mobile?: string;
  address?: string;
  qualification?: string;
  post?: Post;
  teaching_class?: Class;
  subject?: string;

  aadhar?: string;
};

function Employees() {
  const nav = useNavigate();

  const { employees } = useLoaderData({ from: `/employees` });
  const matches = useMatches();

  const { selectedEmployee } =
    (matches.filter((m) => m.routeId === "/employees/$employeeId").pop()
      ?.loaderData as { selectedEmployee: Employee } | undefined) || {};

  const isNewEmployee = !!matches.filter((m) => m.routeId === "/employees/new")
    .length;

  console.log(isNewEmployee);

  return (
    <div className="flex">
      <div className="w-1/2 p-8 border rounded-lg m-8">
        <h1 className="text-2xl text-center">Employees</h1>
        <Table className="min-w-full table-auto my-4">
          <TableHeader>
            <TableRow className="hover:bg-slate-800 hover:bg-opacity-50">
              <TableHead className="px-4 py-2">ID</TableHead>
              <TableHead className="px-4 py-2">Name</TableHead>
              <TableHead className="px-4 py-2">Position</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow
                key={employee.id}
                className={cn(
                  `hover:bg-slate-800 cursor-pointer`,
                  selectedEmployee?.id === employee.id && "bg-slate-800"
                )}
                onClick={() =>
                  nav({
                    to: "/employees/$employeeId",
                    params: { employeeId: employee.id },
                  })
                }
              >
                <TableCell className="border px-4 py-2">
                  {employee.id}
                </TableCell>
                <TableCell className="border px-4 py-2">
                  {employee.name}
                </TableCell>
                <TableCell className="border px-4 py-2">
                  {employee.post}
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell
                colSpan={3}
                className={cn(
                  "text-center py-4 cursor-pointer hover:bg-blue-400",
                  isNewEmployee && "bg-blue-500"
                )}
                onClick={() => nav({ to: "/employees/new" })}
              >
                Add New Employee
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div className="w-1/2 p-8 border rounded-lg m-8">
        <Outlet />
      </div>
    </div>
  );
}

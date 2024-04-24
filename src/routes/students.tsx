import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Gender, Class } from "@/enums";
import { cn } from "@/lib/utils";
import { store } from "@/store";
import {
  Outlet,
  createFileRoute,
  useLoaderData,
  useMatches,
  useNavigate,
} from "@tanstack/react-router";

function StudentsListPage() {
  const nav = useNavigate();

  const { students } = useLoaderData({ from: "/students" });

  const matches = useMatches();

  const matchSelectedStudent = matches.find(
    (m) => m.routeId === "/students/$studentId"
  );
  const selectedStudentId: string =
    matchSelectedStudent?.params &&
    (matchSelectedStudent.params as any)["studentId"];

  const isNewStudentRoute = matches.find((m) => m.routeId === "/students/new");

  return (
    <div className="md:flex">
      <div className="flex flex-col md:w-1/2">
        <div className=" p-8 border rounded-lg m-8">
          <h1 className="text-2xl text-center">Students</h1>
          <Table className="min-w-full table-auto my-4">
            <TableHeader>
              <TableRow className="hover:bg-slate-800 hover:bg-opacity-50">
                <TableHead className="px-4 py-2">Name</TableHead>
                <TableHead className="px-4 py-2">Gender</TableHead>
                <TableHead className="px-4 py-2">Class</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {students.map((student) => (
                <TableRow
                  key={student.id}
                  className={cn(
                    `hover:bg-slate-800 cursor-pointer`,
                    selectedStudentId === student.id && "bg-slate-800"
                  )}
                  onClick={() =>
                    nav({
                      to: "/students/$studentId",
                      params: { studentId: student.id },
                    })
                  }
                >
                  <TableCell className="border px-4 py-2">
                    {student.name}
                  </TableCell>
                  <TableCell className="border px-4 py-2">
                    {student.gender}
                  </TableCell>
                  <TableCell className="border px-4 py-2">
                    {student.class}
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell
                  colSpan={4}
                  className={cn(
                    "text-center py-4 cursor-pointer hover:bg-blue-400",
                    isNewStudentRoute && "bg-blue-500"
                  )}
                  onClick={() => nav({ to: "/students/new" })}
                >
                  Add New Student
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div className="flex flex-col md:w-1/2">
        <div className="p-8 border rounded-lg m-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/students")({
  component: StudentsListPage,
  loader: () => {
    const data = store.getTable("students");
    const students = Object.entries(data).map(
      ([id, student]) =>
        ({
          id,
          ...student,
        }) as Student
    );
    return { students };
  },
});

export type Student = {
  id: string;
  name: string;
  gender?: Gender;
  mobile?: string;
  address?: string;
  father_name?: string;
  start_date?: string;
  class?: Class;
};

import {
  createFileRoute,
  useLoaderData,
  useRouter,
} from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CLASSES, Class, GENDERS, Gender } from "@/enums";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "@tanstack/react-form";
import { store } from "@/store";
import { snakeToTitleCase } from "@/lib/utils";
import { Student } from "../students";
import { useToast } from "@/components/ui/use-toast";

// function StudentDetailsLayout() {
//   return <Outlet />;
// }

function StudentDetailsPage() {
  const { selectedStudent } = useLoaderData({
    from: "/students/$studentId",
  });
  const router = useRouter();
  const { toast5s } = useToast();

  return (
    <div>
      <div className="flex">
        <h2 className="text-xl text-center w-full flex flex-col justify-center">
          Edit Student Details
        </h2>
      </div>
      {selectedStudent ? (
        <StudentForm
          key={selectedStudent.id}
          student={selectedStudent}
          onSubmit={(e) => {
            store.setRow("students", selectedStudent.id, e);
            toast5s({ title: "Student Saved" });
            router.invalidate();
          }}
        />
      ) : (
        <p className="text-center">Student not found!</p>
      )}
    </div>
  );
}

export const Route = createFileRoute("/students/$studentId")({
  loader: ({ params }) => {
    const data = store.getTable("students");
    const students = Object.entries(data).map(
      ([id, student]) =>
        ({
          id,
          ...student,
        }) as Student
    );
    const selectedStudent = students.find(
      (student) => student.id === params.studentId
    );
    return { selectedStudent };
  },
  component: StudentDetailsPage,
});

export function StudentForm({
  student,
  onSubmit,
}: {
  student: Student;
  onSubmit: (e: Student) => void;
}) {
  const form = useForm<Student>({
    defaultValues: student,
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
          name="name"
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
          name="gender"
          children={(field) => (
            <div>
              <label htmlFor={field.name}>
                {snakeToTitleCase(field.name || ``)}:
              </label>
              <Select
                value={field.state.value || ``}
                onValueChange={(v) => {
                  v && field.handleChange(v as Gender);
                }}
              >
                <SelectTrigger className="text-black bg-slate-300 border-none">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>
                <SelectContent>
                  {GENDERS.map((c) => (
                    <SelectItem value={c} key={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        />
        <form.Field
          name="father_name"
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
          name="start_date"
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
          name="mobile"
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
          name="address"
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
          name="class"
          children={(field) => (
            <div>
              <label htmlFor={field.name}>
                {snakeToTitleCase(field.name || ``)}:
              </label>
              <Select
                value={field.state.value || ``}
                onValueChange={(v) => {
                  field.handleChange(v as Class);
                }}
              >
                <SelectTrigger className="text-black bg-slate-300 border-none">
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {CLASSES.map((c) => (
                    <SelectItem value={c} key={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

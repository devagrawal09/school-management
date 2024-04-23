import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CLASSES, Class, GENDERS, Gender, POSTS, Post } from "@/enums";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Employee } from "./employees";
import { useForm } from "@tanstack/react-form";
import { store } from "@/store";
import { snakeToTitleCase } from "@/lib/utils";

function EmployeeDetailsLayout() {
  return <Outlet />;
}

export const Route = createFileRoute("/employees/$employeeId")({
  loader: ({ params }) => {
    const data = store.getTable("employees");
    const employees = Object.entries(data).map(
      ([id, employee]) =>
        ({
          id,
          ...employee,
        }) as Employee
    );
    const selectedEmployee = employees.find(
      (employee) => employee.id === params.employeeId
    );
    return { selectedEmployee };
  },
  component: EmployeeDetailsLayout,
});

export function EmployeeForm({
  employee,
  onSubmit,
}: {
  employee: Employee;
  onSubmit: (e: Employee) => void;
}) {
  const form = useForm<Employee>({
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
          name="qualification"
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
          name="teaching_class"
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
        <form.Field
          name="subject"
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
          name="aadhar"
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
          name="post"
          children={(field) => (
            <div>
              <label htmlFor={field.name}>
                {snakeToTitleCase(field.name || ``)}:
              </label>
              <Select
                value={field.state.value || ``}
                onValueChange={(v) => field.handleChange(v as Post)}
              >
                <SelectTrigger className="text-black bg-slate-300 border-none">
                  <SelectValue placeholder="Select Post" />
                </SelectTrigger>
                <SelectContent>
                  {POSTS.map((c) => (
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

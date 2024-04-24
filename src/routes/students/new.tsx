import { createFileRoute, useRouter } from "@tanstack/react-router";
import { store } from "@/store";
import { useToast } from "@/components/ui/use-toast";
import { StudentForm } from "./$studentId";

function NewStudentPage() {
  const router = useRouter();
  const { toast5s } = useToast();

  return (
    <div>
      <h2 className="text-xl text-center">New Student Details</h2>
      <StudentForm
        student={{
          id: "0",
          name: "",
        }}
        onSubmit={(e) => {
          const studentId = store.addRow("students", e);
          if (!studentId) return;

          toast5s({ title: "Employee Added" });

          router.invalidate();
          router.navigate({
            to: "/students/$studentId",
            params: { studentId },
          });
        }}
      />
    </div>
  );
}

export const Route = createFileRoute("/students/new")({
  component: NewStudentPage,
});

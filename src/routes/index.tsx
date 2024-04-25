import { Button } from "@/components/ui/button";
import { Link, createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="mx-12">
      <h1 className="text-3xl m-8">School Time</h1>
      <div className="flex gap-16 my-8">
        <div className="md:w-1/2 grid grid-cols-1">
          <Button
            variant="ghost"
            className="text-2xl text-center pt-24 pb-28 border"
            asChild
          >
            <Link to="/employees">Employees</Link>
          </Button>
        </div>
        <div className="md:w-1/2 grid grid-cols-1">
          <Button
            variant="ghost"
            className="text-2xl text-center pt-24 pb-28 border"
            asChild
          >
            <Link to="/students">Students</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

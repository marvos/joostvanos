import { Outlet } from "react-router";
import { JvoFooter } from "~/components/jvoFooter";

export default function MainLayout() {
  return (
    <>
      <div className="container mx-auto">
        <Outlet />
      </div>
      <JvoFooter />
    </>
  );
}

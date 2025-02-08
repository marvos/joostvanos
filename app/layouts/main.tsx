import { Outlet } from "react-router";
import { JvoFooter } from "~/components/jvoFooter";
import { Navbar } from "~/components/Navbar";

export default function MainLayout() {
  return (
    <>
      <Navbar inverted={false} />
      <div className="mx-auto pt-14 px-0 flex items-center flex-col">
        <Outlet />
      </div>
      <JvoFooter />
    </>
  );
}

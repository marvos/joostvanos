import { Outlet } from "react-router";
import { JvoFooter } from "~/components/jvoFooter";
import { Navbar } from '~/components/Navbar';

export default function MainLayout() {
  return (
    <>
      <Navbar inverted={false}/>
      <div className="container mx-auto py-14 flex items-center flex-col">
        <Outlet />
      </div>
      <JvoFooter />
    </>
  );
}

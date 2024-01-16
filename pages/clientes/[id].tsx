import { SideBar } from "@/components/sideBar";
import { clientesSideBarItems } from "@/utils/routes";
import { useRouter } from "next/router";

export default function Cliente() {
  const router = useRouter();
  const { id, version } = router.query;
  return (
    <div className="flex flex-row">
      <SideBar items={clientesSideBarItems}></SideBar>

      <div className="container max-w-7xl mx-auto mt-8">
        <h1> cliente {id}</h1>
      </div>
    </div>
  )
}
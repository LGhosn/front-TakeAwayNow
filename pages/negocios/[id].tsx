import { SideBar } from "@/components/sideBar";
import { negociosSideBarItems } from "@/utils/routes";
import { useRouter } from "next/router";

export default function Negocio() {
  const router = useRouter();
  const { id, version } = router.query;
  return (
    <div className="flex flex-row">
      <SideBar items={negociosSideBarItems}></SideBar>

      <div className="container max-w-7xl mx-auto mt-8">
        <h1>negocio {id}</h1>
      </div>
    </div>
  )
}
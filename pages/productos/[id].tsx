import { SideBar } from "@/components/sideBar";
import { negociosSideBarItems } from "@/utils/routes";
import { useRouter } from "next/router";

export default function Productos() {
  const router = useRouter();
  const { id, version } = router.query;
  return (
    <div className="flex flex-row">
      {/* cambiar al id del negocio */}
      <SideBar items={negociosSideBarItems(id)}></SideBar>

      <div className="container max-w-7xl mx-auto mt-8">
        <h1> productos {id}</h1>
      </div>
    </div>
  )
}
import { useEffect, useState } from "react";
import DetailForm from "./detail";
import Loading from "@/components/loading";
import { useRouter } from "next/router";

export default function Producto() {
  const [producto, setProducto] = useState({});
  const [loading, setLoading] = useState(true)
  const router = useRouter();
  const { negocioId, productoId } = router.query;

  useEffect(() => {
    const productoLocalStorage = localStorage.getItem('producto');
    if (productoLocalStorage !== null) {
      setProducto(JSON.parse(productoLocalStorage));
    }
  }, [])

  useEffect(() => {
    if (producto) {
      setLoading(false)
    }
  }, [producto])

  return (
    <>
    { loading ? <Loading />
      : <DetailForm producto={producto}/>
    }
    </>
  )
}

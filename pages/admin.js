import Orden from "@/components/Orden";
import AdminLayout from "@/layout/AdminLayout";
import axios from "axios";
import useSWR from "swr";

export default function Quiosco() {
  //Esta hook swr esta optimizado para estas peticiones
  const fetcher = () => axios("/api/ordenes").then((datos) => datos.data);
  const { data, error, isLoading } = useSWR("/api/ordenes", fetcher, { refreshInterval: 100 });

  return (
    <AdminLayout pagina={"Admin"}>
      <h1 className="text-4xl font-black">Panel Administracion</h1>
      <p className="text-2xl my-10">Administra tus ordenes</p>

      {
          !isLoading && data && data.length
              ? data.map(orden => <Orden key={orden.id} orden={orden} />) 
              : <p>No hay ordenes pendientes </p> 
      }
    </AdminLayout>
  );
}

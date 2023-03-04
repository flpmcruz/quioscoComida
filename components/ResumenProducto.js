import { useEffect, useState } from "react"
import Image from "next/image"
import { formatearDinero } from "@/helpers"
import useQuisco from "@/hooks/useQuiosco"

const ResumenProducto = ({producto}) => {

    const [cantidad, setCantidad] = useState(producto.cantidad)
    const { handleAgregarPedidos, eliminarPedido } = useQuisco();

  return (
    <div className="shadow p-5 mb-3 flex gap-10 items-center relative">
        <div className="md:w-1/6">
            <Image
                width={300}
                height={400}
                alt={`Imagen producto ${producto.nombre}`}
                src={`/assets/img/${producto.imagen}.jpg`}
            />

        </div>

        <div className="md:w-4/6">
            <p className="text-2xl font-bold">{producto.nombre}</p>
            <p className="text-xl font-bold mt-2">Cantidad: {cantidad}</p>
            <p className="text-xl font-bold mt-2 text-amber-500">Precio: {formatearDinero(producto.precio)}</p>
            <p className="text-sm text-gray-700 mt-2">Subtotal: {formatearDinero(producto.precio * producto.cantidad)}</p>
        </div>

        <div className="flex gap-4 mt-5">
          <button
            type="button"
            onClick={() => {
              if(cantidad < 2 ) return
              setCantidad( () => cantidad - 1 )
              handleAgregarPedidos({...producto, cantidad})
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>

          <p className="text-2xl font-bold">{cantidad}</p>

          <button
            type="button"
            onClick={() => {
              if(cantidad >= 5 ) return
              setCantidad( () => cantidad + 1 )
              handleAgregarPedidos({...producto, cantidad})
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>

        <div>
            <button className="absolute top-3 right-3 hover:bg-amber-500 hover:rounded hover:cursor-pointer"
                onClick={() => eliminarPedido(producto.id)}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    </div>
  )
}

export default ResumenProducto
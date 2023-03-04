import { useEffect, useCallback } from 'react'
import useQuisco from '@/hooks/useQuiosco'
import Layout from '../layout/layout'
import { formatearDinero } from '@/helpers'

export default function Total() {

    const { pedidos, nombre, setNombre, colocarOrden, total } = useQuisco()

    const comprobarPedido = useCallback(() => {
        return pedidos.length === 0 || nombre.length < 3
    }, [pedidos, nombre])

    useEffect(() => {
        comprobarPedido()
    }, [pedidos, comprobarPedido])
    
    return (
        <Layout pagina="Total y confirmar pedido">
            <h1 className='text-4xl font-black'>Total y confirmar pedido</h1>
            <p className='text-2xl my-10'>Confirma tu pedido a continuacion</p>

            <form
                onSubmit={colocarOrden}
            >
                <div>
                    <label 
                        className='block uppercase text-slate-800 font-bold text-xl'
                        htmlFor='nombre'
                    >
                        Nombre
                    </label>
                    <input 
                        id='nombre'
                        type="text"
                        className='bg-gray-100 w-full lg:w-1/3 p-2 rounded-md mt-3'
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className='mt-10'>
                    <p className='text-2xl'>Total a pagar: {''} <span className='font-bold'>{formatearDinero(total)}</span></p>
                </div>

                <div className='mt-5'>
                    <input
                        type="submit"
                        className={`${comprobarPedido() ? 'bg-indigo-100' : 'bg-indigo-600 hover:cursor-pointer'} w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-white text-center `}
                        value="Confirmar Pedido"
                        disabled={comprobarPedido()}
                    />
                </div>
            </form>
        </Layout>
    )
}
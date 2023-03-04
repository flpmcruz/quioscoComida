import ResumenProducto from '@/components/ResumenProducto'
import useQuisco from '@/hooks/useQuiosco'
import Layout from '../layout/layout'

export default function Resumen() {

    const { pedidos } = useQuisco()

    return (
        <Layout pagina="Resumen">
            <h1 className='text-4xl font-black'>Resumen</h1>
            <p className='text-2xl my-10'>Revisa tu pedido</p>

            {
                pedidos?.length === 0 
                            ? ( <p className='text-center text-2xl'>No hay elementos en tu pedido</p>)
                            : ( pedidos.map( producto => (
                                <ResumenProducto
                                    key={producto.id}
                                    producto={producto}
                                />
                            )))
            }
        </Layout>
    )
}
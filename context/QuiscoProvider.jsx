import { useState, useEffect, createContext } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'react-toastify'

const QuiscoContext = createContext()

const QuioscoProvider = ({children}) => {

    const router = useRouter()

    const [categorias, setCategorias] = useState([])
    const [categoriaActual, setCategoriaActual] = useState({})
    const [producto, setProducto] = useState({})
    const [modal, setModal] = useState(false)
    const [pedidos, setPedidos] = useState([])
    const [nombre, setNombre] = useState('')
    const [total, setTotal] = useState(0)

    const obtenerCategorias = async () => {
        const { data } = await axios('/api/categorias')
        setCategorias(data)

        /* Otra forma de establecer una categoria por defecto */
        /* setCategoriaActual(data[0]) */
    }

    const eliminarPedido = id => {
        const newPedidos = pedidos?.filter( pedido => pedido.id !== id )
        setPedidos(newPedidos)
    }

    const handleAgregarPedidos = ({categoriaId, ...producto}) => {
        
        //comprobar si el producto ya esta en la orden de pedidos
        if(pedidos.some( productoState => productoState.id === producto.id)) {
            //Actualizar cantidad
            const pedidoActualizado = pedidos.map( productoState => productoState.id === producto.id 
                                                                            ? producto //actualizo con el nuevo
                                                                            : productoState) //retorno el mismo
            setPedidos(pedidoActualizado)
            toast.success('Actualizado correctamente')
        } else {
            //Agregar pedido
            setPedidos([...pedidos, producto])
            toast.success('Agregado al Pedido')
        }
    }

    const handleClickCategoria = id => {
        const categoria = categorias.filter( cat => cat.id === id )
        setCategoriaActual(categoria[0])
        router.push('/')
    }

    const handleSetProducto = producto => setProducto(producto)

    const handleChangeModal = () => setModal(!modal)

    const colocarOrden = async e => {
        e.preventDefault()
        
        try {
            const { data } = await axios.post('/api/ordenes', {
                pedidos, nombre, total, fecha: Date.now().toString()
            })
            
            //Resetear la App
            setCategoriaActual(categorias[0])
            setPedidos([])
            setNombre('')
            setTotal(0)

            toast.success('La orden ha sido enviada')

            setTimeout( () => router.push('/'), 500)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        obtenerCategorias()
    }, [])

    useEffect(() => {
        const nuevoTotal = pedidos.reduce( (total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedidos])

    /* Definir una categoria por default al iniciar */
    useEffect(() => {
        setCategoriaActual(categorias[0])
        useRouter
    }, [categorias])

    return (
        <QuiscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                producto,
                handleSetProducto,
                modal,
                handleChangeModal,
                pedidos,
                handleAgregarPedidos,
                eliminarPedido,
                nombre,
                setNombre,
                colocarOrden,
                total
            }}
        >
            {children}
        </QuiscoContext.Provider>
    )
}

export { QuioscoProvider }
export default QuiscoContext
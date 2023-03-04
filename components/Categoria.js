import useQuisco from "@/hooks/useQuiosco"
import Image from "next/image"

const Categoria = ({categoria}) => {
    const { categoriaActual, handleClickCategoria} = useQuisco()
    const { nombre, icono, id } = categoria
    return (
        <div 
            className={` ${ categoriaActual?.id === id ? 'bg-amber-400' : undefined } 
                        flex items-center gap-4 w-full border p-5 hover:bg-amber-400 hover:cursor-pointer`} 
            onClick={ () => handleClickCategoria(id) }
        >
            <Image
                width={70}
                height={70}
                src={`/assets/img/icono_${icono}.svg`}
                alt={`Imagen icono ${icono}`}
            />
            <p className="text-2xl font-bold" >
                {nombre}
            </p>
        </div>
    )
}

export default Categoria
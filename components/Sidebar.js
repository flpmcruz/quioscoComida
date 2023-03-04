import Image from "next/image";
import useQuisco from "@/hooks/useQuiosco";
import Categoria from "./Categoria";

const Sidebar = () => {

    const { categorias } = useQuisco()

    return (
        <>
        <Image
            src="/assets/img/logo.svg"
            alt="Imagen logotipo"
            width={300}
            height={100}
        />

            <nav className="mt-10">
                {categorias?.map( categoria => (
                    <Categoria
                        key={categoria.id}
                        categoria={categoria}
                    />
                ))}
            </nav>
        </>
    );
};

export default Sidebar;

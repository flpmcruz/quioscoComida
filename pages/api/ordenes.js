// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
    const prisma = new PrismaClient()

    //Obtener Ordenes
    if(req.method === 'GET') {

        try {
            const ordenes = await prisma.orden.findMany({
                where: {
                    estado: false
                }
            })
          
            res.status(200).json(ordenes)

        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: 'Ha habido un error'})            
        }
        
    }

    //Crear Ordenes
    if(req.method === 'POST') {

        try {
            const orden = await prisma.orden.create({
                data: {
                    nombre: req.body.nombre,
                    total: req.body.total,
                    pedido: req.body.pedidos,
                    fecha: req.body.fecha
                }
            })
          
            res.status(200).json(orden)

        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: 'Ha habido un error'})            
        }
        
    }

}

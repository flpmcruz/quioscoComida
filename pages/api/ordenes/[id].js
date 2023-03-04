// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { PrismaClient } from '@prisma/client'

export default async function handler(req, res) {
    const prisma = new PrismaClient()

    //Crear Ordenes
    if(req.method === 'POST') {

        try {
            const { id } = req.query

            const ordenActualizada = await prisma.orden.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    estado: true
                }
            })
          
            res.status(200).json(ordenActualizada)

        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: 'Ha habido un error'})            
        }
        
    }

}

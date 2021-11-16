import db from '../db.js'

import express from 'express';
import infoc_jdf_cliente from '../models/infoc_jdf_cliente.js';
import infoc_jdf_pedido from '../models/infoc_jdf_pedido.js';
const Router = express.Router;
const app = Router();

app.get('/', async(req, resp) => {

    try{
        let r = await db.infoc_jdf_item_pedido.findAll();
        resp.send(r);

    }catch (e){
        resp.send(e.toString())
    }
})



app.get('/pedidoss', async(req, resp) => {

    try{
        let r = await db.infoc_jdf_pedido.findAll({
            include: [
                {
                    model: db.infoc_jdf_item_pedido,
                    as: "infoc_jdf_item_pedidos",
                    required: true
                }
            ]

        });
        resp.send(r);

    }catch (e){
        resp.send(e.toString())
    }
})


app.get('/cliente', async(req, resp) => {

    try{
        let r = await db.infoc_jdf_cliente.findAll({
            include: [
                {
                    model: db.infoc_jdf_pedido,
                    as: "infoc_jdf_pedidos",
                    required: true,
                    include: [
                        {
                            model: db.infoc_jdf_item_pedido,
                            as: "infoc_jdf_item_pedidos",
                            required: false
                        }
                    ]
                }
            ]

        });
        resp.send(r);

    }catch (e){
        resp.send(e.toString())
    }
})



app.post('/', async(req, resp) => {

    try{

        let {idproduto, idcliente, formaPagamento, status } = req.body


        const usuario = await db.infoc_jdf_cliente.findOne({
            where:{id_cliente: idcliente}
       })

        const pedido = await db.infoc_jdf_pedido.create({
            id_cliente: usuario.id_cliente,
            ds_formaPagamento: formaPagamento,
            ds_status: status
        })

        const produto = await db.infoc_jdf_produto.findOne({
            where:{id_produto: idproduto}
        })

        const pedidoItem = await db.infoc_jdf_item_pedido.create({
            id_pedido: pedido.id_pedido,
            id_produto: produto.id_produto
        })

        resp.sendStatus(200);

    }catch (e){
        resp.send(e.toString())
    }
})


app.post('/v2', async(req, resp) => {

    try{

        const {formaPagamento, status, produtos , idcliente} = req.body; 


        const usuario = await db.infoc_jdf_cliente.findOne({
            where:{id_cliente: idcliente}
       })

       

        for(var product of produtos){
            const {idproduto} = product;

            const pedido = await db.infoc_jdf_pedido.create({
                id_cliente: usuario.id_cliente,
                ds_formaPagamento: formaPagamento,
                ds_status: status
            })

            const produto = await db.infoc_jdf_produto.findOne({
                where:{id_produto: idproduto}
            })
    
            const pedidoItem = await db.infoc_jdf_item_pedido.create({
                id_pedido: pedido.id_pedido,
                id_produto: produto.id_produto
            })
    
        }

        
        resp.sendStatus(200);

    }catch (e){
        resp.send(e.toString())
    }
})



export default app;
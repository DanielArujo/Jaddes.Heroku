import db from '../db.js'

import express from 'express';
import infoc_jdf_cliente from '../models/infoc_jdf_cliente.js';
import infoc_jdf_pedido from '../models/infoc_jdf_pedido.js';
const Router = express.Router;
const app = Router();

app.get('/', async(req, resp) => {

    try{
        let r = await db.infoc_jdf_pedido.findAll();
        resp.send(r);

    }catch (e){
        resp.send(e.toString())
    }
})

app.post('/', async(req, resp) => {

    let {nome} = req.body


    try{
        let r = await db.infoc_jdf_pedido.create({
            nm_cliente: nome
        },
        {
            
        });
        resp.send(r);

    }catch (e){
        resp.send(e.toString())
    }
})




export default app;
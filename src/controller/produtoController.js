import db from '../db.js'

import express from 'express';
const Router = express.Router;
const app = Router();

app.get('/', async(req, resp) => {


    try{
        let r = await db.infoc_jdf_produto.findAll();
        resp.send(r);

    }catch (e){
        resp.send(e.toString())
    }
})



app.get('/maisVendido', async(req, resp) => {

    try{
        let r = await db.infoc_jdf_produto.findAll({
            where:{
                bt_maisVendidos: true
            }
        });
        resp.send(r);

    }catch (e){
        resp.send(e.toString())
    }
})


app.get('/categoria-carne', async(req, resp) => {

    try{
        let r = await db.infoc_jdf_produto.findAll({
            where:{
                ds_categoria:"Hambúrguer bovino"
            }
        });
        resp.send(r);

    }catch (e){
        resp.send(e.toString())
    }
})

app.post('/', async(req, resp) => {

    try{

        let { produto, valor, descricao, categoria, img, maisVendido, codigo } = req.body;

        let r = await db.infoc_jdf_produto.create({
            nm_produto: produto,
            vl_produto: valor,
            ds_produto: descricao,
            ds_categoria: categoria,
            ds_imagem: img,
            bt_maisVendidos: false,
            nr_codigo: codigo
        });
        resp.send(r);

    }catch (e){
        resp.send(e.toString())
    }
})  


app.put('/:id', async(req, resp) => {

    try{
        let { id } = req.params;

        let { produto, valor, descricao, categoria, img, maisVendido, codigo } = req.body;

        let r = await db.infoc_jdf_produto.update({
            nm_produto: produto,
            vl_produto: valor,
            ds_produto: descricao,
            ds_categoria: categoria,
            ds_imagem: img,
            bt_maisVendidos: maisVendido,
            nr_codigo: codigo
        },
        {
            where: {id_produto: id}
        });
        
        resp.sendStatus(200);

    }catch (e){
        resp.send(e.toString())
    }
})  


app.delete('/:id', async(req, resp) => {

    try{
        let { id } = req.params;

        await db.infoc_jdf_produto.destroy({
            where: {id_produto: id}
        });
        
        resp.sendStatus(200);

    }catch (e){
        resp.send(e.toString())
    }
})  


export default app;
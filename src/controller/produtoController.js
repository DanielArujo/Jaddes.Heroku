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


app.get('/carne', async(req, resp) => {

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


app.get('/salgados', async(req, resp) => {

    try{
        let r = await db.infoc_jdf_produto.findAll({
            where:{
                ds_categoria:"Salgados"
            }
        });
        resp.send(r);

    }catch (e){
        resp.send(e.toString())
    }
})

app.get('/pasteis', async(req, resp) => {

    try{
        let r = await db.infoc_jdf_produto.findAll({
            where:{
                ds_categoria:"Pasteis"
            }
        });
        resp.send(r);

    }catch (e){
        resp.send(e.toString())
    }
})

app.get('/pizzas', async(req, resp) => {

    try{
        let r = await db.infoc_jdf_produto.findAll({
            where:{
                ds_categoria:"Pizzas"
            }
        });
        resp.send(r);

    }catch (e){
        resp.send(e.toString())
    }
})



app.get('/bebidas', async(req, resp) => {

    try{
        let r = await db.infoc_jdf_produto.findAll({
            where:{
                ds_categoria:"Bebidas"
            }
        });
        resp.send(r);

    }catch (e){
        resp.send(e.toString())
    }
})


app.get('/cervejas', async(req, resp) => {

    try{
        let r = await db.infoc_jdf_produto.findAll({
            where:{
                ds_categoria:"Cervejas"
            }
        });
        resp.send(r);

    }catch (e){
        resp.send(e.toString())
    }
})


app.get('/bebida-quente', async(req, resp) => {

    try{
        let r = await db.infoc_jdf_produto.findAll({
            where:{
                ds_categoria:"Bebidas Quentes"
            }
        });
        resp.send(r);

    }catch (e){
        resp.send(e.toString())
    }
})


app.get('/sucos', async(req, resp) => {

    try{
        let r = await db.infoc_jdf_produto.findAll({
            where:{
                ds_categoria:"Sucos"
            }
        });
        resp.send(r);

    }catch (e){
        resp.send(e.toString())
    }
})


app.get('/refri', async(req, resp) => {

    try{
        let r = await db.infoc_jdf_produto.findAll({
            where:{
                ds_categoria:"Refrigerante"
            }
        });
        resp.send(r);

    }catch (e){
        resp.send(e.toString())
    }
})



app.get('/sorvete', async(req, resp) => {

    try{
        let r = await db.infoc_jdf_produto.findAll({
            where:{
                ds_categoria:"Sorvetes"
            },
            where:{
                ds_categoria:"Sorvete"
            }
        });
        resp.send(r);

    }catch (e){
        resp.send(e.toString())
    }
})


app.get('/churros', async(req, resp) => {

    try{
        let r = await db.infoc_jdf_produto.findAll({
            where:{
                ds_categoria:"Churros"
            }
        });
        resp.send(r);

    }catch (e){
        resp.send(e.toString())
    }
})



app.get('/bolos', async(req, resp) => {

    try{
        let r = await db.infoc_jdf_produto.findAll({
            where:{
                ds_categoria:"Bolos"
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

        if(produto === '' || valor === '' || descricao === '' || categoria === '' || img === '' || codigo === ''){
            return resp.send({erro: 'Todos os campos devem ser preenchidos!'})
        }

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
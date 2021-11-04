import db from '../db.js'

import express from 'express';
const Router = express.Router;
const app = Router();

app.get('/', async(req, resp) => {

    try{
        let r = await db.infoc_jdf_cliente.findAll();
        resp.send(r);

    }catch (e){
        resp.send(e.toString())
    }
})


export default app;
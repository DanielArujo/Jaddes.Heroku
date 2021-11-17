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



app.post('/', async(req, resp) => {
    try{

        let { nome, telefone, email, senha, endereco, numeroEndereco, complemento } = req.body;

        if(nome === '' || telefone === '' || email === '' || senha === '' || endereco === '' || numeroEndereco === undefined){
            return resp.send({erro: 'Todos os campos devem ser preenchidos!'})
        }
        
        let r = await db.infoc_jdf_cliente.create({
            nm_cliente: nome,
            nr_telefone: telefone,
            ds_email: email,
            ds_senhaEmail: senha,
            ds_endereco: endereco,
            nr_endereco: numeroEndereco,
            ds_complemento: complemento
        });


        resp.send(r);

    }catch (e){
        resp.send(e.toString())
    }

})


app.post('/login', async(req, resp) => {
    
        let { email, senha } = req.body;

        let r = await db.infoc_jdf_cliente.findOne({
            where:{
                ds_email: email,
                ds_senhaEmail: senha
            },
            raw:true
        })
        
        if(r === null){
            resp.send({
                erro: "Credenciais Invalidas"
            })
        }
        resp.send(r)

    })  


        app.put('/:id', async(req, resp) => {

            try{
                let { id } = req.params;
                let { nome, telefone, email, senha, endereco, numeroEndereco, complemento } = req.body;
        
                await db.infoc_jdf_cliente.update({
                    nm_cliente: nome,
                    nr_telefone: telefone,
                    ds_email: email,
                    ds_senhaEmail: senha,
                    ds_endereco: endereco,
                    nr_endereco: numeroEndereco,
                    ds_complemento: complemento
                },
                {
                    where:{id_cliente: id}
                });
                
                resp.sendStatus(200);
        
            }catch (e){
                resp.send(e.toString())
            }
        })  



        

        app.delete('/:id', async(req, resp) => {

            try{
                let { id } = req.params;
        
                await db.infoc_jdf_cliente.destroy({
                    where: {id_cliente: id}
                });
                
                resp.sendStatus(200);
        
            }catch (e){
                resp.send(e.toString())
            }
        })  


export default app;
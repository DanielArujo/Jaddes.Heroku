import produtoController from './controller/produtoController.js';
import clienteController from './controller/clienteController.js';
import pedidosController from './controller/pedidosController.js'

import express from 'express';
import cors from 'cors';

const server = express();

server.use(cors());
server.use(express.json());


server.use('/produto', produtoController);
server.use('/cliente', clienteController);
server.use('/pedido', pedidosController);



server.listen(
    process.env.PORT, 
    () => console.log('...: server started'))
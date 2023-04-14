const { comprobarJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { usuarioConectado, usuarioDesonectado, grabarMensaje } = require('../controllers/socket');


// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente conectado');
    //console.log(client.handshake.headers['x-token']);
    const [valido, uid] = comprobarJWT(client.handshake.headers['x-token']);
    if (!valido) { return client.disconnect(); }

    //cliente autenticado
    usuarioConectado(uid);

    // Ingresar al usuario a una sala en particular
    client.join(uid);

    //Escuchar mensaje del cliente
    client.on('mensaje-personal', async(payload) => {
        await grabarMensaje(payload);
        io.to(payload.para).emit('mensaje-personal', payload);
    });

    client.on('disconnect', () => {
        usuarioDesonectado(uid);
    });



});
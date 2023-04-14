const Usuario = require('../models/usuario')
const Mensaje = require('../models/mensaje')

const usuarioConectado = async(uid = '') => {
    const update = { online: true };
    await Usuario.findByIdAndUpdate(uid, update);

    const usuario = await Usuario.findById(uid); // Para ver los cambios realizados
    //console.log("Autenticado:", usuario);
    return usuario;
}

const usuarioDesonectado = async(uid = '') => {
    const update = { online: false };
    await Usuario.findByIdAndUpdate(uid, update);

    const usuario = await Usuario.findById(uid); // Para ver los cambios realizados
    //console.log("Autenticado:", usuario);
    return usuario;
}

const grabarMensaje = async(payload) => {
    try {
        const mensaje = new Mensaje(payload);
        await mensaje.save();

        return true;
    } catch (error) {
        return false;
    }
}


module.exports = {
    usuarioConectado,
    usuarioDesonectado,
    grabarMensaje
}
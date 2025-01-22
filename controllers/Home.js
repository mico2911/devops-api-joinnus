// Controlador para mostrar el Home
const { format } = require('date-fns');
const Evento = require('../models/evento');

exports.getIndex = async (req, res, next) => {
    try {
        console.log('Ruta raíz alcanzada');
        const autenticado = req.session.autenticado || false;
        const dataUser = autenticado ? req.session.usuario : null;

        const eventos = await Evento.find();
        const eventosFormateados = eventos.map(evento => ({
            ...evento.toObject(),
            fecha: format(new Date(evento.fecha), 'dd/MM/yyyy') // Asegura que `fecha` es un objeto Date
        }));

        res.render('tienda/home', {
            ev: eventosFormateados,
            titulo: "Bienvenido a Joinnus",
            autenticado,
            usuario: dataUser,
            path: "/",
        });
    } catch (err) {
        console.error('Error al obtener eventos:', err);
        next(err); // Pasa el error al middleware de manejo de errores
    }
};

exports.getEvento = async (req, res, next) => {
    try {
        const codigoEvento = req.params.codigoEvento;
        const evento = await Evento.findOne({ codigo: codigoEvento }); // Actualización para usar un query más estándar

        if (!evento) {
            const error = new Error('Evento no encontrado');
            error.statusCode = 404;
            throw error;
        }

        res.render('tienda/events/detalle-producto', {
            ev: evento.toObject(),
            titulo: evento.nombre,
            path: '/eventos',
        });
    } catch (err) {
        console.error('Error al obtener el evento:', err);
        next(err); // Pasa el error al middleware de manejo de errores
    }
};

// Método para lista de eventos (posiblemente se elimine)
exports.getEventos = async (req, res, next) => {
    try {
        const eventos = await Evento.find();

        res.render('lista-eventos', {
            ev: eventos.map(evento => evento.toObject()),
            titulo: "Nuestros Eventos",
            path: "/eventos",
        });
    } catch (err) {
        console.error('Error al obtener la lista de eventos:', err);
        next(err); // Pasa el error al middleware de manejo de errores
    }
};

// Controlador para mostrar paginas fuera del sistema
exports.get404 = (req, res, next) => {
    res.status(404).render('404', { titulo: 'Pagina No Encontrada', path: ''});
};

exports.get500 = (req, res, next) => {
    res.status(500).render('500', { titulo: 'Lo sentimos', path: ''});
};

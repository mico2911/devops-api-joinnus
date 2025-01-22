module.exports = {
  beforeScenario: async (context, ee, done) => {
    // Simula un login para obtener el token
    const response = await context.http.request({
      method: 'POST',
      url: '/ingresar',
      json: { correo: 'usuario@example.com', password: 'password123' },
    });

    if (response && response.body && response.body.token) {
      context.vars.authToken = response.body.token; // Guarda el token
    } else {
      console.error('Error obteniendo el token');
    }
    return done();
  },
};

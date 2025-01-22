const request = require('supertest');
const app = require('../app');


describe('POST /registrarse', () => { //BETSABE AYALA HUAMANI

    it('debe devolver 422 si los correos ingresados no coinciden', async () => {
        const res = await request(app)
            .post('/registrarse')
            .send({
                nombre: 'Marisol',
                apellido: 'Fernadez',
                correo: 'marfer@gmail.com',
                correoConfirmado: 'fer@gmail.com', //correo diferente
                password: '123456',
                genero: 'femenino',
                ciudad: 'Huaraz'
            });

        expect(res.status).toBe(422);
        expect(res.body.mensaje).toBe('Los correos ingresados no coinciden.');
    });
});

describe('POST /ingresar', () => { //BETSABE AYALA HUAMANI

    it('debe devolver 404 si no se encuentra un usuario con el correo especificado', async () => {
        const res = await request(app)
            .post('/ingresar')
            .send({
                correo: 'manzana@gmail.com',
                password: 'abcapple'
            });

        expect(res.status).toBe(404);
        expect(res.body.mensaje).toBe('No se encontró un usuario con el correo especificado.');
    });
});
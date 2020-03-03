const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'sakila'
});

conexion.connect(function (err) {
    if (err) {
        console.log('No se pudo papi');
        return;
    }
    console.log('Si se pudo papi');
})

const txtbusqueda = document.getElementById('txt-busqueda');
const formfiltrar = document.getElementById('form-filtrar');
const resultados = document.getElementById('resultados')
formfiltrar.addEventListener('submit', function (e) {
    e.preventDefault();
});

txtbusqueda.addEventListener('keyup', async function (evt) {
    console.log(evt.code);
    if (evt.code === 'Enter') {
        //realizar busqueda en la base de datos
        conexion.query(`SELECT * FROM film WHERE title like '%${txtbusqueda.value}%' or description like '%${txtbusqueda.value}%'`,
            function (err, filas, campos) {
                if (err) {
                    console.log(`Algo salio mal papi: ${err}`)
                }
                let html = '<div>';
                for (let fila of filas) {
                    html += `<h3>${fila.title}</h3>`;
                    html += `<h4>${fila.description}</h4>`;

                }
                html += "</div>"
                resultados.innerHTML = html;
            });
    }
});



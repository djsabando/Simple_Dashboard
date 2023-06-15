let load = (data) => {
    let zonaHoraria = data["timezone"]
    let zonaHorariaHTML = document.getElementById("zonaHoraria")
    zonaHorariaHTML.textContent = zonaHoraria;

    let temperature = data['hourly']['temperature_2m'][0]
    let temperaturaHTML = document.getElementById("temperatura")
    temperaturaHTML.textContent = temperature;


    plot(data);


    // let prueba3 = data["time"]
    // let pruebaHTML3 = document.getElementById("prueba3")
    // pruebaHTML3.textContent = prueba3;


    // console.log(data);

}

let plot = (data) => {

    const ctx = document.getElementById('myChart');

    const dataset = {
        labels: data.hourly.time, /* ETIQUETA DE DATOS */
        datasets: [{
            label: 'Temperatura semanal', /* ETIQUETA DEL GRÁFICO */
            data: data.hourly.temperature_2m, /* ARREGLO DE DATOS */
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };

    const config = {
        type: 'line',
        data: dataset,
    };

    const chart = new Chart(ctx, config)
}




(
    function () {
        let meteo = localStorage.getItem('meteo');

        if (meteo == null) {
            let URL = 'https://api.open-meteo.com/v1/forecast?latitude=-2.14&longitude=-79.95&hourly=temperature_2m&daily=weathercode,temperature_2m_max,temperature_2m_min&timezone=auto';
            fetch(URL)
                .then(response => response.json())
                .then(data => {
                    load(data);
                    /* GUARDAR DATA EN LA MEMORIA */
                    localStorage.setItem("meteo", JSON.stringify(data));


                })
                .catch(console.error);

        } else {

            /* CARGAR DATA DESDE LA MEMORIA */
            load(JSON.parse(meteo));

        }

    }
)();



export async function fetchMonedas() {
    const response = await fetch("http://localhost:3000/monedas");
    const monedas = await response.json();
    return monedas
}

export async function fetchTarjetas() {
    const response = await fetch("http://localhost:3000/tarjetas");
    const tarjetas = await response.json();
    console.log(tarjetas);
    return tarjetas
}


export async function fetchGastos(mes,anio) {
    let json = {};
    json.mes = mes;
    json.anio = anio;
    const response = await fetch("http://localhost:3000/gastos/mes", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "put",
        body: JSON.stringify(json)
    });

    if (response) {
        if (response.ok) {
            const gastos = await response.json();
            return gastos
        }
    }
}

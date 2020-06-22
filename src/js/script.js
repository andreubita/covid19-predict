
charIt();
async function charIt(){
    const data = await getData();
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.xs,
            datasets: [
                {
                    label: 'COVID-19 CASES',
                    data: data.ys,
                    fill: false,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        },
    });
}

async function getData(){
    const xs = [];
    const ys = [];

    const response = await fetch('covid19pt-data/data.csv');
    const data = await response.text();

    const table = data.split('\n').slice(1);
    table.forEach(crt => {
        const columns = crt.split(',');
        const date = columns[0];
        xs.push(date);
        const cases = columns[2];
        ys.push(cases);
        const deaths = columns[13];
        console.log(date, cases, deaths);
    });
    return {xs,ys};
}
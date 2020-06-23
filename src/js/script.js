const dates = [];
const cases = [];
const newCases = [];
const deaths = [];
const recover = [];
const growthFactors = [];

charIt();
async function charIt(){
    await getData();
    growthFactor();
    const ctx = document.getElementById('chart').getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [
                {
                    label: 'COVID-19 CASES',
                    data: cases,
                    fill: false,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                }
            ]
        },
    });
}

// WIP
function growthFactor(){
    for (let i = 0; i < cases.length; i++) {
        let factor;
        let total;
        total = (i == 0) ? 0 : newCases[i] + newCases[i-1];
        factor = (i == 0) ? 0 : 1 + newCases[i] - total / total;
        //factor = (i == 0) ? 0 : newCases[i] / newCases[i-1];
        growthFactors.push(factor);
    }
    console.log(growthFactors);
}

async function getData(){
    const response = await fetch('covid19pt-data/data.csv');
    const data = await response.text();

    const table = data.split('\n').slice(6);
    table.forEach(crt => {
        const columns = crt.split(',');
        const date = columns[0];
        dates.push(date);
        const infected = parseInt(columns[2]);
        cases.push(infected);
        const casesNew = parseInt(columns[11]);
        newCases.push(casesNew);
        const deaths = parseInt(columns[13]);
        console.log(date, infected, deaths);
    });
}
async function getData() {
  const xs = [];
  const ys = [];

  const response = await fetch('./ZonAnn.Ts+dSST.csv');
  const data = await response.text();

  const table = data.split('\n').slice(1);

  table.forEach((row) => {
    const column = row.split(',');
    const year = column[0];
    xs.push(year);
    const temp = column[1];
    ys.push(+temp + 14);
    console.log(year, temp);
  });
  return { xs, ys };
}

// Chart rendering

chartIt();

async function chartIt() {
  const data = await getData();
  const ctx = document.getElementById('chart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: data.xs,
      datasets: [
        {
          label:
            'Tables of Global and Hemispheric Monthly Means and Zonal Annual Means in C˚',
          data: data.ys,
          fill: false,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          ticks: {
            callback: function (value, index, ticks) {
              return value + '˚';
            },
          },
        },
      },
    },
  });
}

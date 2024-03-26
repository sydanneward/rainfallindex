function createRainfallChart(data) {
    // Calculate total and average rainfall
    const totalRainfall = data.reduce((acc, item) => acc + (item.rainfall * 0.0393701), 0);
    const averageRainfall = totalRainfall / data.length;

    // Update the UI with total and average rainfall
    document.getElementById('totalRainfall').textContent = `Total Rainfall: ${totalRainfall.toFixed(2)} inches`;
    document.getElementById('averageRainfall').textContent = `Average Daily Rainfall: ${averageRainfall.toFixed(2)} inches`;

    const ctx = document.getElementById('rainfallChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map(item => item.date.substring(0, 10)),
            datasets: [{
                label: 'Rainfall (inches)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                data: data.map(item => (item.rainfall * 0.0393701).toFixed(2)),
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Rainfall (inches)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Date'
                    }
                }
            }
        }
    });
}

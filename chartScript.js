// chartScript.js
function createRainfallChart(data) {
    const ctx = document.getElementById('rainfallChart').getContext('2d');
    const chart = new Chart(ctx, {
        type: 'line', // Type of chart
        data: {
            // Extract only the first 10 characters of the date string for each item
            labels: data.map(item => item.date.substring(0, 10)),
            datasets: [{
                label: 'Rainfall (inches)',
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                // Convert rainfall from mm to inches and round to two decimal places
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

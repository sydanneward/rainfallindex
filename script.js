const apiEndpoint = 'https://www.ncei.noaa.gov/cdo-web/api/v2/data'; // Updated endpoint for data requests
const apiKey = 'YtYLqUwrzcSyEurbkPmZVtzLoIoCTkHx';

document.getElementById('rainfallForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const zipcode = document.getElementById('zipcode').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    
    try {
        const rainfallData = await getRainfallDataWithRetry(zipcode, startDate, endDate);
        displayRainfallData(rainfallData);
    } catch (error) {
        console.error('Error fetching rainfall data:', error);
    }
});
  
function displayRainfallData(rainfallData) {
    // Comment out or remove the previous table code
    // const displayDiv = document.getElementById('data-display');
    // let html = '<table><tr><th>Start Date</th><th>Rainfall (mm)</th></tr>';
    // rainfallData.forEach(item => {
    //     html += `<tr><td>${item.date}</td><td>${item.rainfall}</td></tr>`;
    // });
    // html += '</table>';
    // displayDiv.innerHTML = html;

    // Call the function to create the chart
    createRainfallChart(rainfallData);
}


async function getRequest(url) {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'token': apiKey, 
        },
    });

    if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}: ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Received non-JSON response from the API');
    }

    return response.json();
}

async function getRainfallData(zipcode, startDate, endDate) {
    const limit = 1000; 
    const url = `${apiEndpoint}?datasetid=GHCND&locationid=ZIP:${zipcode}&startdate=${startDate}&enddate=${endDate}&limit=${limit}&datatypeid=PRCP&datatypeid=SNOW`;
    const data = await getRequest(url);
    return data.results ? data.results.map(item => ({
        date: item.date,
        rainfall: item.value
    })) : [];
}

async function getRainfallDataWithRetry(zipcode, startDate, endDate, retries = 3) {
    try {
        return await getRainfallData(zipcode, startDate, endDate);
    } catch (error) {
        if (retries > 0) {
            console.log(`Request failed. Retrying... (${retries} retries left)`);
            return await getRainfallDataWithRetry(zipcode, startDate, endDate, retries - 1);
        } else {
            throw error;
        }
    }
}

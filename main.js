let globalCleanData;
const graphs = [ "Représentation d'une World Map montrant les emplacements des séismes avec des cercles dimensionnés par la magnitude."
    ]

async function fetchData() {
    const url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson';
    const reponse = await fetch(url);
    const data = await reponse.json();
    return data
}


function processData(data) {
    globalCleanData = data.features.map(earthquake => ({
        coordinates : [earthquake.geometry.coordinates[0], earthquake.geometry.coordinates[1]],
        magnitude : earthquake.properties.mag,
        time : earthquake.properties.time,
        depth : earthquake.geometry.coordinates[2]
    }))
    return globalCleanData
}


function WorldMap (cleanData) {
    var trace = {
        type: 'scattergeo',
        mode: 'markers',
        lon : cleanData.map(eq => eq.coordinates[0]),
        lat : cleanData.map(eq => eq.coordinates[1]),
        marker: {
            size: cleanData.map(data => data.magnitude*5),
            color: cleanData.map(data => data.magnitude**2.5),
            cmin: 0,
            cmax: 100,
            colorscale: 'Reds',
            reversescale : false,
            colorbar: {
                title: 'Some rate',
                ticksuffix: '%',
                showticksuffix: 'last'
            },
            line: {
                color: 'black'
            }
        },
        name: 'europe data'
    };
    var layout = {
        title: {
            text: 'Global Earthquakes Visualization',
            font: {
                size: 24,
                family: 'Monospace',
            }
        },
        //width : 1000,
        //height : 500,
        geo: {
            'scope': 'world',
            'resolution': 50,
            projection : {
                type : "natural earth"
            }
        }
    };
    var data = [trace]
    Plotly.newPlot('world-map', data, layout);    
}


function Histogram(cleanData) {
    var trace = {
        x: cleanData.map(data => data.magnitude),
        type: 'histogram',
        opacity : 0.75,
        marker : {
            color : "darkcyan"
        }
    };
    var layout = {
        title: {
            text: 'Histogram of Earthquake Magnitudes',
            font: {
                size: 24,
                family: 'Monospace',
            }
        },
        //height: 500
    };
    var data = [trace];
    Plotly.newPlot('mag-histogram', data, layout);
}


function LineChart (cleanData) {
    const eq = {};
    cleanData.map(data => {
        const day = new Date(data.time).toLocaleDateString();
        if (eq[day] == undefined) {eq[day] = 0}
        eq[day]+=1;
    }),
    trace = {
        type: 'scatter',
        x: Object.keys(eq).reverse(),
        y : Object.values(eq).reverse(),
        mode: 'lines',
        name: 'Red',
        line: {
          color: 'lightgreen',
          width: 2
        }
      };
    var layout = {
        title: {
            text: 'Daily Earthquake Frequency',
            font: {
                size: 24,
                family: 'Monospace',
            }
        },
        yaxis: {
            range: [Math.min(...Object.values(eq))-50, Math.max(...Object.values(eq))+20]
        }
    };
    
    var data = [trace]
    Plotly.newPlot('eq-lineChart', data, layout); 
}


function MagnitudeVSDepth(cleanData) {
    var trace = {
        x: cleanData.map(data => data.magnitude),
        y: cleanData.map(data => data.depth),
        mode: 'markers',
        size: 12,
        type: 'scatter',
        marker : {
            symbol : 'diamond',
            color : 'coral',
            size : 3,
        }
    };
    var layout = {
        title: {
            text: 'Magnitude VS Depth',
            font: {
                size: 24,
                family: 'Monospace',
            }
        },
    };
      
    var data = [trace];
    Plotly.newPlot('magVSdepth', data, layout);
}

function printDescription () {
    this.innerHTML = '<div class="hidden">' + this.getAttribute("description") + '</div>';
}

function printGraph () {
    this.innerHTML =`<div id=${this.id}> </div>`;
    switch (this.id) {
        case 'world-map' :
            WorldMap(globalCleanData);
        case 'mag-histogram':
            Histogram(globalCleanData);
        case 'eq-lineChart':
            LineChart(globalCleanData);
        case 'magVSdepth':
            MagnitudeVSDepth(globalCleanData);
        default :
            break;
    }
}

document.getElementById('world-map').addEventListener('mouseenter', printDescription);
document.getElementById('world-map').addEventListener('mouseleave', printGraph);
document.getElementById('mag-histogram').addEventListener('mouseenter', printDescription);
document.getElementById('mag-histogram').addEventListener('mouseleave', printGraph);
document.getElementById('eq-lineChart').addEventListener('mouseenter', printDescription);
document.getElementById('eq-lineChart').addEventListener('mouseleave', printGraph);
document.getElementById('magVSdepth').addEventListener('mouseenter', printDescription);
document.getElementById('magVSdepth').addEventListener('mouseleave', printGraph);


fetchData()
    .then(rawData => processData(rawData))
    .then(cleanData => {
        WorldMap(cleanData);
        Histogram(cleanData);
        LineChart(cleanData);
        MagnitudeVSDepth(cleanData);
    });

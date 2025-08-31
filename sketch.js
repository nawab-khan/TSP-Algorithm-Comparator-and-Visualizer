let cities = [], bestTour = [], currentBest = [];

let algorithmSelect, startBtn, resetBtn, cityInput;
let populationInput, mutationInput;

let numCities = 12, populationSize = 200, mutationRate = 0.01;
let isGARunning = false;

function setup(){
    let canvas = createCanvas(800, 600);
    canvas.parent('canvas-container');

    algorithmSelect = select('#algorithm-select');
    startBtn = select('#start-btn');
    resetBtn = select('#reset-btn');
    cityInput = select('#city-input');
    populationInput = select('#population-input');
    mutationInput = select('#mutation-input');

    // default state
    numCities = cityInput.value();
    populationSize = populationInput.value();
    mutationRate = mutationInput.value() / 100;

    startBtn.mousePressed(runSelectedAlgorithm);
    resetBtn.mousePressed(generateNewCities);
    algorithmSelect.changed(onAlgorithmChange);

    generateNewCities();
}

function draw(){
    background(0);

    if (isGARunning)
        runSingleGeneration();

    drawCities();
    drawTour(currentBest, color('#A9CCE3'), 1);
    drawTour(bestTour, color('#F1C40F'), 3);
}

function keyPressed(){

    if(keyCode === ENTER){

        // updates state values from user input
        numCities = cityInput.value();
        populationSize = populationInput.value();
        mutationRate = mutationInput.value() / 100;

        generateNewCities();
    }
}

// main
function generateNewCities(){
    isGARunning = false;

    cities = [];
    for(let i = 0; i < numCities; i++) 
        cities.push(createVector(random(20, width - 20), random(20, height - 20)));

    bestTour = [];
    currentBest = [];

    updateResults("N/A", "N/A", "N/A");
}

function runSelectedAlgorithm(){
    isGARunning = false;

    currentBest = [];
    
    const selectedAlgo = algorithmSelect.value();
    let startTime = millis(), result;

    if(selectedAlgo === 'genetic_algo'){
        startGeneticAlgorithm();
        isGARunning = true;
        return;
    }
    
    switch (selectedAlgo){
        case 'brute_force':
            if (cities.length > 9){
                alert("Too slow! Might (probably will) get stuck.");
                return;
            }
            result = runBruteForce(cities);
            break;
        case 'nearest_neighbor':
            result = runNearestNeighbor(cities);
            break;
        case 'two_optimal_swap':
            result = runTwoOptSwap(cities);
            break;
        case 'christofides_algo':
            result = runChristofides(cities);
            break;
    }
    
    let endTime = millis();

    bestTour = result.tour;
    updateResults(selectedAlgo, result.distance.toFixed(2), (endTime - startTime).toFixed(2) + " ms");
}


function onAlgorithmChange(){

    if (algorithmSelect.value() === 'genetic_algo')
        select('#ga-controls').style('display', 'block');
    else
        select('#ga-controls').style('display', 'none');

}

function drawCities(){
    fill('#EAECEE');
    noStroke();
    
    for(const city of cities) 
        ellipse(city.x, city.y, 16, 16);

}

function drawTour(tour, col, weight){
    if(!tour || tour.length === 0)
        return;
    
    stroke(col);
    strokeWeight(weight);
    noFill();
    beginShape();

    for(const cityIndex of tour) 
        vertex(cities[cityIndex].x, cities[cityIndex].y);

    if(tour.length > 0)
        vertex(cities[tour[0]].x, cities[tour[0]].y);

    endShape();
}


function updateResults(name, dist, time, generation) {
    select('#result-algo-name').html(name);
    select('#result-distance').html(dist);

    if (generation > 0)
        select('#result-time').html(`Generation: ${generation} | Time: ${time}`);
    else
        select('#result-time').html(`Time: ${time}`);
}

// function updateResults(name, dist, time){
//     select('#result-algo-name').html(name);
//     select('#result-distance').html(dist);
//     select('#result-time').html(time);
// }

// function updateResultsGenetic(name, dist, time){
//     select('#result-algo-name').html(name);
//     select('#result-distance').html(dist);
//     select('#result-time').html(time);
// }

// function updateResults(name, dist){
//     select('#result-algo-name').html(name);
//     select('#result-distance').html(dist);
// }
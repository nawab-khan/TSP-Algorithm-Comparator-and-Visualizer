// meta-heuristic : Among a finite permutation of tours (population),
// some best tours (selection) found undergo some change (crossover + mutation) 
// to see if a better result (offspring) can be obtained. 
// This goes on for a huge number of iterations (generations). 
// Theoreticaly infinite genereations (as this is inspired for evolution and natural selection)

let population = [], fitness = [];
let generationCount = 0;
let startTime = 0;

// the first form of life
function startGeneticAlgorithm(){
    population = [];
    fitness = [];
    generationCount = 0;
    let startTime = millis(); 
    
    let order = [];
    for(let i = 0; i < cities.length; i++)
        order.push(i);

    for(let i = 0; i < populationSize; i++)
        population[i] = shuffle(order);

    bestTour = population[0].slice();
    currentBest = population[0].slice();
}

function runSingleGeneration(){
    calculateFitness();
    nextGeneration();
}

function calculateFitness(){
    let currentRecord = Infinity;

    for(let i = 0; i < population.length; i++){
        let d = calculateTourDistance(population[i], cities);

        // best of all time
        if(d < calculateTourDistance(bestTour, cities))
            bestTour = population[i].slice();

        // best one in this generation
        if(d < currentRecord){
            currentRecord = d;
            currentBest = population[i].slice();
        }
        
        fitness[i] = 1 / (pow(d, 8) + 1);
        // +1, because (by some miracle) we can get d as 0
    }

    // normalization to get a probability distribtion
    let sum = 0;
    for(let i = 0; i < fitness.length; i++)
        sum += fitness[i];

    for(let i = 0; i < fitness.length; i++)
        fitness[i] = fitness[i] / sum;

}

function nextGeneration(){
    let newPopulation = [];
    
    for(let i = 0; i < population.length; i++){
        
        //selection
        let orderA = pickOne(population, fitness), orderB = pickOne(population, fitness);
        
        // crossover
        let order = crossOver(orderA, orderB);

        // introducing some mutation
        mutate(order, mutationRate);
        newPopulation[i] = order;
    }

    population = newPopulation;

    generationCount++;
    let elapsedTime = ((millis() - startTime) / 1000).toFixed(2);

    let bestDist = calculateTourDistance(bestTour, cities);

    updateResults("Genetic Algorithm", bestDist.toFixed(2), `${elapsedTime} s`, generationCount);
    // updateResultsGenetic("Genetic Algorithm", bestDist.toFixed(2), `Generation: ${generationCount}`);
    // updateResults("Genetic Algorithm", bestDist.toFixed(2));
}

// Weighted Selection
function pickOne(list, prob){
    let index = 0;
    let r = random(1);

    while (r > 0) {
        r = r - prob[index];
        index++;
    }
    
    index--;    
    return list[index].slice();
}

function crossOver(orderA, orderB){
    let start = floor(random(orderA.length));
    let end = floor(random(start + 1, orderA.length));
    let neworder = orderA.slice(start, end);

    for(let i = 0; i < orderB.length; i++){
        let city = orderB[i];
    
        if(!neworder.includes(city))
            neworder.push(city);
    }

    return neworder;
}

function mutate(order, mutationRate){
    // mutation is done using a swap
    for(let i = 0; i < cities.length; i++){
        if(random(1) < mutationRate){
            let indexA = floor(random(order.length)), indexB = floor(random(order.length));
            swap(order, indexA, indexB);
        }
    }
}
// greedy choice : go to the closest city
function runNearestNeighbor(cities){
    let tour = [];
    let unvisited = [];
    for (let i = 0; i < cities.length; i++)
        unvisited.push(i);

    let currentCityIndex = unvisited[0];
    tour.push(currentCityIndex);
    // console.log('start city:', currentCityIndex);

    unvisited.splice(0, 1);

    // finding next closest
    while(unvisited.length){
        let nearestCity;
        let record = Infinity;

        for(let i = 0; i < unvisited.length; i++){
            const cityIndex = unvisited[i], currentCity = cities[currentCityIndex], nextCity = cities[cityIndex];
            
            const d = dist(currentCity.x, currentCity.y, nextCity.x, nextCity.y);

            if(d < record){
                record = d;
                nearestCity = cityIndex;
            }
        }
        
        // next city in our tour.
        currentCityIndex = nearestCity;
        tour.push(currentCityIndex);
        // console.log(' -> next :', currentCityIndex);
        
        const toRemove = unvisited.indexOf(nearestCity);
        unvisited.splice(toRemove, 1);
    }
    
    const finalDist = calculateTourDistance(tour, cities);
    return{
        tour: tour,
        distance: finalDist
    };
}
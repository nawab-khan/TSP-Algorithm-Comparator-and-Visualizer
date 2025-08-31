function calculateTourDistance(tour, cities){
    if(!tour || tour.length < cities.length)
        // incomplete tour
        return Infinity;

    let totalDistance = 0;

    for (let i = 0; i < tour.length - 1; i++) {
        let cityA = cities[tour[i]], cityB = cities[tour[i + 1]];

        totalDistance += dist(cityA.x, cityA.y, cityB.x, cityB.y);
    }

    // adding distance (last, first) to complete tour
    totalDistance += dist(cities[tour[tour.length - 1]].x, cities[tour[tour.length - 1]].y,
        cities[tour[0]].x, cities[tour[0]].y);

    return totalDistance;
}

function swap(a, i, j) {
    [a[i], a[j]] = [a[j], a[i]];
}
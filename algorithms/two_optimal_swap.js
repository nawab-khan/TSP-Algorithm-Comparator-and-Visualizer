// hueristic : edges that cross over each other are bad for business (Sales! its in the name)

// imagine the tour is in the shape of a trapezoid, 
// its better to go around the perimeter than to visit the two diagonals (crossed edges).

function runTwoOptSwap(cities){
    // using NN for the starting tour, bcz its fast
    let initialResult = runNearestNeighbor(cities);
    let currentTour = initialResult.tour;
    let bestDistance = initialResult.distance;
    // console.log('start distance:', bestDistance);

    let cnt = 1000; // infinite loops can happen 
    while(cnt--){
        let startDistance = bestDistance;
        
        for(let i = 0; i < currentTour.length - 1; i++){
            for(let j = i + 1; j < currentTour.length; j++){
                
                // reverse a segment of tour
                let newTour = currentTour.slice();
                let segment = newTour.slice(i, j);
                segment.reverse();
                
                // splicing it back
                Array.prototype.splice.apply(newTour, [i, segment.length].concat(segment));

                let newDistance = calculateTourDistance(newTour, cities);
                if(newDistance < bestDistance){
                    currentTour = newTour;
                    bestDistance = newDistance;
                    // console.log(' -> better:', bestDistance);
                }
            }
        }
        
        // quit, if no improvement
        if(bestDistance >= startDistance)
            break;
    }

    return{
        tour: currentTour,
        distance: bestDistance,
    };
}
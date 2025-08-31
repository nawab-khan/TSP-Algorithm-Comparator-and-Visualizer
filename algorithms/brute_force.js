function runBruteForce(cities){

    let p = Array.from(Array(cities.length).keys());
    let bestOrder = p.slice();
    let recordDistance = calculateTourDistance(p, cities);
    // console.log('start distance:', recordDistance);

    // lexicographical permutations
    while(true){

        // finds pivot
        let i = -1;
        for(let k = 0; k < p.length - 1; k++){
            if(p[k] < p[k + 1])
                i = k;
        }

        // last permutation.
        if (i === -1)
            break;

        // index which the pivot will be swapped with
        let j = -1;
        for(let k = 0; k < p.length; k++){
            if(p[i] < p[k])
                j = k;
        }

        swap(p, i, j);

        let end = p.splice(i + 1);
        end.reverse();
        p = p.concat(end);
        
        let d = calculateTourDistance(p, cities);
        if(d < recordDistance){
            recordDistance = d;
            bestOrder = p.slice();
            // console.log(recordDistance);
        }
    }

    return{
        tour: bestOrder,
        distance: recordDistance,
    };
}
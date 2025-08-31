// Approximation Algorithm : guaranteed to produce a 1.5-Approximate Solution.
// Uses concept of Graph Theory like: 
// Minimum Spanning Tree (MST), Perfect Matching, Eulerian Circuit and Hamiltonian Circuit
// some really heavy graph theory (IMO)

function runChristofides(cities){
    const n = cities.length;

    function findMST(nodes){
        let tree = [], reached = new Set([0]);
        let unreached = new Set(Array.from({ length: nodes.length - 1 }, (_, i) => i + 1));
        
        while(unreached.size > 0){

            let record = Infinity, edge = null;
            
            for(const u of reached){
                for(const v of unreached){
                    let d = dist(nodes[u].x, nodes[u].y, nodes[v].x, nodes[v].y);

                    if(d < record){
                        record = d;
                        edge = { u, v };
                    }
                }
            }

            tree.push(edge);
            reached.add(edge.v);
            unreached.delete(edge.v);    
        }

        return tree;
    }

    function findOddDegreeVertices(edges){
        let degrees = new Array(n).fill(0);

        for(const edge of edges){
            degrees[edge.u]++;
            degrees[edge.v]++;
        }
        
        let odds = [];
        for(let i = 0; i < degrees.length; i++){
            if(degrees[i] % 2 !== 0){
                odds.push(i);
            }
        }

        return odds;
    }
    
    function findGreedyMatching(verts, nodes){
        let pairs = [], available = [...verts];
        
        while(available.length > 0){
            const u = available.pop();
            let bestV = -1, minD = Infinity;
        
            for(const v of available){
                const d = dist(nodes[u].x, nodes[u].y, nodes[v].x, nodes[v].y);
                if(d < minD){
                    minD = d;
                    bestV = v;
                }
            }
        
            pairs.push({ u, v: bestV });
            available.splice(available.indexOf(bestV), 1);
        }
        
        return pairs;
    }

    function findEulerianCircuit(edges){
        let adj = Array.from({ length: n }, () => []);
        
        for(const edge of edges){
            adj[edge.u].push(edge.v);
            adj[edge.v].push(edge.u);
        }
        
        let circuit = [], stack = [0];
        while(stack.length > 0){
            const u = stack[stack.length - 1];

            if(adj[u].length > 0){
                const v = adj[u].pop();
                adj[v].splice(adj[v].indexOf(u), 1);
                stack.push(v);
            }
            else
                circuit.push(stack.pop());
        }
        
        return circuit.reverse();
    }

    function convertToTour(circuit){
        let finalPath = [], visited = new Set();
        
        for(const city of circuit){
            if(!visited.has(city)){
                finalPath.push(city);
                visited.add(city);
            }
        }
        
        return finalPath;
    }
    
    // Step 1: getting the Minimum Spanning Tree
    const mst = findMST(cities);

    // Step 2: finding odd degree vertices in the MST
    const oddDegreeVertices = findOddDegreeVertices(mst);
    
    // Step 3: finding a minimum weighted perfect matching for these odd vertices
    const matching = findGreedyMatching(oddDegreeVertices, cities);

    // Step 4: combining the MST and the perfect matching
    const multigraph = mst.concat(matching);

    //Step 5 : finding an Eulerian circuit on this combintion
    const eulerianCircuit = findEulerianCircuit(multigraph);

    // Step 6: converting the eulerian circuit to a hamiltonian circuit by skipping repeated vertices (cities)
    const tour = convertToTour(eulerianCircuit);

    return{
        tour: tour,
        distance: calculateTourDistance(tour, cities),
    };
}
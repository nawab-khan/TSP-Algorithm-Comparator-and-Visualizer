# TSP Algorithm Comparator and Visualizer

This project is an interactive tool I built to explore the famous Traveling Salesperson Problem (TSP). The goal is to find the shortest possible loop through a set of cities, a classic puzzle in computer science.

The TSP is an **NP-hard Problem**, which formal states that finding the *perfect* solution gets incredibly slow as you add more cities. This visualizer lets you compare different strategies that can be used to find good solutions in feasible time.

Link to live demo : https://nawab-khan.github.io/TSP-Algorithm-Comparator-and-Visualizer/


---
## The Algorithms

I've implemented five different algorithms, each with a unique technical approach.

### 1. Brute Force
* **Strategy**: **Exact**
* **How it Works**: This is the most direct method. It generates every single possible permutation of the tour and calculates the distance of each one to find the absolute best.
* **Performance**: It has a time complexity of **$O(N!)$**. This means the runtime increases N-fold with each new city, making it useful only for very small sets (typically 9 cities or fewer). It's guaranteed to be perfect, but its slow.

### 2. Nearest Neighbor
* **Strategy**: **Greedy**
* **How it Works**: A simple and fast approach. It starts at one city and repeatedly travels to the closest unvisited city until tour is complete.
* **Performance**: With a time complexity of **$O(N^2)$**, it's very fast. However, the "greedy" choices it makes are often not optimal in the long run, so the final path is usually not the best. Falls for the local minima trap.

### 3. 2-Opt Swap
* **Strategy**: **Local Search Heuristic**
* **How it Works**: This algorithm doesn't build a tour from scratch; it improves an existing one. It systematically searches for two paths (edges) in the tour that cross over each other and "uncrosses" them, which always shortens the total distance. This is done until no more improvements can be found.
* **Performance**: It's an iterative process that effectively refines a tour to a **local optimum** (a state where no simple swap can make it better). This too, falls for the local minima trap.

### 4. Christofides Algorithm
* **Strategy**: **1.5-Approximation Algorithm**
* **How it Works**: This is a sophisticated method from graph theory and uses approximation schemes that involve several steps:
    1.  Build a **Minimum Spanning Tree (MST)**.
    2.  Find all vertices with an odd-degree.
    3.  Find a **minimum-weighted perfect matching** for these odd-degree vertices.
    4.  Combine the MST and perfect matching to form an **Eulerian Circuit**.
    5.  Convert the circuit into a tour by skipping repeated vertices, making it a **Hamiltonian Circuit**
* **Performance**: It's guaranteed to produce a tour that is no more than 1.5 times the distance of the optimal solution. It runs in polynomial time, around **$O(N^3)$**.

### 5. Genetic Algorithm
* **Strategy**: **Metaheuristic**
* **How it Works**: This algorithm is inspired by evolution adn natural selection. It produces a large **population** of random tours. In each *generation,* it rates the tours by their distance (**fitness**), allows the best ones to *intermingle* (**crossover**), and introduces random changes (**mutation**) to create a new, hopefully better, generation.
* **Performance**: It doesn't have a defined endpoint and will run continuously (kind of like evoution), producing better solutions over time. It's excellent for exploring a vast number of possibilities to find a high-quality solution.
Doesn't fall for the local minima trap because of the mutation introduced.


---
## How to Use

1.  **Open the Live Demo**.
2.  **Set the number of cities** and other parameters in the input boxes, then press "Enter".
3.  **Choose an algorithm** from the dropdown menu.
4.  **Click "Start"** and watch the algorithm find a tour.
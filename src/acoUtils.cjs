// Funkcja wyboru następnego koloru
function selectNextColor(availableColors, pheromones, alpha, beta) {
    const probabilities = availableColors.map(color => Math.pow(pheromones[color], alpha));
    const sum = probabilities.reduce((a, b) => a + b, 0);
    const normalizedProbabilities = probabilities.map(p => p / sum);
    const randomValue = Math.random();
    let cumulativeProbability = 0.0;
    for (let i = 0; i < availableColors.length; i++) {
        cumulativeProbability += normalizedProbabilities[i];
        if (randomValue <= cumulativeProbability) {
            return availableColors[i];
        }
    }
}

// Funkcja kolorowania grafu
function colorGraph(graph, numColors, pheromones, alpha, beta) {
    const colors = new Array(graph.size).fill(-1);
    for (const [vertex, neighbors] of graph) {
        const availableColors = [];
        for (let c = 0; c < numColors; c++) {
            if (neighbors.every(neighbor => colors[neighbor] !== c)) {
                availableColors.push(c);
            }
        }
        if (availableColors.length === 0) {
            return null;
        }
        const selectedColor = selectNextColor(availableColors, pheromones[vertex], alpha, beta);
        colors[vertex] = selectedColor;
    }
    return colors;
}

// Funkcja inicjalizująca feromony
function initializePheromones(numVertices) {
    return Array.from({ length: numVertices }, () => Array(numVertices).fill(1));
}


// Funkcja aktualizacji feromonów
function updatePheromones(pheromones, allColors, bestColors, rho, Q) {
    for (let i = 0; i < pheromones.length; i++) {
        for (let j = 0; j < pheromones[i].length; j++) {
            pheromones[i][j] *= (1 - rho);
        }
    }
    allColors.forEach(colors => {
        if (colors) {
            colors.forEach((color, vertex) => {
                pheromones[vertex][color] += Q / colors.length;
            });
        }
    });
}

// Funkcja aco
function aco(numIterations, numAnts, numVertices, graph, pheromones, alpha, beta, rho, Q) {
    let bestColors = null;
    let bestNumColors = Infinity;

    for (let iteration = 0; iteration < numIterations; iteration++) {
        const allColors = [];
        for (let ant = 0; ant < numAnts; ant++) {
            const numColors = Math.floor(Math.random() * numVertices) + 1;
            const colors = colorGraph(graph, numColors, pheromones, alpha, beta);
            allColors.push(colors);
            if (colors && new Set(colors).size < bestNumColors) {
                bestColors = colors;
                bestNumColors = new Set(colors).size;
            }
        }
        updatePheromones(pheromones, allColors, bestColors, rho, Q);

        // Wstępne sprawdzenie, czy osiągnęliśmy optymalne rozwiązanie
        if (bestNumColors === 1) {
            break;
        }
    }

    return { bestColors, bestNumColors };
}





module.exports = { initializePheromones, aco };
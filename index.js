import { loadGraphFromFile } from './src/fsUtils.cjs';
import { initializePheromones, aco  } from './src/acoUtils.cjs';
import { greedyColorGraph  } from './src/greedyUtils.cjs';

// Główna funkcja
function main(filePath) {
    // Sprawdzenie czy ścieżka do pliku została podana
    if (!filePath) {
        console.error('Podaj ścieżkę do pliku jako argument.');
        process.exit(1);
    }

    // Załadowanie grafu
    const { graph, numVertices } = loadGraphFromFile(filePath);

    // Stworzenie zmiennych dla feromonów
    const numAnts = 20;
    const numIterations = 10;
    const alpha = 1.0;
    const beta = 2.0;
    const rho = 0.5;
    const Q = 100;

    // Inicjalizacja feromonów
    let pheromones = initializePheromones(numVertices);

    // Wywołanie algorytmu ACO
    const {bestColors, bestNumColors} = aco(numIterations, numAnts, numVertices, graph, pheromones, alpha, beta, rho, Q);
    console.log("Najlepsze znalezione kolorowanie przez ACO:", bestColors);
    console.log("Liczba użytych kolorów (algorytm ACO):", bestNumColors);

    // Wywołanie algorytmu zachłannego
    const greedyColors = greedyColorGraph(graph);
    console.log("Kolorowanie znalezione przez algorytm zachłanny:", greedyColors);
    console.log("Liczba użytych kolorów (algorytm zachłanny):", new Set(greedyColors).size);
}

// Pobierz ścieżkę do pliku z argumentów wiersza poleceń i uruchom główną funkcję
const filePath = process.argv[2];
main(filePath);
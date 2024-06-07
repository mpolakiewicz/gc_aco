const fs = require('fs');

// Function to load the graph from a file
function loadGraphFromFile(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8');
    const lines = data.trim().split(/\s+/);
    const numVertices = parseInt(lines[0], 10);
    const graph = new Map();

    for (let i = 1; i < lines.length; i += 2) {
        const vertex1 = parseInt(lines[i], 10) - 1;  // Zero-based indexing
        const vertex2 = parseInt(lines[i + 1], 10) - 1;  // Zero-based indexing

        if (!graph.has(vertex1)) {
            graph.set(vertex1, []);
        }
        if (!graph.has(vertex2)) {
            graph.set(vertex2, []);
        }

        graph.get(vertex1).push(vertex2);
        graph.get(vertex2).push(vertex1);
    }

    return { graph, numVertices };
}

module.exports = { loadGraphFromFile };
function greedyColorGraph(graph) {
    const colors = new Array(graph.size).fill(-1);
    const availableColors = new Array(graph.size).fill(true);
    
    colors[0] = 0; // Assigning the first color to the first vertex

    for (let u = 1; u < graph.size; u++) {
        const neighbors = graph.get(u);
        if (!neighbors) continue; // Skip if neighbors are undefined

        neighbors.forEach(neighbor => {
            if (colors[neighbor] !== -1) {
                availableColors[colors[neighbor]] = false;
            }
        });

        const color = availableColors.indexOf(true);
        colors[u] = color;

        neighbors.forEach(neighbor => {
            if (colors[neighbor] !== -1) {
                availableColors[colors[neighbor]] = true;
            }
        });
    }

    return colors;
}

module.exports = { greedyColorGraph };

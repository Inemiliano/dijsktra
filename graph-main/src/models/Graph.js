export default class Graph {
    constructor() {
        this.adjacencyList = new Map();
    }

    insertVertices(...vertices) {
        for (let vertex of vertices) {
            this.adjacencyList.set(vertex, []);
        }
    }

    insertEdge(start, end, weight = 1) {
        if (!this.adjacencyList.has(start) || !this.adjacencyList.has(end)) {
            return false;
        }

        this.adjacencyList.get(start).push({ node: end, weight });
        this.adjacencyList.get(end).push({ node: start, weight }); // If undirected graph

        return true;
    }

    dijkstra(start) {
        const distances = new Map();
        const visited = new Set();

        // Initialize distances with Infinity for all vertices except start
        for (let vertex of this.adjacencyList.keys()) {
            distances.set(vertex, Infinity);
        }
        distances.set(start, 0);

        while (true) {
            let minDistance = Infinity;
            let minVertex = null;

            // Find the vertex with the minimum distance that is not visited
            for (let [vertex, distance] of distances) {
                if (!visited.has(vertex) && distance < minDistance) {
                    minDistance = distance;
                    minVertex = vertex;
                }
            }

            if (minVertex === null) break;

            visited.add(minVertex);

            // Update distances of the neighbors of the current vertex
            const neighbors = this.adjacencyList.get(minVertex);
            for (let neighbor of neighbors) {
                const totalWeight = distances.get(minVertex) + neighbor.weight;
                if (totalWeight < distances.get(neighbor.node)) {
                    distances.set(neighbor.node, totalWeight);
                }
            }
        }

        return distances;
    }
}

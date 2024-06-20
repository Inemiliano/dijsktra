import Graph from "../models/Graph.js";
import View from "../views/View.js";

const graph = new Graph();

// Agregar calles (vertices)
window.addVertices = function() {
    const verticesInput = document.getElementById('vertices').value;
    const vertices = verticesInput.split(',').map(v => v.trim());
    graph.insertVertices(...vertices);
    document.getElementById('vertices').value = '';
    showAlert(`Vértices agregados: ${vertices.join(', ')}`);
}

// Agregar distancia (edge)
window.addEdge = function() {
    const start = document.getElementById('start').value;
    const end = document.getElementById('end').value;
    const weight = parseInt(document.getElementById('weight').value, 10);
    if (graph.insertEdge(start, end, weight)) {
        showAlert(`Arista agregada: ${start} -> ${end} (Peso: ${weight})`);
    } else {
        showAlert(`Error: No se pudo agregar la arista ${start} -> ${end}`);
    }
    document.getElementById('start').value = '';
    document.getElementById('end').value = '';
    document.getElementById('weight').value = '1';
}

// Ejecutar DFS
window.executeDFS = function() {
    let result = '';
    graph.depthFirstSearch(vertex => {
        result += `${vertex} `;
    });
    result = result.trim();
    View.displayBFSResult(result);
    showAlert(`Recorrido DFS: ${result}`);
}

// Ejecutar Dijkstra
window.executeDijkstra = function() {
    const start = document.getElementById('dijkstraInicio').value;
    if (graph.adjacencyList.has(start)) {
        const distances = graph.dijkstra(start);
        let result = 'Distancias: ';
        for (let [vertex, distance] of distances) {
            result += `${vertex}: ${distance}, `;
        }
        showAlert(result);
    } else {
        showAlert(`Error: El vértice ${start} no existe en el grafo.`);
    }
}

// Función para mostrar alertas
function showAlert(message) {
    const modal = document.getElementById('modal');
    const modalMessage = document.getElementById('modalMessage');
    modalMessage.textContent = message;
    modal.style.display = 'flex';
}

// Evento para cerrar el modal
document.getElementById('closeModal').onclick = function() {
    document.getElementById('modal').style.display = 'none';
}

// Evento para cerrar el modal al hacer clic fuera de él
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

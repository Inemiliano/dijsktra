export default class View {
    static showOutput(message) {
        const outputElement = document.getElementById('output');
        outputElement.innerHTML += `${message}<br>`;
    }

    static displayBFSResult(result) {
        const outputElement = document.getElementById('output');
        outputElement.innerHTML = `Recorrido BFS: ${result}`;
    }
}

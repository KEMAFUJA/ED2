class Grafo {
  constructor() {
    this.lista = new Map();
  }

  añadirVertice(v) {
    if (!this.lista.has(v)) {
      this.lista.set(v, []);
    }
  }

  
  emparejar(v, w) {
    if (!this.lista.has(v)) {
      this.añadirVertice(v);
    }
    if (!this.lista.has(w)) {
      this.añadirVertice(w);
    }
    this.lista.get(v).push({ vertice: w });
    
  }

  // Implementación de BFS
  bfs(inicio) {
    let visitados = new Set();
    let cola = [inicio];
    let resultado = [];

    visitados.add(inicio);

    while (cola.length > 0) {
      let vertice = cola.shift();
      resultado.push(vertice);

      let vecinos = this.lista.get(vertice);
      for (let vecino of vecinos) {
        if (!visitados.has(vecino.vertice)) {
          visitados.add(vecino.vertice);
          cola.push(vecino.vertice);
        }
      }
    }
    return resultado;
  }

  // Implementación de DFS
  dfs(inicio) {
    let visitados = new Set();
    let resultado = [];

    const dfsRecursivo = (vertice) => {
      visitados.add(vertice);
      resultado.push(vertice);

      let vecinos = this.lista.get(vertice);
      for (let vecino of vecinos) {
        if (!visitados.has(vecino.vertice)) {
          dfsRecursivo(vecino.vertice);
        }
      }
    };

    dfsRecursivo(inicio);
    return resultado;
  }

  mostrar() {
    for (let [vertice, pareja] of this.lista) {
      let conexiones = pareja.map(p => p.vertice);
      console.log(`${vertice} -> ${conexiones.join(', ')}`);
    }
  }

  mostrarWEB() {
    let resultado = '';
    for (let [vertice, pareja] of this.lista) {
        let conexiones = pareja.map(p => p.vertice);
        resultado += `${vertice} -> ${conexiones.join(', ')}\n`;
    }
    return resultado;
}
}
/*
// Ejemplo de uso
const Graf = new Grafo();
Graf.añadirVertice("A");

Graf.emparejar("A", "B");
Graf.emparejar("A", "C");
Graf.emparejar("A", "D");

Graf.emparejar("B", "E");
Graf.emparejar("B", "F");

Graf.emparejar("C", "G");
Graf.emparejar("C", "H");

Graf.emparejar("G", "I");
Graf.emparejar("G", "J");

Graf.mostrar();

// Ejemplo de BFS y DFS
console.log("BFS desde A:", Graf.bfs("A"));
console.log("DFS desde A:", Graf.dfs("A"));
*/
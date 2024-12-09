class GrafoNoPeso {
  constructor() {
    this.lista = new Map();
  }

  añadirVertice(v) {
    if (!this.lista.has(v)) {
      this.lista.set(v, []);
    }
  }

  // Emparejamos con el peso (v, w, peso)
  emparejar(v, w, peso) {
    if (!this.lista.has(v)) {
      this.añadirVertice(v);
    }
    if (!this.lista.has(w)) {
      this.añadirVertice(w);
    }
    // Añadimos las aristas con su peso
    this.lista.get(v).push({ vertice: w, peso: peso });
    this.lista.get(w).push({ vertice: v, peso: peso });  // Para grafo no dirigido
  }

  mostrar() {
    for (let [vertice, parejas] of this.lista) {
      let conexiones = parejas.map(p => `${p.vertice} (peso: ${p.peso})`);
      console.log(`${vertice} -> ${conexiones.join(', ')}`);
    }
  }
  mostrarWEB() {
    let resultado = ''; 
    for (let [vertice, parejas] of this.lista) {
        let conexiones = parejas.map(p => `${p.vertice} (peso: ${p.peso})`);
        resultado += `${vertice} -> ${conexiones.join(', ')}\n`; 
    }
    return resultado; 
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
}
/*
// Ejemplo de uso
const Graf = new GrafoNoPeso();
Graf.añadirVertice("A");

Graf.emparejar("A", "B", 5);
Graf.emparejar("A", "C", 3);
Graf.emparejar("A", "D", 2);

Graf.mostrar();

// Ejemplo de BFS y DFS
console.log("BFS desde A:", Graf.bfs("A")); // Resultado BFS desde A
console.log("DFS desde A:", Graf.dfs("A")); // Resultado DFS desde A
*/
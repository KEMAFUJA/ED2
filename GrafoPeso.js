class GrafoPeso {
  constructor() {
    this.lista = new Map();
  }

  añadirVertice(v) {
    if (!this.lista.has(v)) {
      this.lista.set(v, []);
    }
  }

  // Ahora emparejamos con el peso (v, w, peso)
  emparejar(v, w, peso) {
    if (!this.lista.has(v)) {
      this.añadirVertice(v);
    }
    if (!this.lista.has(w)) {
      this.añadirVertice(w);
    }
    // Añadimos las aristas con su peso
    this.lista.get(v).push({ vertice: w, peso: peso });
    
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
}
/*
// Ejemplo de uso
const Graf = new GrafoPeso();
Graf.añadirVertice("A");
Graf.añadirVertice("B");

Graf.emparejar("A", "B", 5); // Peso 5 entre A y B
Graf.emparejar("A", "E", 3); // Peso 3 entre A y C
Graf.emparejar("B", "C", 2); // Peso 2 entre B y C

Graf.mostrar();

// Ejemplo de BFS y DFS
console.log("BFS desde A:", Graf.bfs("A")); // Resultado BFS desde A
console.log("DFS desde A:", Graf.dfs("A")); // Resultado DFS desde A
*/
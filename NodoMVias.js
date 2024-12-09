
class NodoMVias {
    constructor(m) {
        this.m=m;
        this.claves = Array(m - 1).fill(null); // Hasta M - 1 claves
        this.hijos = Array(m).fill(null);     // Hasta M hijos
    }

    // Determina si el nodo está lleno
    estaLleno() {
        return this.claves.every(clave => clave !== null);
    }

    // Determina si el nodo está vacío
    estaVacio() {
        return this.claves.every(clave => clave === null);
      
    }
}
module.exports = NodoMVias;
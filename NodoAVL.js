class NodoAVL {
    constructor(valor) {
        this.valor = valor;
        this.izquierdo = null;
        this.derecho = null;
        this.altura = 1;  // La altura inicial de cualquier nodo es 1
    }
}

module.exports = NodoAVL;
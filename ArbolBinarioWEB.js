
class ArbolBinario {
    constructor() {
    this.raiz = null;
    }

    insertar(valor) {
        if (!this.buscar(valor)) {
            this.raiz = this.insertarRec(this.raiz, valor);
        } else {
            alert("El valor " + valor + " ya existe en el árbol.");
        }
    }

    insertarRec(nodo, valor) {
        if (nodo === null) {
            return new NodoBinario(valor);
        }
        if (nodo.izquierdo === null) {
            nodo.izquierdo = this.insertarRec(nodo.izquierdo, valor);
        } else {
            nodo.derecho = this.insertarRec(nodo.derecho, valor);
        }
        return nodo;
    }

    inorden() {
        const resultado = this.inordenRec(this.raiz);
        return resultado.join(" ");
    }

    inordenRec(nodo) {
        let cadena = [];
        if (nodo !== null) {
            cadena = [...cadena, ...this.inordenRec(nodo.izquierdo)];
            cadena.push(nodo.valor);
            cadena = [...cadena, ...this.inordenRec(nodo.derecho)];
        }
        return cadena;
    }

    buscar(valor) {
        return this.buscarRec(this.raiz, valor);
    }

    buscarRec(nodo, valor) {
        if (nodo === null) {
            return false;
        }
        if (nodo.valor === valor) {
            return true;
        }
        return this.buscarRec(nodo.izquierdo, valor) || this.buscarRec(nodo.derecho, valor);
    }

    mostrarArbol() {
        return this.mostrarRec(this.raiz, "", true);
    }

    // Modificar la función mostrarRec en ArbolBinario.js
    mostrarRec(nodo, indent, esDerecho) {
        if (nodo !== null) {
            let result = indent + (esDerecho ? "└── " : "├── ") + nodo.valor + " <br> ";  // Usar <br> para salto de línea
            // Agregar recursión para los hijos izquierdo y derecho
            result += this.mostrarRec(nodo.izquierdo, indent + (esDerecho ? "    " : "│   "), false);
            result += this.mostrarRec(nodo.derecho, indent + (esDerecho ? "    " : "│   "), true);
            return result;
        }
        return '';
    }
    
}



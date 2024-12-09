//const NodoBinario = require('./NodoBinario.js');

class ArbolBinarioBusqueda {
    constructor() {
        this.raiz = null;
    }

    insertar(valor) {
        if (!this.buscar(valor)) {
        this.raiz = this.insertarRec(this.raiz, valor);
        }else {
            console.log("El valor " + valor + " ya existe en el árbol.\n");
        }
    }

    insertarRec(nodo, valor) {
        if (nodo === null) {
            return new NodoBinario(valor); 
        }

        if (valor < nodo.valor) {
            nodo.izquierdo = this.insertarRec(nodo.izquierdo, valor);
        } 
        else if (valor > nodo.valor) {
            nodo.derecho = this.insertarRec(nodo.derecho, valor);
        }else{
            console.log("No puede ingresar datos repetidos '" + valor + "'.\n");
        }
        return nodo;
    }
    eliminar(valor) {
        this.raiz = this.eliminarRec(this.raiz, valor);
    }
    
    eliminarRec(nodo, valor) {
        if (nodo === null) {
            console.log("El valor '" + valor + "' no se encuentra en el árbol.");
            return nodo; // Nodo no encontrado
        }
    
        if (valor < nodo.valor) {
            nodo.izquierdo = this.eliminarRec(nodo.izquierdo, valor);
        } else if (valor > nodo.valor) {
            nodo.derecho = this.eliminarRec(nodo.derecho, valor);
        } else {
            // Caso 1: El nodo no tiene hijos (es una hoja)
            if (nodo.izquierdo === null && nodo.derecho === null) {
                return null;
            }
    
            // Caso 2: El nodo tiene un solo hijo
            if (nodo.izquierdo === null) {
                return nodo.derecho;
            }
            if (nodo.derecho === null) {
                return nodo.izquierdo;
            }
    
            // Caso 3: El nodo tiene dos hijos
            // Encontrar el sucesor en orden (el más pequeño del subárbol derecho)
            const sucesor = this.encontrarMin(nodo.derecho);
    
            // Reemplazar el valor del nodo con el valor del sucesor
            nodo.valor = sucesor.valor;
    
            // Eliminar el sucesor del subárbol derecho
            nodo.derecho = this.eliminarRec(nodo.derecho, sucesor.valor);
        }
    
        return nodo;
    }
    
    // Función auxiliar para encontrar el valor mínimo en un subárbol
    encontrarMin(nodo) {
        while (nodo.izquierdo !== null) {
            nodo = nodo.izquierdo;
        }
        return nodo;
    }
    

    // Recorrido inorden
    inorden() {
        const resultado = this.inordenRec(this.raiz);  // Obtener el resultado del recorrido
        console.log(resultado);  // Imprimir el resultado
    }

    inordenRec(nodo) {
        let cadena = "";
        if (nodo !== null) {
            cadena += this.inordenRec(nodo.izquierdo);
            cadena += nodo.valor + " ";
            cadena += this.inordenRec(nodo.derecho);
        }
        return cadena;
    }
    //Recorrido Pre-Orden
    preorden() {
        const resultado = this.preordenRec(this.raiz); 
        console.log(resultado); 
    }

    preordenRec(nodo) {
        let cadena = "";
        if (nodo !== null) {
            cadena += nodo.valor + " "; 
            cadena += this.preordenRec(nodo.izquierdo); 
            cadena += this.preordenRec(nodo.derecho); 
        }
        return cadena;
    }
    //Recorrido Post-Orden
    postorden() {
        const resultado = this.postordenRec(this.raiz); 
        console.log(resultado); 
    }

    postordenRec(nodo) {
        let cadena = "";
        if (nodo !== null) {
            cadena += this.postordenRec(nodo.izquierdo); 
            cadena += this.postordenRec(nodo.derecho); 
            cadena += nodo.valor + " "; 
        }
        return cadena;
    }

    // Búsqueda (sin reglas, solo se busca en todo el árbol)
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
        this.mostrarRec(this.raiz, "", true);
    }

    mostrarRec(nodo, indent, esDerecho) {
        if (nodo !== null) {
            console.log(indent + (esDerecho ? "└── " : "├── ") + nodo.valor);
            this.mostrarRec(nodo.izquierdo, indent + (esDerecho ? "    " : "│   "), false);
            this.mostrarRec(nodo.derecho, indent + (esDerecho ? "    " : "│   "), true);
        }
    }





        mostrarArbolWEB() {
            return this.mostrarRecWEB(this.raiz, "", true);
        }
        mostrarRecWEB(nodo, indent, esDerecho) {
            if (nodo !== null) {
                let result = indent + (esDerecho ? "└── " : "├── ") + nodo.valor + " <br> ";  // Usar <br> para salto de línea
                // Agregar recursión para los hijos izquierdo y derecho
                result += this.mostrarRecWEB(nodo.izquierdo, indent + (esDerecho ? ".........." : "│   "), false);
                result += this.mostrarRecWEB(nodo.derecho, indent + (esDerecho ? ".........." : "│   "), true);
                return result;
            }
            return '';
        }

        inordenWEB() {
            const resultado = this.inordenRecWEB(this.raiz);
            return resultado.join(" ");
        }
    
        inordenRecWEB(nodo) {
            let cadena = [];
            if (nodo !== null) {
                cadena = [...cadena, ...this.inordenRecWEB(nodo.izquierdo)];
                cadena.push(nodo.valor);
                cadena = [...cadena, ...this.inordenRecWEB(nodo.derecho)];
            }
            return cadena;
        }
        preordenWEB() {
            const resultado = this.preordenRecWEB(this.raiz);
            return resultado.join(" ");
        }
    
        preordenRecWEB(nodo) {
            let cadena = [];
            if (nodo !== null) {
                cadena.push(nodo.valor);
                cadena = [...cadena, ...this.preordenRecWEB(nodo.izquierdo)];
                cadena = [...cadena, ...this.preordenRecWEB(nodo.derecho)];
            }
            return cadena;
        }
        postordenWEB() {
            const resultado = this.postordenRecWEB(this.raiz);
            return resultado.join(" ");
        }
    
        postordenRecWEB(nodo) {
            let cadena = [];
            if (nodo !== null) {
                cadena.push(nodo.valor);
                cadena = [...cadena, ...this.postordenRecWEB(nodo.izquierdo)];
                cadena = [...cadena, ...this.postordenRecWEB(nodo.derecho)];
            }
            return cadena;
        }

}

//module.exports = ArbolBinarioBusqueda;
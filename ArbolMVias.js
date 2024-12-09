const NodoMVias = require('./NodoMVias.js');

class ArbolMVias {
    constructor(m) {
        if (m < 3) {
            throw new Error("Un árbol MVias debe tener al menos 3 vías (M >= 3).");
        }
        this.m = m;
        this.raiz = null;
    }

    // Inserta una clave en el árbol
    insertar(clave) {
        if (!this.buscar(clave)) {
        if (!this.raiz) {
            this.raiz = new NodoMVias(this.m);
            this.raiz.claves[0] = clave;
            return;
        }
        this.insertarRec(this.raiz, clave);
        }else {
            console.log("El valor " + clave + " ya existe en el árbol.\n");
        }
    }

    insertarRec(nodo, clave) {
        // Busca la posición correcta para insertar la clave
        for (let i = 0; i < this.m - 1; i++) {
            if (nodo.claves[i] === null) {
                nodo.claves[i] = clave;
                nodo.claves.sort((a, b) => (a === null ? 1 : b === null ? -1 : a - b)); // Ordena claves
                return;
            } else if (clave < nodo.claves[i]) {
                if (!nodo.hijos[i]) {
                    nodo.hijos[i] = new NodoMVias(this.m);
                }
                this.insertarRec(nodo.hijos[i], clave);
                return;
            }
        }

        // Si no se inserta antes, va al último hijo
        if (!nodo.hijos[this.m - 1]) {
            nodo.hijos[this.m - 1] = new NodoMVias(this.m);
        }
        this.insertarRec(nodo.hijos[this.m - 1], clave);
    }

    // Busca una clave en el árbol
    buscar(clave) {
        return this.buscarRec(this.raiz, clave);
    }

    buscarRec(nodo, clave) {
        if (!nodo) {
            return false; // No encontrado
        }

        for (let i = 0; i < this.m - 1; i++) {
            if (nodo.claves[i] === clave) {
                return true; // Clave encontrada
            } else if (nodo.claves[i] === null || clave < nodo.claves[i]) {
                return this.buscarRec(nodo.hijos[i], clave);
            }
        }

        // Si no se encuentra, busca en el último hijo
        return this.buscarRec(nodo.hijos[this.m - 1], clave);
    }

    // Recorrido en orden
    inorden() {
        const resultado = [];
        this.inordenRec(this.raiz, resultado);
        return resultado;
    }

    inordenRec(nodo, resultado) {
        if (!nodo) {
            return;
        }

        for (let i = 0; i < this.m - 1; i++) {
            this.inordenRec(nodo.hijos[i], resultado);
            if (nodo.claves[i] !== null) {
                resultado.push(nodo.claves[i]);
            }
        }

        // Visita el último hijo
        this.inordenRec(nodo.hijos[this.m - 1], resultado);
    }
    // Recorrido Preorden (Raíz - Hijos)
    preorden() {
        const resultado = [];
        this.preordenRecursivo(this.raiz, resultado);
        return resultado;
    }

    preordenRecursivo(nodo, resultado) {
        if (nodo) {
            for (let i = 0; i < nodo.claves.length; i++) {
                if (nodo.claves[i] !== null) {  // Solo agregar si no es null
                    resultado.push(nodo.claves[i]);
                }
            }

            // Recorremos los hijos
            for (let i = 0; i < nodo.hijos.length; i++) {
                this.preordenRecursivo(nodo.hijos[i], resultado);
            }
        }
    }

    // Recorrido Postorden (Hijos - Raíz)
    postorden() {
        const resultado = [];
        this.postordenRecursivo(this.raiz, resultado);
        return resultado;
    }

    postordenRecursivo(nodo, resultado) {
        if (nodo) {
            // Recorremos los hijos primero
            for (let i = 0; i < nodo.hijos.length; i++) {
                this.postordenRecursivo(nodo.hijos[i], resultado);
            }

            // Después agregamos las claves
            for (let i = 0; i < nodo.claves.length; i++) {
                if (nodo.claves[i] !== null) {  // Solo agregar si no es null
                    resultado.push(nodo.claves[i]);
                }
            }
        }
    }
    mostrarArbol() {
        const resultado = [];
        this.mostrarArbolRec(this.raiz, resultado, 0);
        return resultado.join("\n");
    }

    mostrarArbolRec(nodo, resultado, nivel) {
        if (!nodo) {
            return;
        }

        // Representar el nivel actual del nodo
        const representacion = "Nivel " + nivel + ": " +
            nodo.claves.map(clave => (clave !== null ? clave : "_")).join(", ");
        resultado.push(representacion);

        // Llamar recursivamente a los hijos
        for (let hijo of nodo.hijos) {
            this.mostrarArbolRec(hijo, resultado, nivel + 1);
        }
    }







    inordenWEB() {
        const resultado = [];
        this.inordenRec(this.raiz, resultado);
        return resultado;
    }

    inordenRecWEB(nodo, resultado) {
        if (!nodo) {
            return;
        }

        for (let i = 0; i < this.m - 1; i++) {
            this.inordenRecWEB(nodo.hijos[i], resultado);
            if (nodo.claves[i] !== null) {
                resultado.push(nodo.claves[i]);
            }
        }

        // Visita el último hijo
        this.inordenRecWEB(nodo.hijos[this.m - 1], resultado);
    }

        // Recorrido Preorden (Raíz - Hijos)
        preordenWEB() {
            const resultado = [];
            this.preordenRecWEB(this.raiz, resultado);
            return resultado.filter(valor => valor !== null);  // Filtrar los null
        }
    
        preordenRecWEB(nodo, resultado) {
            if (nodo) {
                for (let i = 0; i < nodo.claves.length; i++) {
                    if (nodo.claves[i] !== null) {  // Solo agregar si no es null
                        resultado.push(nodo.claves[i]);
                    }
                }
    
                // Recorremos los hijos
                for (let i = 0; i < nodo.hijos.length; i++) {
                    this.preordenRecWEB(nodo.hijos[i], resultado);
                }
            }
        }
    
        // Recorrido Postorden (Hijos - Raíz)
        postordenWEB() {
            const resultado = [];
            this.postordenRecWEB(this.raiz, resultado);
            return resultado.filter(valor => valor !== null);  // Filtrar los null
        }
    
        postordenRecWEB(nodo, resultado) {
            if (nodo) {
                // Recorremos los hijos primero
                for (let i = 0; i < nodo.hijos.length; i++) {
                    this.postordenRecWEB(nodo.hijos[i], resultado);
                }
    
                // Después agregamos las claves si no son null
                for (let i = 0; i < nodo.claves.length; i++) {
                    if (nodo.claves[i] !== null) {  // Solo agregar si no es null
                        resultado.push(nodo.claves[i]);
                    }
                }
            }
        }

    mostrarArbolWEB() {
        const resultado = [];
        this.mostrarArbolRecWEB(this.raiz, resultado, 0);
        return resultado.join("\n");
    }

    mostrarArbolRecWEB(nodo, resultado, nivel) {
        if (!nodo) {
            return;
        }

        // Representar el nivel actual del nodo
        const representacion = "Nivel " + nivel + ": " +
            nodo.claves.map(clave => (clave !== null ? clave : "_")).join(", ") + "<br>";
        resultado.push(representacion);

        // Llamar recursivamente a los hijos
        for (let hijo of nodo.hijos) {
            this.mostrarArbolRecWEB(hijo, resultado, nivel + 1);
        }
    }

}
module.exports = ArbolMVias;

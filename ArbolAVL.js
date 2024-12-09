//const NodoAVL = require('./NodoAVL.js');

class ArbolAVL {
    constructor() {
        this.raiz = null;
    }

    altura(nodo) {
        if (nodo === null) {
            return 0;
        }
        return nodo.altura;
    }

    // Inserción de un nuevo valor
    insertar(valor) {
        if (!this.buscar(valor)) {
        this.raiz = this.insertarRec(this.raiz, valor);
        }else {
            console.log("El valor " + valor + " ya existe en el árbol.\n");
        }
    }

    insertarRec(nodo, valor) {
        //console.log("insertando " + valor);
        if (nodo === null) {                //console.log("Creando nodo para " + valor); 
                                            return new NodoAVL(valor); }

        if (valor < nodo.valor) {           nodo.izquierdo = this.insertarRec(nodo.izquierdo, valor); //console.log("insertando izq " + valor);
        } else if (valor > nodo.valor) {    nodo.derecho = this.insertarRec(nodo.derecho, valor); //console.log("insertando der " + valor);
        } else {                            return nodo;}

        // Actualiza la altura del nodo actual
        //console.log("Nodo " + nodo.valor + ", Altura Izq " + this.altura(nodo.izquierdo)+ " y Altura Der " + this.altura(nodo.derecho));
        nodo.altura = 1 + Math.max(this.altura(nodo.izquierdo), this.altura(nodo.derecho));
        //console.log("Altura nodo " + nodo.valor + "= " + nodo.altura);
        // Verificar el factor de equilibrio y aplicar rotación si es necesario
        const balance = this.factorEquilibrio(nodo);
        //console.log("Nodo " + nodo.valor + " = " + balance);
        
        // Si el nodo se desbalancea, hay 4 casos (Rotaciones)
        //Rotaciones simples
        // Caso 1: Desbalanceo a la izquierda-izquierda
        if (balance > 1 && valor < nodo.izquierdo.valor) {
            //console.log("Simple Izq " + valor + " < " + nodo.izquierdo.valor);
            return this.rotacionDerecha(nodo); 
        }
        // Caso 2: Desbalanceo a la derecha-derecha
        if (balance < -1 && valor > nodo.derecho.valor) {
           // console.log("Simple Der " + valor + " > " + nodo.derecho.valor);
            return this.rotacionIzquierda(nodo); 
        }
        //Rotaciones Dobles
        // Caso 3: Desbalanceo a la izquierda-derecha
        if (balance > 1 && valor > nodo.izquierdo.valor) {
           // console.log("Doble Izq-Der " + valor + " > " + nodo.izquierdo.valor);
            nodo.izquierdo = this.rotacionIzquierda(nodo.izquierdo);
            return this.rotacionDerecha(nodo); 
        }
        // Caso 4: Desbalanceo a la derecha-izquierda
        if (balance < -1 && valor < nodo.derecho.valor) {
           // console.log("Doble Der-Izq " + valor + " < " + nodo.derecho.valor);
            nodo.derecho = this.rotacionDerecha(nodo.derecho);
            return this.rotacionIzquierda(nodo); 
        }
        //this.imprimirArbol();
        return nodo;
    }

    eliminar(valor) {
        this.raiz = this.eliminarRec(this.raiz, valor);
    }
    
    eliminarRec(nodo, valor) {
        if (nodo === null) {
            console.log("El valor no existe en el árbol.");
            return nodo;
        }
    
        // Realizar eliminación como en un BST.
        if (valor < nodo.valor) {
            nodo.izquierdo = this.eliminarRec(nodo.izquierdo, valor);
        } else if (valor > nodo.valor) {
            nodo.derecho = this.eliminarRec(nodo.derecho, valor);
        } else {
            // Nodo encontrado.
            if (nodo.izquierdo === null || nodo.derecho === null) {
                nodo = nodo.izquierdo || nodo.derecho; // Caso 1 y 2.
            } else {
                let sucesor = this.minimo(nodo.derecho); // Sucesor en orden.
                nodo.valor = sucesor.valor;
                nodo.derecho = this.eliminarRec(nodo.derecho, sucesor.valor); // Eliminar sucesor.
            }
        }
    
        if (nodo === null) return nodo; // Caso base.
    
        // Actualizar altura.
        nodo.altura = 1 + Math.max(this.altura(nodo.izquierdo), this.altura(nodo.derecho));
    
        // Calcular factor de balance.
        let balance = this.factorBalance(nodo);
    
        // Balancear el árbol si es necesario.
        // Caso LL.
        if (balance > 1 && this.factorBalance(nodo.izquierdo) >= 0) {
            return this.rotarDerecha(nodo);
        }
        // Caso LR.
        if (balance > 1 && this.factorBalance(nodo.izquierdo) < 0) {
            nodo.izquierdo = this.rotarIzquierda(nodo.izquierdo);
            return this.rotarDerecha(nodo);
        }
        // Caso RR.
        if (balance < -1 && this.factorBalance(nodo.derecho) <= 0) {
            return this.rotarIzquierda(nodo);
        }
        // Caso RL.
        if (balance < -1 && this.factorBalance(nodo.derecho) > 0) {
            nodo.derecho = this.rotarDerecha(nodo.derecho);
            return this.rotarIzquierda(nodo);
        }
    
        return nodo;
    }
    
    minimo(nodo) {
        while (nodo.izquierdo !== null) {
            nodo = nodo.izquierdo;
        }
        return nodo;
    }
    
    rotacionDerecha(y) {
        //console.log("ROT DER " + y.valor);
        let x = y.izquierdo; //console.log("X=" + y.valor);
        let T2 = x.derecho; //console.log("T2=" + T2);

        // Realiza la rotación
        x.derecho = y;
        y.izquierdo = T2;

        // Actualiza las alturas
        y.altura = Math.max(this.altura(y.izquierdo), this.altura(y.derecho)) + 1;
        x.altura = Math.max(this.altura(x.izquierdo), this.altura(x.derecho)) + 1;

        // Devuelve el nuevo nodo raíz
        return x;
    }

    rotacionIzquierda(x) {
        //console.log("ROT IZQ " + x.valor);
        let y = x.derecho; //console.log("Y=" + y.valor);
        let T2 = y.izquierdo; //console.log("T2=" + T2);

        // Realiza la rotación
        y.izquierdo = x;
        x.derecho = T2;

        // Actualiza las alturas
        x.altura = Math.max(this.altura(x.izquierdo), this.altura(x.derecho)) + 1;
        y.altura = Math.max(this.altura(y.izquierdo), this.altura(y.derecho)) + 1;

        // Devuelve el nuevo nodo raíz
        return y;
    }
    
    factorEquilibrio(nodo) {
        if (nodo === null) {
            return 0;
        }
        return this.altura(nodo.izquierdo) - this.altura(nodo.derecho);
    }

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


    buscar(valor) {
        return this.buscarRec(this.raiz, valor);
    }

    buscarRec(nodo, valor) {
        if (nodo === null || nodo.valor === valor) {
            return nodo !== null;
        }
        if (valor < nodo.valor) {
            return this.buscarRec(nodo.izquierdo, valor);
        }
        return this.buscarRec(nodo.derecho, valor);
    }

    mostrarArbol() {
        this.mostrarRec(this.raiz, "", true);
    }

    mostrarRec(nodo, prefijo, esHijoIzq) {
        if (nodo === null) return;

        console.log(prefijo + (esHijoIzq ? "├── " : "└── ") + nodo.valor + " (Altura: " + nodo.altura + ")");
        this.mostrarRec(nodo.izquierdo, prefijo + (esHijoIzq ? "│   " : "    "), true);
        this.mostrarRec(nodo.derecho, prefijo + (esHijoIzq ? "│   " : "    "), false);
    }




    mostrarArbolWEB() {
        return this.mostrarRecWEB(this.raiz, "", true);
    }
    mostrarRecWEB(nodo, indent, esDerecho) {
        if (nodo !== null) {
            let result = indent + (esDerecho ? "└── " : "├── ") + nodo.valor + " (Altura: " + nodo.altura + ") <br> ";  // Usar <br> para salto de línea
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
//module.exports = ArbolAVL;
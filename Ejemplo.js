const NodoBinario = require('./NodoBinario.js');
const ArbolBinario = require('./ArbolBinario.js');
const ArbolBinarioBusqueda = require('./ArbolBinarioBusqueda.js');

const ArbolAVL = require('./ArbolAVL.js');
const NodoAVL = require('./NodoAVL.js');
const ArbolMVias = require('./ArbolMVias.js');
const NodoMVias = require('./NodoMVias.js');
/*
// Ejemplo de uso:
const arbol = new ArbolBinario();
console.log("ARBOL BINARIO: ");
arbol.insertar(10);
arbol.insertar(5);
arbol.insertar(15);
arbol.insertar(2);
arbol.insertar(10);
arbol.insertar(7);

// Mostrar recorrido inorden

arbol.mostrarArbol();
arbol.inorden();  // Debería mostrar: 5 10 2 15 7
// Buscar un valor
console.log(arbol.buscar(7));  // true
console.log(arbol.buscar(20)); // false

// Ejemplo de uso:
const arbol2 = new ArbolBinarioBusqueda();
console.log("ARBOL BINARIO DE BUSQUEDA: ");
arbol2.insertar(10);
arbol2.insertar(5);
arbol2.insertar(15);
arbol2.insertar(2);
arbol2.insertar(10);
arbol2.insertar(7);
arbol2.insertar(20);

// Mostrar recorrido inorden

arbol2.mostrarArbol();
arbol2.inorden();    // Debería mostrar: 2  5   7   10  15
arbol2.preorden();   // Debería mostrar: 10 5   2   7   15
arbol2.postorden();  // Debería mostrar: 2  7   5   15  10
console.log("\n");
arbol2.eliminar(10);
arbol2.mostrarArbol();
// Buscar un valor
console.log(arbol2.buscar(7));  // true
console.log(arbol2.buscar(20)); // false

/*
// Ejemplo de uso
const arbolAVL = new ArbolAVL();

// Insertar valores
arbolAVL.insertar(10);
arbolAVL.insertar(20);
arbolAVL.insertar(30);
arbolAVL.insertar(15);
arbolAVL.insertar(25);
arbolAVL.insertar(5);
arbolAVL.insertar(12);
arbolAVL.insertar(13);

// Recorrido inorden
console.log("Recorrido inorden del Árbol AVL:");
arbolAVL.inorden();
console.log("\n");
arbolAVL.mostrarArbol();

// Buscar un valor
console.log("¿Existe el valor 20 en el árbol?", arbolAVL.buscar(20));  // true
console.log("¿Existe el valor 40 en el árbol?", arbolAVL.buscar(40));  // false

*/
// Ejemplo de uso
const arbol1 = new ArbolMVias(4); // Árbol de 3 vías

// Inserciones
arbol1.insertar(10); 
arbol1.insertar(20); 
arbol1.insertar(30); 
arbol1.insertar(8); 
arbol1.insertar(15); 
arbol1.insertar(25); 
arbol1.insertar(35); 
arbol1.insertar(40);

// Mostrar recorrido en orden
console.log("Recorrido inorden:", arbol1.inorden());
console.log("Recorrido PRE ORDEN:", arbol1.preorden());
console.log("Recorrido POST ORDEN:", arbol1.postorden());

// Mostrar estructura del árbol
console.log("\nEstructura del árbol:");
console.log(arbol1.mostrarArbol());

// Buscar claves
console.log("\nBuscar 15:", arbol1.buscar(15)); // true
console.log("Buscar 30:", arbol1.buscar(30)); // false

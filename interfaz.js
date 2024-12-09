const arbol = new ArbolBinario();
const arbol2 = new ArbolBinarioBusqueda();
const arbol3 = new ArbolAVL();
const grafo = new Grafo();
const grafo2 = new GrafoNo();
const grafo3 = new GrafoPeso();
const grafo4 = new GrafoNoPeso();

document.getElementById('agregar-arista').addEventListener('click', function() {
    const v1 = document.getElementById('vertice1').value;
    const v2 = document.getElementById('vertice2').value;
    const peso = parseInt(document.getElementById('peso').value) || 0;

    console.log(`Vértice 1: ${v1}, Vértice 2: ${v2}, Peso: ${peso}`);

    grafo.emparejar(v1, v2);
    grafo2.emparejar(v1, v2);
    grafo3.emparejar(v1, v2, peso);
    grafo4.emparejar(v1, v2, peso);

    document.getElementById('GDP').textContent = grafo.mostrarWEB();
    document.getElementById('GNDP').textContent = grafo2.mostrarWEB();
    document.getElementById('GD').textContent = grafo3.mostrarWEB();
    document.getElementById('GND').textContent = grafo4.mostrarWEB();
    document.getElementById('vertice1').value = ''
    document.getElementById('vertice2').value = ''
    document.getElementById('peso').value = ''
});

        // Insertar un valor
document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
    const valor = parseInt(document.getElementById('valor').value);
    arbol.insertar(valor);
    arbol2.insertar(valor);
    arbol3.insertar(valor);
    document.getElementById('valor').value = '';  // Limpiar el campo
});

let arbol4 = null;  // Declaramos la variable global para el árbol
document.getElementById('form2').addEventListener('submit', function(e) {
    e.preventDefault();
    if (!arbol4) {
        const cantidad = parseInt(document.getElementById('cantidad').value);
        arbol4 = new ArbolMVias(cantidad);  // Creamos el árbol solo una vez
    }
            
    const valor = parseInt(document.getElementById('valor2').value);
    arbol4.insertar(valor);  // Insertamos los valores en el árbol
            
    document.getElementById('valor2').value = '';  // Limpiar el campo de valor
});

document.getElementById('mostrarArbol').addEventListener('click', function() {
    
    document.getElementById('arbolB').innerHTML = arbol.mostrarArbolWEB();
    document.getElementById('IN').textContent = 'Recorrido In-Orden: ' + arbol.inordenWEB();
    document.getElementById('PRE').textContent = 'Recorrido Pre-Orden: ' + arbol.preordenWEB();
    document.getElementById('POST').textContent = 'Recorrido Post-Orden: ' + arbol.postordenWEB();
        
    document.getElementById('arbolBB').innerHTML = arbol2.mostrarArbolWEB();
    document.getElementById('INO').textContent = 'Recorrido In-Orden: ' + arbol2.inordenWEB();
    document.getElementById('PREO').textContent = 'Recorrido Pre-Orden: ' + arbol2.preordenWEB();
    document.getElementById('POSTO').textContent = 'Recorrido Post-Orden: ' + arbol2.postordenWEB();    

    document.getElementById('arbolAVL').innerHTML = arbol3.mostrarArbolWEB();
    document.getElementById('INOR').textContent = 'Recorrido In-Orden: ' + arbol3.inordenWEB();
    document.getElementById('PREOR').textContent = 'Recorrido Pre-Orden: ' + arbol3.preordenWEB();
    document.getElementById('POSTOR').textContent = 'Recorrido Post-Orden: ' + arbol3.postordenWEB();
    
    console.log(arbol.inorden());
    console.log(arbol.mostrarArbol());

    console.log(arbol2.inorden());
    console.log(arbol2.mostrarArbol());

    console.log(arbol3.inorden());
    console.log(arbol3.mostrarArbol());
});

document.getElementById('mostrarArbol2').addEventListener('click', function() {
    
    document.getElementById('arbolMV').innerHTML = arbol4.mostrarArbolWEB();
    document.getElementById('INORD').textContent = 'Recorrido In-Orden: ' + arbol4.inordenWEB();
    document.getElementById('PREORD').textContent = 'Recorrido Pre-Orden: ' + arbol4.preordenWEB();
    document.getElementById('POSTORD').textContent = 'Recorrido Post-Orden: ' + arbol4.postordenWEB();
        
    console.log(arbol4.inorden());
    console.log(arbol4.mostrarArbol());

});
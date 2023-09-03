# Project

Después de comparar la interfaz Playground con la New Playground, creo que la original tiene unos puntos de fuerza importantes que la nueva no tiene.

- me gusta la línea temporal de las operaciones en la original, que se ha medio perdido en la nueva
- me gusta que sea más fácil comparar particiones con conjuntos de Euclides de cardinalidad diferente en la original

Por otro lado creo, que podría cambiar un poco el mecanismo como describo abajo.

1. el usuario puede generar conjuntos de Euclides, pero básicamente actuando sobre C y M, mientras que L sería un valor por defecto suficientemente amplio para las típicas pruebas iniciales, como 100 o 200, con la posibilidad de cambiarlo con algo más de dificultad que la necesaria para cambiar C y M
2. automáticamente, al tener un conjunto de Euclides C,M;L, se muestran los límites min,max de la sección de números (múltiplos de M) que pueden obtenerse a partir de ese conjunto
3. automáticamente, se busca el número menor de la sección que no se puede generar (búsqueda secuencial de min a max); debido a que esta operación tiende a hacerse bastante lenta, hay que implementar la búsqueda mediante async / await, y mostrar un "computing..." en lugar del resultado, mientras lo esperamos
4. automáticamente, el número mayor que se pudo generar se envía al servidor, que actualiza la lista de máximos verificados, y devuelve un resultado del tipo: {currentRecord: [C,M,top,user]}; si user no es Anonymous y es igual al usuario actual, felicitarlo
5. automáticamente, si se encontró el número menor en el punto 3, aparecerá un mensaje para explicar que el problema se debe o a la falta de números en el conjunto actual, o al hecho de haber encontrado un contraejemplo; y se pide al usuario que genere un conjunto más amplio para solucionar el problema
6. automáticamente, el código detecta el contraejemplo y lo envía enviar al servidor, si se confirma que la ampliación del conjunto no soluciona el problema; para esto hará falta un poco de heurística para reducir los falsos positivos, como por ejemplo calcular la mínima ampliación que debería proporcionar una partición si existiera, y sugerirla al usuario
7. por un link se puede ver la lista global de records hasta el momento
8. se podría implementar un login con Google / Facebook / ... para atribuir los records a usuarios registrados
9. habrá un checkbox llamado "verbose", puesto a false por defecto; cuando sea true, la búsqueda en el punto 3 guarda las particiones de cada número de la sección, para que luego el usuario las pueda ver en un diálogo

---

## UI

### Modo Básico

Dar prominencia a una barra horizontal graduada de 1 a 100. En esta barra se visualizan a la vez C y M, siendo L=1000. Inicialmente se visualizan las posiciones en la barra de 1, 2, y 100. El 1 es verde, el 2 es azul, el 100 es gris. En la posición 2 hay un cursor para mover el azul del 2 hasta el 100. Cuando el usuario mueve el cursor, el número correspondiente a la posición del cursor se visualiza en azul, mientras que el número azul anterior se difumina (fade out). Todas las posiciones en la barra que corresponden a enteros que son primos con el número azul actual son puntos verdes de un tono menos intenso que el 1. Todas las posiciones en la barra que corresponden a enteros que no son primos con el número azul actual son invisibles (excepto por una marca vertical sutil) hasta que el usuario hace hover en ellos en cuyo caso se visualizan con un punto rojo, el número entero, y un tooltip que explica que ese número no es primo con el número azul actual. Cuando el usuario hace hover en un punto verde, el color se hace de un tono tan intenso como el 1, y el cursor se transforma en un dedo para indicar que se puede hacer clic.

Inicialmente, vemos el conjunto de Euclides(1,2,1000), y el resultado de todos los comportamientos automáticos descritos arriba. Cuando el usuario mueve el azul, se calcula el conjunto de Euclides correspondiente a los nuevos valores de C=1 y M, conjuntamente con el resultado de todos los comportamientos automáticos descritos arriba. Cuando el usuario hace clic en un nuevo punto verde, se calcula el conjunto de Euclides correspondiente a los nuevos valores de C y M, conjuntamente con el resultado de todos los comportamientos automáticos descritos arriba.

### Modo Avanzado

Permite cambiar M directamente entre 2 y el max posible, mediante una casilla de texto. Permite cambiar C directamente entre 1 y M-1, mediante una casilla de texto autocomplete con todos los valores posibles, y dos botones para pasar cíclicamente de un valor posible a otro.

Inicialmente, vemos el conjunto de Euclides(1,2,1000), y el resultado de todos los comportamientos automáticos descritos arriba. Cuando el usuario cambia M, se calcula el conjunto de Euclides correspondiente a los nuevos valores de C=1 y M, conjuntamente con el resultado de todos los comportamientos automáticos descritos arriba. Cuando el usuario cambia C, se calcula el conjunto de Euclides correspondiente a los nuevos valores de C y M, conjuntamente con el resultado de todos los comportamientos automáticos descritos arriba.

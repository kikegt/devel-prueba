## Prompt 1
- Qué pedí: create a clean architecture api in nodejs with express, needs to have src/analyzer.js with some functions, and consume jsons, and the entities need to have validators to replace for example null atirbutes
- Qué me devolvió:
Creo la arquitectura base para el proyecto
- Qué cambie: 
Actualice la entidad Logs.js para que se apegue al modelo de datos que tiene el sample de json, donde puse el member con un valor default de validacion de miembro desconocido, igual en action con accion desconocida, y en result igual validacion de result desconocido con lowercase para que este normalizado a todos los datos

En analyzer.js cambie la ruta a los logs.json, tambien hice que los logs sea una variable constante global para los metodos, ya que lo que hacia antes era pasar por cada metodo los json e ir normalizando, en cambio ahora ya lo tengo normalizados desde el incio y el motodo solo hace su responsabilidad


- Por qué:         (tu razonamiento técnico)


## Prompt 2
- Qué pedí: group arraylist by a attribute
- Qué me devolvió:
me creo un reduce que en acc agregaba el key del usuario si no existia lo seteaba a 0 sumando +1
- Qué cambie: 
ahora en el reduce primero creo el key en 0 y luego sumarizo el conteo


- Por qué: legibilidad y certificar que ya haya un valor seteado


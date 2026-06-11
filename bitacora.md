## Prompt 1
- Qué pedí: create a clean architecture api in nodejs with express, needs to have src/analyzer.js with some functions, and consume jsons, and the entities need to have validators to replace for example null atirbutes
- Qué me devolvió:
Creo la arquitectura base para el proyecto con una entidad con validadores por defect, json importado y sanitizado por cada endpoint en app.js, un endpoint post y get de pruebas para traer todos los datos, un json con valores por defecto, un main.js y un app.js donde se inicia el api con cors y express(Todo esto sin enviar el modelo de datos, solo para que me construyera una base)
- Qué cambie: 
1. La entidad la cambie por completo en base al modelo de datos del json clean
2. Agregue la validación de fechas con try catch
3. reemplace los logs por el json del documento
4. reemplace las peticiones post y get, por las de mis metodos
5. Reemplace los metodos default a mis metodos 
6. cambie las exportaciones de los metodos eliminados a los mios
7. Hice que el json fuera una sola instancia ya sanitizada por defecto
8. Cambie la direccion del json a ../ ya que venia de src/data
- Por qué: 
La entidad no se adaptaa al modelo de negocios, ya que tenia diversos atributos que no coincidian con lo que necesitaba en mi modelo de datos, por lo que tuve que agregar los atributos del logs.json limpio, tuve que agregar el type opcional para valores no tan comunes como las fechas que necesitaba un try catch especial para que procesara valores invalidos, cambie las exportaciones para poder obtenerlas desde main.js y pasarlas a las rutas de los endpoints, puse la validacion de lowercase afuera del fallback ya que era el unico dato que necesitaba normalización, para el json en la arquitectura necesitada debe estar en la ruta principal por lo que hice que la ruta fuera la principal usando logs.json para que fuera acorde a lo solicitado


## Prompt 2
- Qué pedí: group arraylist by a attribute
- Qué me devolvió:
me creo un reduce que en acc agregaba el key el log.id
- Qué cambie: 
tuve que cambiar a que use el log.member y un if para que solo sume los que sean denied

- Por qué: para filtrar solo el conteo de denegadas y no de logs en general y que registre el conteo por miembro

## prompt 3
-Que pedí: refactor service for using src/server.js as only entry, remove app.js and main.js, do not change anything else
- Qué me devolvió:
Elimino app.js y main.js y los unifico en server.js para el inicio del app
- Qué cambie:
scripts iniciales de package.json
- Por qué: para mantener la funcionalidad de npm run dev y npm run start con el nuevo entry para el inicio del servicio

## prompt 4
-Que pedí: I need a function for invalid routes to send a message error
- Qué me devolvió:
Me genero un app.all('*')
- Qué cambie:
Cambie a app.use((req, res)) y la respuesta
- Por qué: me daba error y estuve investigando que desde express 5 ya no se usa esa funcion sino que era de express 4



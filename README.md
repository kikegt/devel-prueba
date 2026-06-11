# kiosco-logs

## Instalación
1. Como primer paso abriremos una terminal ya sea CMD en windows o Terminal en Linux/Mac OS y escribiremos lo siguiente
>cd tu-ruta\devel-prueba
2. Como segundo paso procederemos a ejecutar el siguiente comando para instalar las dependencias desde node, en caso de no tener node instalado puedes instalarlo desde *[Instalador NodeJs][1]*
>npm i
3. Como tercer y ultimo paso procedermos a ejecutar el siguiente comando para empezar a ejecutar en desarrollo 
>npm run dev
En el caso de producción puedes ejecutar
>npm run start

## Via Elegida: B
Utilice la IA mas que todo para la base principal del proyecto, para tener una estructura donde trabajar, posteriormente todo lo fui reemplazando y trabajando sin IA tanto la entidad de los logs, como las funciones, la parte de debuggeo y el query de SQL y me fui guiando de documentacion de Mozilla, W3School y Medium

## Decisiones y tradeoffs:
1. Ventana de tiempo: en base al documento, mi concepto de ventana de tiempo es un intervalo de tiempo en el cual ciertos logs pertenecen, teniendo un timestamp inicial y uno final

2. Politica de datos:
    *Validador inicial que por cada atributo de el objeto recibe el valor, un valor por defecto, y un tipo opcional
    *El validador por defecto valida si el atributo no es nulo ni vacio
    *En caso de ser tipo fecha especificar y el validador en vez de verificar si es vacio, hace un try catch para convertirlo a fecha, en caso de ser exitoso retorna el valor, de lo contrario retorna not-a-date para todos los datos invalidos y tener un estandar
    *Result por defecto tiene un toLowerCase para normalizar la letra de el objeto conforme a los demas datos
    *en getMembersWithMostDenials si un miembro no viene su nombre, igual muestra miembro desconocido para que sepan que hay un miembro que no se sabe su nombre en los logs pero que pueda ser sospechoso
    *en getHourlyBreakdown ignoro los registros que tengan el valor de default de not-a-date ya que pueden ser irrelevantes para el servicio ya que se necesita saber bien la hora
    *en getSuspiciousActivity filtor los registros de not-a-date para evitar inconvenientes con la fecha

3. Ambiguedades:
En Caza de bugs solo mencionaba que habian ciertos errores, mas no que causaban, ni como se reflejaba, por lo que empece a ejecutar la funcion y a revisar el codigo comparando con mi codigo de getSuspiciousActivity que es similar, y me di cuenta de el error de los tiempos logueando las diferencias y viendo que eran demasiado altas, ya que un error similar me paso cuando estaba desarrollando mi funcion y me di cuenta del error de multiplicación y di con el error de tiempo, y con el error de diseño ejecute la funcion y me devolvia varios usuarios lo que no me parecia logico ya que acorde los logs solo pocos usuarios tuvieron alta concurrencia por lo que fui revisando como logueaba y vi que nomas hacia push en base a la diferencia y no al miembro 

4. Inconvenientes
Debido a que mayormente he trabajado con bases de datos no relacionales como mongodb solo pude hacer la primera sección de SQL ya que no tenia conocimiento suficiente para la siguiente y el bonus


## Qué haría con más tiempo:
La verdad si me gustaria implementar clean arquitecture para mayor escabilidad y legibilidad, tambien usar typescript para el tipado seguro y no tener que hacer tantas validaciones a mano, middlewares para la seguridad de los endpoints ya que en un caso real no deberia estar expuestos logs de usuarios, implementar una conexion a una db, y probar con datos reales y si se puede optimizar las consultas para que ya vengan filtradas de db y ya solo en el servicio hacer ciertos calculos

# Prompt Clasificación:
Tengo un modelo de datos con los siguientes atributos, id(obligatorio), member(opcional), action(obligatorio), result(obligatio), timestamp(opcional), tomando en cuenta que "result" puede venir en mayusculas o minusculas, normalizalo para que siempre sea minusculas, tomando en cuenta que timestamp puede no ser una fecha valida intenta que se convierta a fecha y si falla ponle el valor por defecto "not-a-date", necesito que clasifiques una lista tomando en cuenta las validaciones anteriores donde los datos pueden o no venir, has una clasificacion por usuarios que tengan "result":"denied" y un conteo de cuantas veces se repite, te adjunto un ejemplo de como se veria un objeto ideal de la lista de datos
{
  "id": "123",
  "member": "Juan Pérez",
  "action": "check-in",
  "result": "granted",
  "timestamp": "2026-06-01T08:05:00Z"
}


[1]: https://nodejs.org/es/download


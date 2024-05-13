# Fantasy Assistant Project (parte de DAW -> Diseño de Interfaces Web)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.1.3. 
Quizás se necesite instalar Angular aparte en esa versión, aunque con `npm install` debería bastar para tenerlo todo en orden. 

## Modo Servidor
Usa `npm run start` (`ng serve`)  para un servidor de desarrollo. La ruta queda en `http://localhost:4200/`. La aplicacion se recarga sola cuando detecta cambios en los archivos.

## Build
Para buildear la aplicacion no hay mas que usar `npm run build` (`ng build`) y se compilaria todo el proyecto en la carpeta `/dist`. No recomiendo revisar el codigo de esta manera porque se vuelve ilegible. Es mejor partir del `index.html` y ir yendo componente por componente a medida que lo vayas descubriendo

## Troubleshootting
- Si no reconoce el comando `ng`, usa `npm install -g @angular/cli`
- Por si hubiera problemas de compatibilidad, la version de Node que estoy usando es `v21.7.1`, y la versión de npm es `10.2.4`.
- La aplicación ya depende al 100% de la API. Si hubiera problemas de que se ve el proyecto absurdamente incompleto, podría ser problema de la API, contáctame en ese caso (aunque me aseguraré de que eso no pase), o bien, sigue las instrucciones de la sección de abajo para levantar la API en local.
- Testeado en sistemas Windows, Linux y MacOS.

## Más información (mas troubleshootting)
Si en cualquier caso (poco probable) de que la API no funcionase y la interfaz no se viera con claridad al no haber información, puedes levantar la API en local (es necesario tener instalado Docker & Docker Compose)

- Para ello, utiliza el comando `npm run devapi` (`Este comando es un alias de docker-compose up -d`), esto levantará el stack de Docker de la API al completo (servidor HTTP y base de datos)
- También, para que la interfaz use la API en local, deberás cambiar la URL de la API en el archivo `src/app/connect-backend.service.ts` en la variable `enpoint` debes de borrar el valor actual y desmarcar el valor que está a modo de comentario (o la IP de tu máquina si no estás en local)

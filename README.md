# CUARTA PRACTICA INTEGRACION
## Servidor Express con Node, Handlebars y persistencia de datos en MongoDB, login de usuario con diversos roles y capacidad de modificar y eliminar productos de la base de datos
Este proyecto es una aplicación en Node.js que gestiona productos y carritos de compras, con funcionalidades avanzadas de gestión de usuarios y productos. Utiliza Handlebars para renderizar vistas, MongoDB para la persistencia de datos y cuenta con un sistema de autenticación y autorización para diferentes roles de usuario.

Novedades en Esta Versión
En la ultima actualizacion, se incluye en el schema del user las propiedades de "documents" donde se almacenara los archivos cargados por los usuarios, y "last-connection" que almacena en la base de datos la fecha de la ultima vez que el usuario haga login o logout.

Tambien se incluye una opcion de validacion para que los usuarios normales de tipo "user" puedan subir su rango a usuario de tipo "premium" que les permita cargar productos al sistema. Este sistema de validacion requiere que el usuario cargue tres documentos: identificacion, comprobante de domicilio y comprobante de estado de cuenta. Una vez cargados estos archivos, el usuario puede actualizar su rol y cambiar a premium

## Instalación

1. Clona este repositorio en tu máquina local.

2. Asegúrate de tener Node.js y npm instalados en tu sistema.

3. Abre una terminal en la ubicación del proyecto y ejecuta los siguientes comandos para instalar las dependencias:



```bash
    npm install
    npm i express
    npm i express-handlebars
    npm i mongodb
    npm i mongoose
    npm i nodemon
    npm i cookie-parser
    npm i express-session
    npm i session-file-store
    npm i connect-mongo
    npm i bcrypt
    npm i passport
    npm i passport-local
    npm i passport-github2
    npm i jsonwebtoken
    npm i dotenv
    npm i chance
    npm i uuid
    npm i multer
```
4. Crea un archivo en la raiz del proyecto llamado .env y agrega tus credenciales para acceder a la base de datos MongoDB siguiendo el esquema presentado debajo y modificando los siguientes segmentos "TU-NOMBRE-DE-USUARIO","TU-PASSWORD", "TU CONTRASEÑA" :



```bash
   MONGO_URI=mongodb+srv://"TU-NOMBRE-DE-USUARIO":"TU-PASSWORD"@cluster0.xtb0h9o.mongodb.net/"nombre-de-la base-de-datos"?retryWrites=true&w=majority

   MONGO_TEST=mongodb+srv://"TU-NOMBRE-DE-USUARIO":"TU-PASSWORD"@cluster0.xtb0h9o.mongodb.net/"base-de datos-de-prueba"?retryWrites=true&w=majority
   
   SESSION_SECRET="TU CONTRASEÑA"

   USERMAILER="CORREO DE MAILER"
   PASSMAILER="PASSWORD DE MAILER"

   TWILIO_ACCOUNT_SID="TWILIO"
   TWILIO_AUTH_TOKEN="TWILIO"
   TWILIO_SMS_NUMBER="TWILIO"
   
   JWT_SECRET="Clave de JWT"  

```


## Uso

Inicia la aplicación ejecutando el siguiente comando:

```bash
    npm start
```
La aplicación estará disponible en:
### `http://localhost:8080`


## Estructura del Proyecto
```
Tercera Entrega/
├── src/
│   ├── config/
│   │   ├── db.js
│   │   ├── errores.js
│   │   ├── middlewares.js
│   │   ├── multer.js
│   │   ├── nodemailer.js
│   │   ├── session.js
│   │   ├── token.js
│   │   ├── twilio.js
│   │   └── passport.config.js
│   ├── controllers/
│   │   ├── Cartcontroller.js
│   │   ├── Productcontroller.js
│   │   ├── Usercontroller.js
│   │   ├── CartManager.js
│   │   └── ProductManager.js
│   ├── DAO/
│   │   ├── classes/
│   │   │   ├── CartDao.js
│   │   │   ├── ProductDao.js
│   │   │   └── UserDao.js
│   │   ├── models/
│   │   │   ├── CartModel.js
│   │   │   ├── MessageModel.js
│   │   │   ├── ProductModel.js
│   │   │   ├── TicketModel.js
│   │   │   └── UserModel.js
│   ├── public/
│   │   ├── css/
│   │   ├── js/
│   │   └── files/
│   ├── router/
│   │   ├── carts.routes.js
│   │   ├── messages.routes.js
│   │   ├── product.routes.js
│   │   ├── upload.routes.js
│   │   ├── user.routes.js
│   │   └── views.routes.js
│   ├── repositories/
│   │   ├── CartRepository.json
│   │   ├── ProductRepository.json
│   │   └── UserRepository.js
│   ├── views/
│   │   ├──layaouts/
│   │   ├── addProduct.handlebars
│   │   ├── allusers.handlebars
│   │   ├── cambioAPremium.handlebars
│   │   ├── cart.handlebars
│   │   ├── chat.handlebars
│   │   ├── confirmarPremium.handlebars
│   │   ├── detail.handlebars
│   │   ├── emailsent.handlebars
│   │   ├── faker.handlebars
│   │   ├── home.handlebars
│   │   ├── login.handlebars
│   │   ├── passreset.handlebars
│   │   ├── productos.handlebars
│   │   ├── productAdded.handlebars
│   │   ├── profile.handlebars
│   │   └── register.handlebars
│   ├── app.js
│   ├── index.js
│   └── utils.js
├── .env
├── .gitignore
├── package-lock.json
├── package.json
└── README.md
```



## Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución de JavaScript del lado del servidor.
- **Express.js**: Framework web para Node.js que permite construir aplicaciones web rápidas y robustas.
- **MongoDB**: Base de datos NoSQL flexible y escalable.
- **Mongoose**: Biblioteca de modelado de objetos MongoDB para Node.js.
- **Handlebars**: Motor de plantillas para generar vistas dinámicas en el servidor.
- **@handlebars/allow-prototype-access**: Proporciona acceso a los prototipos en Handlebars.
- **Bcrypt**: Biblioteca para el hashing de contraseñas.
- **Chance**: Generador de datos aleatorios para Node.js.
- **Connect-Mongo**: Implementación de MongoDB para el almacenamiento de sesiones en Express.js.
- **Cookie-Parser**: Middleware para analizar cookies en las solicitudes.
- **Dotenv**: Módulo que carga variables de entorno desde un archivo .env.
- **Express-Session**: Middleware para la gestión de sesiones en Express.js.
- **JsonWebToken (JWT)**: Implementa el estándar JSON Web Tokens para la creación de tokens de acceso.
- **Nodemailer**: Módulo para enviar correos electrónicos con Node.js.
- **Nodemon**: Herramienta de desarrollo que reinicia automáticamente el servidor cuando se detectan cambios en los archivos.
- **Passport**: Middleware de autenticación para Node.js.
- **Passport-Github2**: Estrategia de autenticación de Passport usando GitHub.
- **Passport-JWT**: Estrategia de autenticación de Passport usando JSON Web Tokens.
- **Passport-Local**: Estrategia de autenticación de Passport usando un nombre de usuario y contraseña.
- **Session-File-Store**: Almacenamiento de sesiones basado en archivos para Express.js.
- **Swagger-JSDoc**: Genera documentación OpenAPI (Swagger) basada en comentarios JSDoc.
- **Swagger-UI-Express**: Permite servir documentos Swagger y Swagger UI generados automáticamente.
- **Twilio**: API para enviar SMS y realizar llamadas telefónicas.
- **UUID**: Librería para la generación de identificadores únicos universales (UUID).



## Capturas de Pantalla

![Captura de Pantalla 1](/src/public/files/Capturadepantalla1.png)
![Captura de Pantalla 2](/src/public/files/Capturadepantalla2.png)
![Captura de Pantalla 3](/src/public/files/Capturadepantalla3.png)
![Captura de Pantalla 4](/src/public/files/Capturadepantalla4.png)
![Captura de Pantalla 5](/src/public/files/Capturadepantalla5.png)
![Captura de Pantalla 6](/src/public/files/Capturadepantalla6.png)
![Captura de Pantalla 7](/src/public/files/Capturadepantalla7.png)

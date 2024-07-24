import express from "express";
import paths from "./utils/paths.js";
import handlebars from "./config/handlebars.config.js";
import mongoDB from "./config/mongoose.config.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import apiUsersRouter from "./routes/api.users.routes.js";
import apiSessionsRouter from "./routes/api.sessions.routes.js";
import homeRouter from "./routes/home.routes.js";

const server = express();
const PORT = 8080;
const HOST = "localhost";

// Middleware para decodificar datos de formularios y JSON
server.use(express.urlencoded({ extended: true }));
server.use(express.json());

// Configuración del store de sesiones
const storeOptions = MongoStore.create({
    mongoUrl:  "mongodb+srv://julietaraminger:PFucmdOvKhfCPHFD@cluster0.uwq4ups.mongodb.net/backend2",
    autoRemove: "native", // Eliminar automáticamente las sesiones expiradas
    // ttl: La expiración de la sesión se controla a través de cookie.maxAge.
});

// Configuración de la sesión
const sessionOptions = {
    store: storeOptions,
    secret: "miClaveSecreta",
    cookie: { maxAge: 2 * 60 * 60 * 1000 }, // 2 horas
    saveUninitialized: false, // No guarda sesiones no inicializadas
    resave: false, // No resguardar si la sesión no ha cambiado
};

// Middleware para gestión de sesiones
server.use(session(sessionOptions));

// Configuración del motor de plantillas
handlebars.config(server);

// declaracion de ruta estatica
server.use("/", express.static(paths.css));

// Enrutadores
server.use("/api/users", apiUsersRouter);
server.use("/api/sessions", apiSessionsRouter);
server.use("/", homeRouter);

// Declaración de ruta estática: http://localhost:8080/api/public
server.use("/public", express.static(paths.public));

// Control de rutas inexistentes
server.use("*", (req, res) => {
    res.status(404).send("<h1>Error 404</h1><h3>La URL indicada no existe en este servidor</h3>");
});

// Control de errores internos
server.use((error, req, res) => {
    console.log("Error:", error.message);
    res.status(500).send("<h1>Error 500</h1><h3>Se ha generado un error en el servidor</h3>");
});

// Método oyente de solicitudes
server.listen(PORT, async () => {
    console.log(`Ejecutándose en http://${HOST}:${PORT}`);
    await mongoDB.connectDB();
});
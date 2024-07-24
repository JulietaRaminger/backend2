import { Router } from "express";
import UserManager from "../managers/UserManager.js";

import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
    ERROR_NOT_FOUND_CREDENTIALS,
} from "../constants/messages.constant.js";

// Función para manejar errores y enviar respuestas adecuadas
const errorHandler = (res, message) => {
    if (message === ERROR_INVALID_ID) return res.status(400).json({ status: false, message: ERROR_INVALID_ID });
    if (message === ERROR_NOT_FOUND_ID) return res.status(404).json({ status: false, message: ERROR_NOT_FOUND_ID });
    if (message === ERROR_NOT_FOUND_CREDENTIALS) return res.status(401).json({ status: false, message: ERROR_NOT_FOUND_CREDENTIALS });
    return res.status(500).json({ status: false, message });
};

const router = Router();
const userManager = new UserManager();

// Ruta para registrar un nuevo usuario
router.post("/register", async (req, res) => {
    try {
        await userManager.insertOne(req.body);
        res.status(200).redirect("/login");
    } catch (error) {
        errorHandler(res, error.message);
    }
});

// Ruta para iniciar sesión
router.post("/login", async (req, res) => {
    try {
        if (req.session?.user?.loggedIn) {
            throw new Error("Ya has iniciado sesión");
        }

        const { email, password } = req.body;
        const userFound = await userManager.getOneByEmailAndPassword(email, password);

        // Se guardan datos del usuario en la sesión
        req.session.user = {
            id: userFound._id.toString(),
            name: userFound.name,
            loggedIn: true,
        };

        res.status(200).redirect("/");
    } catch (error) {
        errorHandler(res, error.message);
    }
});

// Ruta para cerrar sesión
router.get("/logout", async (req, res) => {
    try {
        req.session.destroy();
        res.status(200).redirect("/");
    } catch (error) {
        errorHandler(res, error.message);
    }
});

export default router;
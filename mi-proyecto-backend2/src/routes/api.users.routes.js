import { Router } from "express";
import UserManager from "../managers/UserManager.js";

import {
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND_ID,
    ERROR_NOT_FOUND_CREDENTIALS,
} from "../constants/messages.constant.js";

const errorHandler = (res, message) => {
    if (message === ERROR_INVALID_ID) return res.status(400).json({ status: false, message: ERROR_INVALID_ID });
    if (message === ERROR_NOT_FOUND_ID) return res.status(404).json({ status: false, message: ERROR_NOT_FOUND_ID });
    if (message === ERROR_NOT_FOUND_CREDENTIALS) return res.status(401).json({ status: false, message: ERROR_NOT_FOUND_CREDENTIALS });
    return res.status(500).json({ status: false, message });
};

const router = Router();
const userManager = new UserManager();

router.get("/", async (req, res) => {
    try {
        const usersFound = await userManager.getAll(req.query);
        res.status(200).json({ status: true, payload: usersFound });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const userFound = await userManager.getOneById(req.params.id);
        res.status(200).json({ status: true, payload: userFound });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

router.post("/", async (req, res) => {
    try {
        const userCreated = await userManager.insertOne(req.body);
        res.status(201).json({ status: true, payload: userCreated });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const userUpdated = await userManager.updateOneById(req.params.id, req.body);
        res.status(200).json({ status: true, payload: userUpdated });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const userDeleted = await userManager.deleteOneById(req.params.id);
        res.status(200).json({ status: true, payload: userDeleted });
    } catch (error) {
        errorHandler(res, error.message);
    }
});

export default router;
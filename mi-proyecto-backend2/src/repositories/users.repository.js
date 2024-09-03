import { UserDAO } from "../daos/index.js";

export const getUserById = async (id) => await UserDAO.getUserById();
export const getUserEmail = async (email) => await UserDAO.getUserEmail();
export const registerUser = async (userData) => await UserDAO.registerUser();
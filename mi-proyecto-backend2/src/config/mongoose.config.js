import { connect, Types } from "mongoose";

const connectDB = async () => {
    const URI = "mongodb+srv://julietaraminger:PFucmdOvKhfCPHFD@cluster0.uwq4ups.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    try {
        connect(URI, { dbName: "backend2" });
        console.log("Conectado a MongoDB");
    } catch (error) {
        console.error("Error al conectar con MongoDB", error.message);
    }
};

const isValidID = (id) => {
    return Types.ObjectId.isValid(id);
};

export default {
    connectDB,
    isValidID,
};
import path from "path";

const paths = {
    root: path.dirname(""),
    src: path.join(path.dirname(""), "src"),
    public: path.join(path.dirname(""), "src", "public"),
    images: path.join(path.dirname(""), "src", "public", "images"),
    css: path.join(path.dirname(""), "src", "public", "css"),
    views: path.join(path.dirname(""), "src", "views"),
};

export default paths;
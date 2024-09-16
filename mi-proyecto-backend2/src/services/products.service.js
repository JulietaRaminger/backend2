import ProductRepository from '../repositories/productRepository.js';

class ProductService {

    async getProducts(queryParams) {
        return await ProductRepository.getProducts(queryParams);
    }

    async getProductById(id) {
        return await ProductRepository.getProductById(id);
    }

    async addProduct(productData) {
        return await ProductRepository.addProduct(productData);
    }

    async updateProduct(id, updatedFields) {
        return await ProductRepository.updateProduct(id, updatedFields);
    }

    async deleteProduct(id) {
        return await ProductRepository.deleteProduct(id);
    }

    // En ProductService.js
async getProductsByThumbnails(thumbnails) {
    // Supongamos que tienes una función para obtener productos por imagen
    return await productModel.find({ 'thumbnails': { $in: thumbnails } });
}

}

export default new ProductService;
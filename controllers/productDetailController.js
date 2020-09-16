let controller = {};
let models = require('../models');

let Product = models.Product;

controller.getAll = () => {
    return new Promise((resolve, reject) => {
        Product
            .findAll({
                include: [{ model: models.Category }],
                attributes: ['id', 'name', 'price', 'imagepath']
            })
            .then(data => resolve(data))
            .catch(error => reject(new Error(error)));
    });
};

controller.getById = (id) => {
    return new Promise((resolve, reject) => {
        let product;
        Product
            .findOne({
                where: { id: id },
            })
            .then(result => {
                product = result;
                return models.Comment.findAll({
                    where: {productId: id},
                    include: [{ model: models.User }]
                });
            })
            .then(comments => {
                product.Comments = comments;
                return models.Review.findAll({
                    where: {productId: id},
                    include: [{ model: models.User }]
                });
            })
            .then(reviews => {
                product.Reviews = reviews;
                let stars = [];
                for (let i=1; i<=5; i++) {
                    stars.push(reviews.filter(item => item.rating == i).length);
                }
                product.stars = stars;
                resolve(product);
            })
        
            .catch(error => reject(new Error(error)));
    });
}

module.exports = controller;
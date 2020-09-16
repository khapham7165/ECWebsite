let express = require('express');
let router = express.Router();

router.post('/', (req, res, next) => {
    let controller = require('../controllers/reviewController');
    let review = {
        userId: req.body.userId,
        productId: req.body.productId,
        message: req.body.message,
        rating: req.body.rating,
    };
    console.log(review);
    controller
        .add(review)
        .then(data => {
            res.redirect('shop-detail/' + review.productId);
        })
        .catch(error => next(error));
});
module.exports = router;
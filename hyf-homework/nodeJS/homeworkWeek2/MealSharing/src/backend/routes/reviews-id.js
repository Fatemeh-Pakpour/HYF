const express = require('express');
const router = express.Router();

const reviews = require('../data/reviews.json');

router.get('/reviews/:id', function (req, res) {

    const paramsId = req.params.id;
    const reviewId = reviews.find(review => review.Id === +paramsId);
    res.json(reviewId);
})

module.exports = router;
const Router = require('express').Router;
const router = Router();
const controller = require('../controllers')

router.get('/', (req, res) => {
    res.render("index");
});
router.get('/subjects', controller.getSubjects);
router.get('/subjects/:id', controller.getSubject);


module.exports = router;

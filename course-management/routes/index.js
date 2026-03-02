const Router = require('express').Router;
const router = Router();
const controller = require('../controllers');
const upload = require('../middleware/upload');

router.get('/', (req, res) => {
    res.render('index');
});
router.get('/subjects', controller.getSubjects);
router.get('/subjects/:id', controller.getSubject);
router.post('/subjects', upload, controller.createSubject);
router.post('/subjects/update/:id', upload, controller.updateSubject);
router.post('/subjects/delete/:id', controller.deleteSubject);

module.exports = router;

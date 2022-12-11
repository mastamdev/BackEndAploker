const router = require('express').Router()
const adminController = require('../controller/adminController')
const { uploadSingle, uploadMultiple } = require('../middleware/multer');

router.get('/dashboard', adminController.viewDashboard)

router.get('/category', adminController.viewCategory)
router.post('/category', uploadSingle, adminController.addCategory)
router.put('/category', uploadSingle, adminController.editCategory)
router.delete('/category/:id', adminController.deleteCategory)

router.get('/job', adminController.viewJob)
router.post('/job', uploadMultiple, adminController.addJob)

router.get('/users', adminController.viewUsers)
router.post('/users', uploadMultiple, adminController.addUsers)
router.put('/users/:id',uploadMultiple, adminController.editUsers)

router.get('/lamar', adminController.viewLamar)
router.post('/lamar',uploadMultiple, adminController.addlamar)

module.exports = router
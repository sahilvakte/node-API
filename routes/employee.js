const express = require('express');
const router = express.Router()

const EmployeeController = require('../controllers/EmployeeController')
const upload             = require('../middleware/uplod')

router.get('/',EmployeeController.index)
router.post('/show',EmployeeController.show)
router.post('/store',upload.single('avatar'),EmployeeController.store)    //For single file upload
// router.post('/store',upload.array('avatar[]'),EmployeeController.store)     //For Multiple files
router.post('/update',EmployeeController.update)
router.post('/destroy',EmployeeController.destroy)

module.exports = router
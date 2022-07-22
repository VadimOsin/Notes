const Router = require('express')
const router = new Router()
const authController = require('../controller/auth.controller')
const {check} = require('express-validator')


router.post('/registration', [
    check('userName', 'Имя пользователя не может быть пустым').notEmpty(),
    check('password', 'Пароль должен быть больше 4 и меньше 10 символов').isLength({min: 4, max: 10})
], authController.registration)
router.post('/login', authController.login)
router.get('/users', authController.getUsers)


module.exports = router
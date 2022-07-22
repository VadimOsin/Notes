const db = require("../db")
const bcrypt = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')
const {secret} = require('../config')

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "1h"})
}

class authController {

    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка при регистрации"})
            }
            const {userName, password} = req.body
            const candidate = await db.query(`SELECT *
                                              FROM person
                                              WHERE to_tsvector(username)
                                                                @@ plainto_tsquery($1)`, [userName])
            if (candidate.rows[0]) {
                return res.status(400).json({message: "Пользователь с таким именем уже существует"})
            }
            const hashPassword = bcrypt.hashSync(password, 5)
            const newPerson = await db.query(`INSERT INTO person (userName, password)
                                              values ($1, $2) RETURNING *`, [userName, hashPassword])
            return res.json("Пользователь успешно зарегистрирован")

        } catch (e) {
            res.status(400).json({message: "registration error"})
        }
    }

    async login(req, res) {
        try {
            const {userName, password} = req.body
            const loginName =
                await db.query(`SELECT *
                                FROM person
                                WHERE to_tsvector(username)
                                                  @@ plainto_tsquery($1)`, [userName])
            if (!loginName.rows[0]) {
                return res.status(400).json({message: `Пользователь ${userName} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, loginName.rows[0].password)
            if (!validPassword) {
                return res.status(400).json({message: "Неверный пароль"})
            }
            const token = generateAccessToken(loginName.rows[0].id, loginName.rows[0].roles)
            return res.json(loginName.rows[0])
        } catch (e) {
            res.status(400).json({message: "login error"})
        }
    }

    async getUsers(req, res) {
        const users = await db.query(`SELECT *
                                      FROM person`)
        res.json(users.rows)
    }

}

module.exports = new authController()
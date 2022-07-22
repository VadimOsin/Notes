const db = require("../db")

class UserController {

    async createUser(req, res) {
        const {userName, password} = req.body
        const newPerson = await db.query(`INSERT INTO person (userName, password)
                                          values ($1, $2) RETURNING *`, [userName, password])

        res.json(newPerson.rows[0])
    }

    async getOneUser(req, res) {
        const id = req.params.id
        const user = await db.query(`SELECT *
                                     FROM person
                                     WHERE id = $1`, [id])
        res.json(user.rows[0])
    }

    async updateUser(req, res) {
        const {id, userName, password} = req.body
        const user = await db.query(`UPDATE person
                                     set userName =$1,
                                         password=$2
                                     where id = $3 RETURNING *`, [userName, password, id])
        res.json(user.rows[0])
    }

    async deleteUser(req, res) {
        const id = req.params.id
        const user = await db.query(`DELETE
                                     FROM person
                                     WHERE id = $1`, [id])
        res.json(user.rows[0])
    }
}

module.exports = new UserController()
const bcryptjs = require("bcryptjs");
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username) {
          const confirmed = bcryptjs.compareSync(password, users[i].passHash)
          if (confirmed) {
            let userReturned = {...users[i]}
            delete userReturned.passHash
            return res.status(200).send(userReturned)
          }
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
      const {username, email, firstName, lastName, password} = req.body
      const salt = bcryptjs.genSaltSync(5)
      const passHash = bcryptjs.hashSync(password, salt)
      console.log(passHash)
      let user = {
        username,
        email,
        firstName,
        lastName,
        passHash
      }
      users.push(user)
      let userReturned = {...user}
      delete userReturned.passHash
      res.status(200).send(userReturned)
        console.log('Registering User')
        console.log(req.body)
        users.push(req.body)
        // res.status(200).send(req.body)
    }
}
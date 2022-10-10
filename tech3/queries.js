const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'techfest',
  password: 'Saritha@1983',
  port: 5432,
})
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const getUserById = (request, response) => {
  // const id = parseInt(request.params.id)
  const {id,password} = request.body
  pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

let id=1;
const createUser = (request, response) => {
 
  const { uname, email ,password} = request.body

  pool.query(`INSERT INTO users (id,uname, email,password) VALUES ($1, $2, $3, $4)`, [id,uname, email,password], (error) => {
    if (error) {
      throw error
    }
    //${results.insertid}
    response.status(200).send(`User added with ID: ${id}`);
    id++;
    console.log(request.body);
    // response.status(200).json(results.rows);
    // response.status(200).send(` hello ${uname}`)
    
  })
}

const registerUser = (request, response) => {
  const { id,uname, email, event } = request.body

  pool.query('INSERT INTO register (id,uname, email,event) VALUES ($1, $2,$3,$4)', [id,uname, email,event], (error, results) => {
    if (error) {
      throw error
    }//${results.insertId}
    response.status(200).send(`User registered with ID: ${id} for ${event}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM register WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  registerUser,
  updateUser,
  deleteUser,
}
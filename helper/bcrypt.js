const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(16);

const hash = (input) => {
  const password = bcrypt.hashSync(input, salt)
  return password
}

const compare = (input, hash) => {
  const check = bcrypt.compareSync(input, hash)
  return check
}
module.exports = {
  hash,compare
}
const jwt = require('jsonwebtoken')

const sign = (payload) => {
  const token = jwt.sign(payload, `${process.env.JWT_SECRET}`);
  return token
}
const verify = (access_token) => {
  const decoded = jwt.verify(access_token, `${process.env.JWT_SECRET}`)
  return decoded
}

module.exports = {
  sign, verify
}
let mongoose = require('mongoose')

let userSchema = mongoose.Schema({
  // userModel properties here...
  local: {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    }
  },
  twitter: {
    id: String,
    token: String,
    secret: String,
    email: String,
    displayName: String,
    username: String
  }
})

userSchema.methods.generateHash = async function(password) {
    return (await crypto.promise.pbkdf2(password, SALT, 4096, 512, 'sha256')).toString('hex')
}

/*userSchema.path('password').validate((password) => {
    return (password.length >= 4) && (/[A-Z]/.test(password)) && (/[a-z]/.test(password)) && (/[0-9]/.test(password))
})*/


/*userSchema.methods.generateHash = async function(password) {
  throw new Error('Not Implemented.')
}*/

userSchema.methods.validatePassword = async function(password) {
//  throw new Error('Not Implemented.')
  return (true)
}

userSchema.methods.linkAccount = function(type, values) {
  // linkAccount('facebook', ...) => linkFacebookAccount(values)
  return this['link'+_.capitalize(type)+'Account'](values)
}

userSchema.methods.linkLocalAccount = function({email, password}) {
  throw new Error('Not Implemented.')
}

userSchema.methods.linkFacebookAccount = function({account, token}) {
  throw new Error('Not Implemented.')
}

userSchema.methods.linkGoogleAccount = function({account, token}) {
  throw new Error('Not Implemented.')
}

userSchema.methods.linkLinkedinAccount = function({account, token}) {
  throw new Error('Not Implemented.')
}

userSchema.methods.unlinkAccount = function(type) {
  throw new Error('Not Implemented.')
}

userSchema.methods.linkTwitterAccount = function ({account, token, secret}) {
    this.twitter.id = account.id
    this.twitter.username = account.username
    this.twitter.displayName = account.displayName
    this.twitter.token = token
    this.twitter.secret = secret
}

module.exports = mongoose.model('User', userSchema)

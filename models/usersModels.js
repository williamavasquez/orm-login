const orm = require("../config/orm")

const user = {
  findOne: function(value, cb){
    let condition = value[0]+ '= "' + value[1] + '"'
    orm.findOne("users", condition,(res)=>cb(res))
  },
  createUser: function(vals, cb) {
    orm.create("users", ['name','username','password'], vals, (res)=> cb(res));
  }
}

module.exports = user
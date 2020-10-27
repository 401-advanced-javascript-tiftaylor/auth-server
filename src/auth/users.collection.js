const userModel = require('./userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

class UserCollection  {

  constructor() {
    this.schema = userModel;
  }

  /**
   * gets a list 
   * @param {object} id / category
   */
  read(id) {
    if (id) {
      return this.schema.find({ _id: id });
    } else {
      return this.schema.find({});
    }
  }

  authenticate(username, password) {
    this.schema.find({ username: username })
      .then(results => {
        //TODO:  handle case where no user found
        if(results.length === 0){
          throw Error `You did not use the right credentials`
        } else {
          const user = results[0];
          return bcrypt.compare(password, user.password)
            .then(isValid => {
              if(isValid) {
                return user;
              } else {
                throw Error `You did not use the right credentials`
              }
            })
        }
      })
  }


  generateToken(username){
    return jwt.sign({ username: username }, process.env.JWT_SECRET);
  }


  /**
   * adds a note to the list
   * @param {object} obj / text, category
   */
  create(obj) {
    return bcrypt.hash(obj.password, 10)
      .then(hashPassword => {
        obj.password = hashPassword;
        const newUser = new this.schema(obj);
        return newUser.save();
      });
  }

  update(id, obj) {
    return this.schema.findByIdAndUpdate(id, obj, {
      new: true,
    });
  }

  /**
   * deletes item from list based on id match
   * @param {String} id 
   */
  delete(id) {
    let removeItem = {
      _id: id,
    };

    return this.schema.deleteOne(removeItem);
  }

}

module.exports = new UserCollection();
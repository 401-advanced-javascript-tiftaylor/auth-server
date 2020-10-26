const userModel = require('./users.js');

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
        const user = results[0];
        if(user.hashPassword === password) {
          return user;
        } else {
          throw Error `You did not use the right credentials`
        }
      })
  }

  /**
   * adds a note to the list
   * @param {object} obj / text, category
   */
  create(obj) {
    const newObj = {
      username: obj.username,
      hashPassword: 'jkhgkhjg' //obj.password
    }
    const newUser = new this.schema(newObj);
    return newUser.save();
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
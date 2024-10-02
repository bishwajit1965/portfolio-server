const { ObjectId } = require("mongodb");
const { getDB } = require("../utils/database");
class User {
  constructor() {
    this.collection = getDB().collection("users");
  }

  async findByEmail(email) {
    return await this.collection.findOne({ email });
  }

  async createUser(user) {
    return await this.collection.insertOne(user);
  }
}

module.exports = User;

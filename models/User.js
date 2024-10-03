const { getDB } = require("../utils/database");
const { ObjectId } = require("mongodb");

class User {
  constructor() {
    this.db = getDB(); // Get the connected database instance
    this.collection = this.db.collection("users");
  }

  async createUser(userData) {
    try {
      const result = await this.collection.insertOne(userData);
      return { _id: result.insertedId, ...userData }; // Return the newly created user
    } catch (error) {
      throw new Error("Error creating user: " + error.message);
    }
  }

  async findUserByEmail(email) {
    try {
      const user = await this.collection.findOne({ email });
      return user;
    } catch (error) {
      throw new Error("Error finding user: " + error.message);
    }
  }

  async findUserById(id) {
    try {
      const user = await this.collection.findOne({ _id: new ObjectId(id) });
      return user;
    } catch (error) {
      throw new Error("Error finding user: " + error.message);
    }
  }

  async updateUser(id, updateData) {
    try {
      const result = await this.collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: updateData }
      );
      return result.modifiedCount > 0; // Return true if update was successful
    } catch (error) {
      throw new Error("Error updating user: " + error.message);
    }
  }

  async deleteUser(id) {
    try {
      const result = await this.collection.deleteOne({ _id: new ObjectId(id) });
      return result.deletedCount > 0; // Return true if deletion was successful
    } catch (error) {
      throw new Error("Error deleting user: " + error.message);
    }
  }
}

module.exports = User;

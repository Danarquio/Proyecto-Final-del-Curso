import mongoose from "mongoose";
import UserRepository from "../src/repositories/UserRepository.js";
import Assert from "assert";
import dotenv from "dotenv";

dotenv.config();



before(async function() {
    await mongoose.connect(process.env.MONGO_TEST);
  });

const assert = Assert.strict

describe("Testing Users DAO get method", ()=>{
    before(function(){
        this.usersDao = new UserRepository()
    })

    it("El Dao debe agregar a un usuario a la db", async function(){
        let mockUser = {
            first_name: "Coder",
            last_name: "House",
            email: "coder@houses.com",
            age: 20,
            password: "123456",
            rol: "user"
        }

        const result = await this.usersDao.createUser(mockUser)
        assert.ok(result._id)
    })

    it("Deberia devolver los usuarios de la DB", async function(){
        this.timeout(5000)
        try {
            const result = await this.usersDao.getAllUsers()
            assert.strictEqual(Array.isArray(result) && result.length > 0, true)
        } catch (error) {
            console.error("Error durante el test: ", error)
            assert.fail("Test con error")
        }
    })

    it("El Dao debe obtener un usuario por correo electronico", async function(){
        let email = "coder@houses.com"

        const user = await this.usersDao.getUserByEmail(email)
        assert.strictEqual(typeof user, "object")
    })

    beforeEach(async function() {
        if (mongoose.connection.collection.users) {
          await mongoose.connection.collection.users.drop();
        }
      });


})
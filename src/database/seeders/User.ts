import { User } from "../../entidades";
import { AppDataSource } from "../data-source";
import bcrypt from 'bcrypt';

async function seedUser() {
    const firstName = "admin"
    const lastName = 'super'
    const email = 'admin@gmail.com'
    const password = 'root'
    const hashedPassword =  await bcrypt.hash(password,15)

  try {
    const user = new User(firstName,lastName,email,hashedPassword);
    await AppDataSource.manager.save(user);
  } catch (error) {
    return error
  }
}

async function runSeeder(){
    try {
        await seedUser();
    } catch (error) {
        console.error("Erro ao executar o seeder:", error);
    }
}

runSeeder();
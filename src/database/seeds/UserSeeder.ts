
import { DataSource } from 'typeorm'
import { Seeder, SeederFactoryManager } from 'typeorm-extension'
import { User } from '../../entities'
import bcrypt from 'bcrypt'

export class UserSeeder implements Seeder {
    async run(dataSource: DataSource,factoryManager: SeederFactoryManager): Promise<void> {
        const userRepository = dataSource.getRepository(User)

        const userData = {
            firstName: 'Root',
            lastName: 'rotzera',
            email: 'root@gmail.com',
            password: await bcrypt.hash('teste', 10) 
        }

        const newUser = userRepository.create(userData)
        await userRepository.save(newUser)
    }
}
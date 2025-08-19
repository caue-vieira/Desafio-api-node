import { db } from "./client.ts"
import { courses, enrollments, users } from "./schema.ts"
import { hash } from "argon2";
import { fakerPT_BR as faker } from "@faker-js/faker";

// HASH: Algoritmo sem volta
// Para validar, compara a senha digitada convertida para hash com o hash armazenado

async function seed() {
    const passwordHash = await hash('123456');

    const usersInsert = await db.insert(users).values([
        { 
            name: faker.person.fullName(), 
            email: faker.internet.email(),
            password: passwordHash,
            role: "student",
        },
        { 
            name: faker.person.fullName(), 
            email: faker.internet.email(),
            password: passwordHash,
            role: "student",
        },
        { 
            name: faker.person.fullName(), 
            email: faker.internet.email(),
            password: passwordHash,
            role: "student",
        },
    ]).returning();

    const coursesInsert = await db.insert(courses).values([
        { title: faker.lorem.words(4) },
        { title: faker.lorem.words(4) },
        { title: faker.lorem.words(4) },
        { title: faker.lorem.words(4) },
    ]).returning();

    await db.insert(enrollments).values([
        { userId: usersInsert[0].id, courseId: coursesInsert[0].id },
        { userId: usersInsert[0].id, courseId: coursesInsert[1].id },
        { userId: usersInsert[1].id, courseId: coursesInsert[2].id }
    ])
}

seed()
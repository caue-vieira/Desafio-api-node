import { test, expect } from "vitest";
// Faz requisições HTTP sem precisar rodar a aplicação
import request from "supertest";
import { server } from "../app.ts";
import { faker } from "@faker-js/faker";
import { makeAuthenticatedUser } from "./factories/makeUser.ts";

// Não se usa Zod para validação de testes

test('Create a new course', async () => {
    // Espera o servidor estar "pronto" (executar os register das rotas)
    await server.ready();

    const { token } = await makeAuthenticatedUser("manager");

    const response = await request(server.server)
        .post("/courses")
        .set("Content-Type", "application/json")
        .set("Authorization", token)
        .send({ title: faker.lorem.words(4) })

    expect(response.status).toEqual(201);
    expect(response.body).toEqual({
        courseId: expect.any(String),
    })
});

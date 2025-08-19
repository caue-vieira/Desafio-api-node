import { test, expect } from "vitest";
import request from "supertest";
import { server } from "../app.ts";
import { makeCourse } from "./factories/makeCourse.ts";
import { makeAuthenticatedUser } from "./factories/makeUser.ts";

// Não se usa Zod para validação de testes
// Ao ter testes E2E não é necessário rodar a aplicação para testar features

test('Get a course by ID', async () => {
    await server.ready();

    const { token } = await makeAuthenticatedUser("student")
    const course = await makeCourse();

    const response = await request(server.server)
    .get(`/courses/${course.id}`)
    .set("Authorization", token);

    expect(response.status).toEqual(200);
    expect(response.body).toEqual({
        course: {
            id: expect.any(String),
            title: expect.any(String),
            description: null,
        },
    })
});

test('Return 404 for non existing course', async () => {
    await server.ready();

    const { token } = await makeAuthenticatedUser("student")
    const response = await request(server.server)
        .get(`/courses/584abe0c-2e40-4a30-be84-ab67d408c88c`)
        .set("Authorization", token);

    expect(response.status).toEqual(404);
});

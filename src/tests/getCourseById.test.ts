import { test, expect } from "vitest";
import request from "supertest";
import { server } from "../app.ts";
import { makeCourse } from "./factories/makeCourse.ts";

// Não se usa Zod para validação de testes

test('Get a course by ID', async () => {
    await server.ready();

    const course = await makeCourse();

    const response = await request(server.server)
        .get(`/courses/${course}`);

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

    const course = await makeCourse();

    const response = await request(server.server)
        .get(`/courses/584abe0c-2e40-4a30-be84-ab67d408c88c`);

    expect(response.status).toEqual(404);
});

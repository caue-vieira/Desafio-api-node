import { test, expect } from "vitest";
import request from "supertest";
import { randomUUID } from "node:crypto";
import { server } from "../app.ts";
import { makeCourse } from "./factories/makeCourse.ts";
import { makeAuthenticatedUser } from "./factories/makeUser.ts";

test('Get all courses', async () => {
    await server.ready();

    const titleId = randomUUID();

    const { token } = await makeAuthenticatedUser("manager");

    const course = await makeCourse(titleId);

    const response = await request(server.server)
        .get(`/courses?search=${course.title}`)
        .set("Authorization", token);

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
        courses: [
            {
                id: expect.any(String),
                title: titleId,
                enrollments: 0,
            }
        ],
        pages: 1,
    })
});

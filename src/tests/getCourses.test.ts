import { test, expect } from "vitest";
import request from "supertest";
import { randomUUID } from "node:crypto";
import { server } from "../app.ts";
import { makeCourse } from "./factories/makeCourse.ts";
import { title } from "node:process";

test('Get all courses', async () => {
    await server.ready();

    const titleId = randomUUID();

    const course = await makeCourse(titleId);

    const response = await request(server.server)
        .get(`/courses?search=${course}`);

    expect(response.status).toEqual(200)
    expect(response.body).toEqual({
        total: 1,
        courses: [
            {
                id: expect.any(String),
                title: titleId,
                enrollments: 0,
            }
        ],
    })
});

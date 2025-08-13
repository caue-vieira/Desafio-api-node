import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { courses } from "../database/schema.ts";
import { db } from "../database/client.ts";
import { z } from "zod";

export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {
    server.get("/courses", {
        schema: {
            tags: ["Courses"],
            summary: "Get all courses",
            response: {
                200: z.object({
                    courses: z.array(
                        z.object({
                            id: z.uuid(),
                            title: z.string(),
                        })
                    )
                })
            }
        }
    }, async (response, reply) => {
        const result = await db.select({
            id: courses.id,
            title: courses.title
        }).from(courses);

        return reply.status(200).send({ courses: result })
    })
}
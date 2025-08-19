import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { courses } from "../database/schema.ts";
import { db } from "../database/client.ts";
import { z } from "zod";
import { eq } from "drizzle-orm";
import { checkRequestJWT } from "./hooks/checkRequestJWT.ts";
import { getAuthenticatedUserFromRequest } from "../utils/getAUthenticatedUserFromRequest.ts";

export const getCourseByIdRoute: FastifyPluginAsyncZod = async (server) => {
    server.get("/courses/:id", {
        preHandler: [
            checkRequestJWT,
        ],
        schema: {
            tags: ["Courses"],
            summary: "Get course by ID",
            params: z.object({
                id: z.string()
            }),
            response: {
                200: z.object({
                    course: z.object({
                        id: z.uuid(),
                        title: z.string(),
                        description: z.string().nullable()
                    })
                }),
                404: z.null().describe("Course not found")
            }
        }
    }, async (request, reply) => {
        const user = getAuthenticatedUserFromRequest(request)

        const courseId = request.params.id;

        const result = await db
            .select()
            .from(courses)
            .where(eq(courses.id, courseId));

        if(result.length > 0) {
            return reply.status(200).send({ course: result[0] });
        }

        return reply.status(404).send();
    })
}
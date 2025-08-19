import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { courses, enrollments } from "../database/schema.ts";
import { db } from "../database/client.ts";
import { z } from "zod";
import { and, asc, eq, ilike, SQL } from "drizzle-orm";
import { count } from "drizzle-orm";
import { checkRequestJWT } from "./hooks/checkRequestJWT.ts";
import { checkRole } from "./hooks/checkRole.ts";

/**
 * Offset Pagination:
 * LIMIT 20 (página 4) -> OFFSET 60 ("pula" os 60 primeiros resultados)
 * 
 * Cursor-based Pagination (uso de um campo ordenável da tabela como "cursor"):
 * LIMIT 20
 * 
 * UUIDv7
*/

export const getCoursesRoute: FastifyPluginAsyncZod = async (server) => {
    server.get("/courses", {
        preHandler: [
            checkRequestJWT,
            checkRole("manager"),
        ],
        schema: {
            tags: ["Courses"],
            summary: "Get all courses",
            querystring: z.object({
                search: z.string().optional(),
                orderBy: z.enum(['id', 'title']).optional().default('id'),
                page: z.coerce.number().optional().default(1),
            }),
            response: {
                200: z.object({
                    courses: z.array(
                        z.object({
                            id: z.uuid(),
                            title: z.string(),
                            enrollments: z.number(),
                        })
                    ),
                    pages: z.number(),
                })
            }
        }
    }, async (request, reply) => {
        const { search, orderBy, page } = request.query;

        const conditions: SQL[] = []

        if(search) {
            conditions.push(ilike(courses.title, `%${search}%`))
        }

        const [result, pagesTotal] = await Promise.all([
            db.select({
                id: courses.id,
                title: courses.title,
                enrollments: count(enrollments.id)
            }).from(courses)
                .leftJoin(enrollments, eq(enrollments.courseId, courses.id))
                .orderBy(asc(courses[orderBy]))
                .offset((page - 1) * 2)
                .limit(10)
                .where(and(...conditions))
                .groupBy(courses.id),
            db.$count(courses, and(...conditions))
        ])

        return reply.status(200).send({ courses: result, pages: pagesTotal })
    })
}
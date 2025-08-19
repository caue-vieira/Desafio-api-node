import type { FastifyRequest, FastifyReply } from "fastify";
import { getAuthenticatedUserFromRequest } from "../../utils/getAUthenticatedUserFromRequest.ts";

export function checkRole(role: "student" | "manager") {
    return async function (request: FastifyRequest, reply: FastifyReply) {
        const user = getAuthenticatedUserFromRequest(request);
    
        if(user.role !== role) {
            return reply.status(401).send()
        }
    }
}
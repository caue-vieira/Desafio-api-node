import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";
import { db } from "../database/client.ts";
import jwt from "jsonwebtoken";
import { users } from "../database/schema.ts";
import { eq } from "drizzle-orm";
import { verify } from "argon2";

export const loginRoute: FastifyPluginAsyncZod = async (server) => {
    server.post("/sessions", {
        schema: {
            tags: ["Auth"],
            summary: "Login to the system",
            body: z.object({
                email: z.email(),
                password: z.string(),
            }),
            response: {
                200: z.object({ token: z.string() }),
                400: z.object({ message: z.string() }),
            }
        }
    }, async (request, reply) => {
        const { email, password } = request.body;
        
        const result = await db.select()
            .from(users)
            .where(eq(users.email, email));

        if(result.length === 0) {
            // Evitar mensagem de email ou senha, pois facilita a descoberta de qual campo está errado
            return reply.status(400).send({ message: "Credenciais inválidas" });
        }

        const user = result[0];

        // Utilizar verificação do argon pois a senha salva no banco não é 100% correspondente
        // à string gerada pelo hash, necessitando um algoritmo específico do argon2 para descriptografia correta
        const doesPasswordsMatch = await verify(user.password, password)

        if(!doesPasswordsMatch) {
            return reply.status(400).send({ message: "Credenciais inválidas" });
        }

        if(!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET must be set")
        }

        const token = jwt.sign({ sub: user.id, role: user.role }, process.env.JWT_SECRET)
        
        return reply.status(200).send({ token });
    })
}
import fastify from "fastify";
import { validatorCompiler, serializerCompiler, jsonSchemaTransform } from "fastify-type-provider-zod";
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import scalarApiReference from "@scalar/fastify-api-reference";
import { getCoursesRoute } from "./routes/getCourses.ts";
import { getCourseByIdRoute } from "./routes/getCourseById.ts";
import { createCourseRoute } from "./routes/createCourse.ts";

// Para testes não é necessário rodar a aplicação, apenas ter acesso ao server
const server = fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname',
            }
        }
    }
}).withTypeProvider<ZodTypeProvider>();

if(process.env.NODE_ENV === "development") {
    server.register(fastifySwagger, {
        openapi: {
            info: {
                title: "Desafio Node.js",
                version: "1.0.0"
            }
        },
        transform: jsonSchemaTransform
    })
    
    server.register(scalarApiReference, {
        routePrefix: "/docs",
        configuration: {
            theme: "kepler",
        }
    });   
}
server.setSerializerCompiler(serializerCompiler);
server.setValidatorCompiler(validatorCompiler);

server.register(getCoursesRoute);
server.register(getCourseByIdRoute);
server.register(createCourseRoute);

export { server };
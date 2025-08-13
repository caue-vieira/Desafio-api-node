import fastify from "fastify";
import { } from "@fastify/swagger-ui";
import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from "fastify-type-provider-zod";
import fastifySwagger from "@fastify/swagger";
import scalarApiReference from "@scalar/fastify-api-reference";
import { getCoursesRoute } from "./src/routes/getCourses.ts";
import { getCourseByIdRoute } from "./src/routes/getCourseById.ts";
import { createCourseRoute } from "./src/routes/createCourse.ts";

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

server.get("/health", () => {
    return "ok";
})

server.listen({ port: 3333 }).then(() => {
    console.log("HTTP Server Running");
});
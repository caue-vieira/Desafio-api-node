import fastify from "fastify";

const server = fastify({
    logger: true
});

server.get("/health", () => {
    return "ok";
})

server.listen({ port: 3333 });
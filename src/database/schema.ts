import { uniqueIndex } from "drizzle-orm/pg-core";
import { 
    pgTable,
    uuid,
    text,
    timestamp,
    pgEnum
} from "drizzle-orm/pg-core";
/**
 * Situação: Criar um novo campo não nulo em um banco já existente
 * Solução:
 * 1. Adicionar o novo campo como nullable
 * 2. Rodar npx drizzle-kit generate --custom (cria uma migration vazia)
 * 3. Fazer alter table na migration custom para uma senha simples padrão
 * 4. Alterar campo para notNull e gerar nova migration
 */

export const userRole = pgEnum("user_role", ["student", "manager"]);

export const users = pgTable("users", {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    email: text().notNull().unique(),
    password: text().notNull(),
    role: userRole().notNull().default("student"),
});

export const courses = pgTable("courses", {
    id: uuid().primaryKey().defaultRandom(),
    title: text().notNull().unique(),
    description: text()
});

export const enrollments = pgTable('enrollments', {
    id: uuid().primaryKey().defaultRandom(),
    userId: uuid().notNull().references(() => users.id),
    courseId: uuid().notNull().references(() => courses.id),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow(),
}, table => [
    // Impede um usuário de se cadastrar em um curso mais de uma vez
    uniqueIndex().on(table.userId, table.courseId)
])
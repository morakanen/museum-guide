/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable("Users",(table)=>{
        table.increments("id").primary()
        table.string("username", 50).notNullable().defaultTo("Username").unique();
        table.string("password",100).notNullable().defaultTo("Password");
        table.string("email",100).notNullable().defaultTo(``).unique();
        table.timestamps(true,true);
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable("Users");
  
}

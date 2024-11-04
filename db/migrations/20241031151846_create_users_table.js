/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("Users",(table)=>{
        table.increments("id")
        table.string("username",50).notNullable().defaultTo("Username");
        table.string("password",50).notNullable().defaultTo("Password");
        table.string("email",100).notNullable().defaultTo(``);
        table.timestamps(true,true);
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable("users");
  
};

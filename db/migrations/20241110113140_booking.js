/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
    return knex.schema.createTable("Booking",(table)=>{
        table.increments("id").primary()
        table.string("username").notNullable();
        table.string("event_name").notNullable();
        table.date("event_date").notNullable();
        table.integer("num_of_people").notNullable();
        
    })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
    return knex.schema.dropTable("Booking");
}

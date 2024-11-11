/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('Users').del()
  await knex('Users').insert([
    {id:"134",username:"bisded",password:"howareyou@1234",email:"helloworld@gmail.com"},
    {id:"43",username:"dogman",password:"min1234@23",email:"hiawr@yahoo.com"}
  ]);
}

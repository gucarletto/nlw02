import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('connections', table => {
    table.increments('id').primary();
    table.timestamp('created_at').defaultTo('CURRENT_TIMESTAMP').notNullable();

    table.integer('user_id')
      .notNullable()
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
    ;
  });
}

export async function down(knex: Knex) {
  knex.schema.dropTable('connections');
}
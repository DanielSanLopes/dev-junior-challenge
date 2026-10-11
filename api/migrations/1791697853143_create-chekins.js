/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
export const shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const up = (pgm) => {

    pgm.createTable('chekins', {
        id:'id',
        cpf: {type: 'varchar(11)', notNull:true},
        nome: {type: 'text', notNull: true},
        dataNascimento: {type: 'date', notNull: true},
        horaCheking: {type: 'timestamp', notNull:true, default:pgm.func('now()')}
    })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
export const down = (pgm) => {};

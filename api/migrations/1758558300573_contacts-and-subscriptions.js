module.exports.up = (pgm) => {
    pgm.createTable('contacts', {
        id: 'id',
        full_name: { type: 'varchar(255)', notNull: true },
        email: { type: 'varchar(255)', notNull: true },
        linkedin_url: { type: 'varchar(255)', notNull: false },
        message: { type: 'text', notNull: true },
        submitted_at: { type: 'timestamptz', default: pgm.func('current_timestamp') },
    });

    pgm.createTable('subscriptions', {
        id: 'id',
        email: { type: 'varchar(255)', notNull: true, unique: true },
        subscribed_at: { type: 'timestamptz', default: pgm.func('current_timestamp') },
    });
};

module.exports.down = (pgm) => {
    pgm.dropTable('contacts');
    pgm.dropTable('subscriptions');
};
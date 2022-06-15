'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Skills', {
      fields: ['jobId'],
      type: 'foreign key',
      name: 'custom_fkey_constraint_jobId',
      references: {
        table: 'Jobs',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Skills', 'custom_fkey_constraint_jobId', {})
  }
};

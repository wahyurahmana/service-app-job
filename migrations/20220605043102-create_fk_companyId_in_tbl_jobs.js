'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Jobs', {
      fields: ['companyId'],
      type: 'foreign key',
      name: 'custom_fkey_constraint_companyId',
      references: {
        table: 'Companies',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Jobs', 'custom_fkey_constraint_companyId', {})
  }
};

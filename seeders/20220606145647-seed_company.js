'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Companies', [{
      name: 'John Doe',
      companyLogo: 'https://www.logodesign.net/logo/line-art-house-roof-and-buildings-4485ld.png',
      location : 'sumbawa',
      email : 'iniEmail@mail.com',
      description : `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
      createdAt : new Date(),
      updatedAt : new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Companies', null, {
      truncate : true,
      cascade : true,
      restartIdentity : true
    });
  }
};

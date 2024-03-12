"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "jhon doe",
          email: "jhondoe23@gmail.com",
          password: "kitapastibisa",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Mikel",
          email: "mikel@gmail.com",
          password: "123456",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};

"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("blogs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      // start_Date: {
      //   type: Sequelize.DATE,
      // },
      // end_Date: {
      //   type: Sequelize.DATE,
      // },
      // nodejs: {
      //   type: Sequelize.BOOLEAN,
      // },
      // golang: {
      //   type: Sequelize.BOOLEAN,
      // },
      // react: {
      //   type: Sequelize.BOOLEAN,
      // },
      // js: {
      //   type: Sequelize.BOOLEAN,
      // },
      // diff: {
      //   type: Sequelize.TEXT,
      // },
      content: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("blogs");
  },
};

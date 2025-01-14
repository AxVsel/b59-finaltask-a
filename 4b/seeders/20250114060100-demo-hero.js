"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Heros", [
      {
        name: "Fugo pandacota",
        photo: "https://picsum.photos/id/237/200/300",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Del Mira",
        photo: "https://picsum.photos/id/237/200/300",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Heros", null, {});
  },
};

"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn("Heros", "user_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users", // Nama tabel users
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    // Menambahkan kolom type_id ke Myprojects
    await queryInterface.addColumn("Heros", "type_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "Types", // Nama tabel types
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });

    await queryInterface.addColumn("Types", "user_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "Users", // Nama tabel users
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn("Heros", "user_id");
    await queryInterface.removeColumn("Heros", "type_id");
  },
};

'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('User_Roles', {
            id: {
                allowNull: false,
                primaryKey: true,
                // type: Sequelize.UUID,
                // defaultValue: Sequelize.literal("gen_random_uuid()"),
                type: Sequelize.INTEGER,
                autoIncrement: true
            },
            userId: {
                // type: Sequelize.UUID,
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    key: "id"
                }
            },
            roleCode: {
                type: Sequelize.STRING,
                // type: Sequelize.INTEGER,
                references: {
                    model: "Roles",
                    key: "code"
                }
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('User_Roles');
    }
};
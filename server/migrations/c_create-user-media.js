'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('UserMedia', {
            id: {
                allowNull: false,
                primaryKey: true,
                // type: Sequelize.UUID,
                // defaultValue: Sequelize.literal("gen_random_uuid()"),
                type: Sequelize.INTEGER,
                autoIncrement: true
            },
            uuid: {
                // type: Sequelize.UUID,
                type: Sequelize.INTEGER,
                // allowNull: false,
                references: {
                    model: "Users",
                    key: "id"
                }
            },
            provider: {
                type: Sequelize.STRING,
                allowNull: false
            },
            link: {
                type: Sequelize.STRING,
                allowNull: false
            },
            icon: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('UserMedia');
    }
};
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Comments', {
            id: {
                allowNull: false,
                primaryKey: true,
                // type: Sequelize.UUID,
                // defaultValue: Sequelize.literal("gen_random_uuid()"),
                type: Sequelize.INTEGER,
                autoIncrement: true
            },
            text: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            propertyId: {
                // type: Sequelize.UUID,
                type: Sequelize.INTEGER,
                references: {
                    model: "Properties",
                    key: "id"
                }
            },
            parentComment: {
                // type: Sequelize.UUID,
                type: Sequelize.INTEGER,
                allowNull: false
            },
            uid: {
                // type: Sequelize.UUID,
                type: Sequelize. INTEGER,
                references: {
                    model: "Users",
                    key: "id"
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
        await queryInterface.dropTable('Comments');
    }
};
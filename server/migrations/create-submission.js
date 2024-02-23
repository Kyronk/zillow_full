'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Submissions', {
            id: {
                allowNull: false,
                primaryKey: true,
                // type: Sequelize.UUID,
                // defaultValue: Sequelize.literal("gen_random_uuid()"),
                type: Sequelize.INTEGER,
                autoIncrement: true
            },
            propertyId: {
                // type: Sequelize.UUID,
                type: Sequelize.INTEGER,
                references: {
                    model: "Properties",
                    key: "id"
                }
            },
            // uid la user id
            uid: {
                // type: Sequelize.UUID,
                type: Sequelize.INTEGER,
                references: {
                    model: "Users",
                    key: "id"
                }
            },
            message: {
                type: Sequelize.TEXT,
                allowNull: false
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
        await queryInterface.dropTable('Submissions');
    }
};
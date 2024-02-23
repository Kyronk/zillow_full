'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('PropertyFeatures', {
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
            featureId: {
                // type: Sequelize.UUID,
                type: Sequelize.INTEGER,
                references: {
                    model: "Features",
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
        await queryInterface.dropTable('PropertyFeatures');
    }
};
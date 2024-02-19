'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Properties', {
            id: {
                allowNull: false,
                primaryKey: true,
                type: Sequelize.UUID,
                defaultValue: Sequelize.literal("gen_random_uuid()"),
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            description: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            listingType: {
                type: Sequelize.ENUM(["SALE", "RENTAL"]),
                allowNull: false
            },
            price: {
                type: Sequelize.FLOAT,
                allowNull: false
            },
            PropertyTypesId: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "PropertyTypes",
                    key: "id"
                }
            },
            Owner: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id"
                }
            },
            status: {
                type: Sequelize.ENUM(["PENDING", "CANCEL", "APPROVED"]),
                // allowNull: false
                defaultValue: "PENDING"
            },
            isAvailable: {
                type: Sequelize.BOOLEAN,
                defaultValue: true
            },
            images: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            featuredImage: {
                type: Sequelize.STRING,
                allowNull: false
            },
            // người đăng của cái bài này
            postedBy: {
                type: Sequelize.UUID,
                allowNull: false,
                references: {
                    model: "Users",
                    key: "id"
                }
            },
            bedRoom: {
                type: Sequelize.INTEGER,
            },
            bathRoom: {
                type: Sequelize.INTEGER,
            },
            // đây là diện tích của ngôi nhà
            propertySize: {
                type: Sequelize.FLOAT,
            },
            // số năm đã xây dựng của ngôi nhà
            yearBuild: {
                type: Sequelize.INTEGER
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
        await queryInterface.dropTable('Properties');
    }
};
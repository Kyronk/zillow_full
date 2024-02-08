'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Property extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Property.init({
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        listingType: {
            type: DataTypes.ENUM,
            values: ["SALE", "RENTAL"]
        },
        price: DataTypes.FLOAT,
        propertyType: DataTypes.UUID,
        status: {
            type: DataTypes.ENUM,
            values: ["PENDING", "CANCEL", "APPROVED"]
        },
        isAvailable: DataTypes.BOOLEAN,

        /**
         *  # luồng hoạt động của khúc trường này
         * - đây là chỗ để lưu ảnh của sản phẩm
         *  + ở đây nếu như làm quang hệ 1 nhiều 
         *      - tức là 1 sản phẩm sẽ có nhiều ảnh 
         *      - nhưng 1 ảnh chỉ là của 1 sản phảm thôi
         * 
         *  + ở khúc này ta lưu vào array
         *      - set có tác dụng biến array khi nhập vào thành string để lưu trong ô này
         *      - get có tác dụng khi lấy ra ta lại biến dữ liệu này ngược từ string thành array để render
         *  * cách này có hơi nhiêu nhược điểm là k lưu đc số lượng ảnh lớn **
         * 
         */
        images: {
            type: DataTypes.TEXT,
            get() {
                const rawValue = this.getDataValue("images");
                return rawValue ? JSON.parse(rawValue) : [];
            },
            set(arrayImages) {
                return this.setDataValue('images', JSON.stringify(arrayImages))
            }
        },
        featuredImage: DataTypes.STRING,
        postedBy: DataTypes.UUID,
        bedRoom: DataTypes.INTEGER,
        bathRoom: DataTypes.INTEGER,
        propertySize: DataTypes.FLOAT,
        yearBuild: DataTypes.INTEGER,

    }, {
        sequelize,
        modelName: 'Property',
    });
    return Property;
};
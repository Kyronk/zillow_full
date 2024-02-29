// module.exports.roles = [
//     {
//         code: "ROL1",
//         value: "Admin",
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     },
//     {
//         code: "ROL3",
//         value: "Owner",
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }, 
//     {
//         code: "ROL5",
//         value: "Agent",
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     },
//     {
//         code: "ROL7",
//         value: "Customer",
//         createdAt: new Date(),
//         updatedAt: new Date(),
//     }
// ]    

const { faker } = require("@faker-js/faker");
const bcrypt = require("bcrypt");
const listingTypes = ["SALE", "RENTAL"];

const hashPassword = pwd => bcrypt.hashSync(pwd, bcrypt.genSaltSync(10))

module.exports = {
    roles: [
        {
            code: "ROL1",
            value: "Admin",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            code: "ROL3",
            value: "Owner",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            code: "ROL5",
            value: "Agent",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            code: "ROL7",
            value: "Customer",
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ],


    // table
    users: Array.from([...Array(10).keys()]).map(() => ({
        name: faker.person.fullName(),
        phone: "0" + faker.string.numeric(9),
        email: faker.internet.email({ provider: "gmail.com", allowSpecialCharacters: false }),
        address: faker.location.streetAddress({ useFullAddress: true }),
        password: hashPassword("123456"),
        avatar: faker.image.avatar(),
        createdAt: new Date(),
        updatedAt: new Date(),
    })),


    //  table
    user_roles: [...Array.from([...Array(10).keys()]).map((el) => ({
        userId: el + 1,
        roleCode: "ROL7",
        createdAt: new Date(),
        updatedAt: new Date(),
    })), {
        userId: 8,
        roleCode: "ROL5",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        userId: 9,
        roleCode: "ROL3",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        userId: 10,
        roleCode: "ROL1",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    {
        userId: 7,
        roleCode: "ROL3",
        createdAt: new Date(),
        updatedAt: new Date(),
    },
    ],

    // table property-type
    property_type: [
        {
            name: "House",
            image: faker.image.urlLoremFlickr({ width: 1000, height: 500, category: "house" }),
            description: faker.lorem.sentence({ min: 2, max: 3 }),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: "Apartment",
            image: faker.image.urlLoremFlickr({ width: 1000, height: 500, category: "apartment" }),
            description: faker.lorem.sentence({ min: 2, max: 3 }),
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: "Townhouse",
            image: faker.image.urlLoremFlickr({ width: 1000, height: 500, category: "townhouse" }),
            description: faker.lorem.sentence({ min: 2, max: 3 }),
            createdAt: new Date(),
            updatedAt: new Date(),
        },

    ],


    // table properties
    properties: Array.from([...Array(60).keys()]).map(() => ({
        name: faker.lorem.sentence({ max: 10, min: 5 }).replace(",", " "),
        description: faker.lorem.sentence({ min: 5, max: 10 }), 
        listingType: faker.helpers.arrayElement(["SALE", "RENTAL"]),
        price: faker.number.int({ max: 1000000, min: 1000 }),
        // propertyTypeId: faker.number.int({ max: 3, min: 1}),
        PropertyTypesId: faker.number.int({max: 3, min: 1}),

        // this thread các user có role admin agent với owner thì mới tạo được
        // property
        // client, customer thì chỉ xem được thôi
        Owner: faker.helpers.arrayElement([7, 9]),
        status: "PENDING",
        isAvailable: true,
        featuredImage: faker.image.urlLoremFlickr({ category: "realestate" }),
        address: faker.location.streetAddress({useFullAddress: true}),
        images: JSON.stringify(Array.from([
            ...Array(faker.number.int({ max: 7, min: 5 })).keys()
        ]).map(() => 
            `${faker.image.urlLoremFlickr({
                category: "realestate", 
            })}?random=${faker.string.numeric(30)}`
        )),
        postedBy: faker.helpers.arrayElement([7,9,8]),
        bedRoom: faker.number.int({ min: 1, max: 3}),
        bathRoom: faker.number.int({ min: 1, max: 3}),
        propertySize: faker.number.int({ min: 60, max: 200}),
        yearBuild: faker.number.int({ min: 1990, max: 2024}),
        createdAt: new Date(),
        updatedAt: new Date(),

    })),


    // table features
    features: [
        {
            name: "Air Conditioning",
            image: faker.image.urlLoremFlickr({ category: "airConditioning"}),
            createdAt: new Date(),
            updatedAt: new Date(),
        }, 
        {
            name: "Furnace",
            image: faker.image.urlLoremFlickr({ category: "furnace"}),
            createdAt: new Date(),
            updatedAt: new Date(),
        }, 
        {
            name: "Pool",
            image: faker.image.urlLoremFlickr({ category: "pool"}),
            createdAt: new Date(),
            updatedAt: new Date(),
        }, 
        {
            name: "Garage",
            image: faker.image.urlLoremFlickr({ category: "Garage"}),
            createdAt: new Date(),
            updatedAt: new Date(),
        }, 
    ],

    // table property_features
    property_features: Array.from([...Array(60).keys()]).map((el) => ({
        propertyId: el + 1,
        featureId: faker.number.int({max: 4, min: 1}),
        createdAt: new Date(),
        updatedAt: new Date(),
    }))
}

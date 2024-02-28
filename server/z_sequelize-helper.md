# Tạo migration
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

npx sequelize-cli db:migrate

# tạo file seeders
npx sequelize-cli seed:generate --name demo-user

 -- tạo data từ file seeders : npx sequelize db:seed --seed namefile in folder seeders .js
 -- tạo tất cả : npx sequelize-cli db:seed:all
 -- undo :  npx sequelize-cli db:seed:undo --seed name-of-seed-as-in-data .js
 -- undo all : npx sequelize-cli db:seed:undo:all

 -- 

# Table:
Property
PropertyFeature
UserMedia
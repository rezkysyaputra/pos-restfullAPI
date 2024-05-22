// import bcrypt from 'bcrypt';
// import fs from 'fs';
// import path from 'path';
// import prisma from '../app/database.js';

// const removeTestUser = async () => {
//   await prisma.user.deleteMany({});
// };
// const createTestUser = async () => {
//   await prisma.user.create({
//     data: {
//       username: 'test',
//       full_name: 'test',
//       role: 'ADMIN',
//       email: 'test@gmail.com',
//       password: await bcrypt.hash('rahasia', 10),
//     },
//   });
// };

// const createAllTestUser = async () => {
//   await prisma.user.createMany({
//     data: [
//       {
//         username: 'admin',
//         full_name: 'test',
//         role: 'ADMIN',
//         email: 'test@gmail.com',
//         password: await bcrypt.hash('rahasia', 10),
//       },
//       {
//         username: 'cashier',
//         full_name: 'test',
//         role: 'CASHIER',
//         email: 'cashier@gmail.com',
//         password: await bcrypt.hash('rahasia', 10),
//       },
//     ],
//   });
// };

// const deleteAllTestCategory = async () => {
//   await prisma.category.deleteMany({});
// };

// const createManyTestCategory = async () => {
//   const values = [];
//   for (let i = 0; i < 20; i += 1) {
//     values.push({ name: `category${i}` });
//   }
//   await prisma.category.createMany({
//     data: values,
//   });
// };

// const getTestCategory = async () => {
//   const category = await prisma.category.findFirst({});
//   return category;
// };

// const deleteAllTestImage = () => {
//   const folderPath = 'assets/image';
//   fs.readdir(folderPath, (err, files) => {
//     files.forEach((file) => {
//       const filePath = path.join(folderPath, file);

//       fs.unlink(filePath, () => {});
//     });
//   });
// };

// const deleteAllTestProducts = async () => {
//   await prisma.product.deleteMany({});
// };

// export {
//   removeTestUser,
//   createTestUser,
//   deleteAllTestCategory,
//   createAllTestUser,
//   createManyTestCategory,
//   getTestCategory,
//   deleteAllTestImage,
//   deleteAllTestProducts,
// };

// import supertest from 'supertest';
// import path from 'path';
// import {
//   createAllTestUser,
//   createManyTestCategory,
//   deleteAllTestCategory,
//   deleteAllTestImage,
//   deleteAllTestProducts,
//   getTestCategory,
//   removeTestUser,
// } from './test-util.js';
// import web from '../app/web.js';

// describe('POST /products', () => {
//   beforeEach(async () => {
//     await createAllTestUser();
//     await createManyTestCategory();
//   });
//   afterEach(async () => {
//     deleteAllTestImage();
//     await deleteAllTestProducts();
//     await deleteAllTestCategory();
//     await removeTestUser();
//   });

//   it('admin should can create a new product', async () => {
//     const user = await supertest(web).post('/login').send({
//       username: 'admin',
//       password: 'rahasia',
//     });

//     const testCategory = await getTestCategory();

//     const postImage = path.resolve(__dirname, './image/a.png');

//     const result = await supertest(web)
//       .post('/products')
//       .set('Authorization', `Bearer ${user.body.token}`)
//       .attach('image', postImage)
//       .field('sku', 123)
//       .field('name', 'buku')
//       .field('stock', 11)
//       .field('price', 20000)
//       .field('category_id', testCategory.id);

//     expect(result.status).toBe(200);
//     expect(result.body.message).toBe('success');
//     expect(result.body.data.sku).toBe(123);
//     expect(result.body.data.name).toBe('buku');
//     expect(result.body.data.stock).toBe(11);
//     expect(result.body.data.price).toBe(20000);
//     expect(result.body.data.image).toBeDefined();
//     expect(result.body.data.created_at).toBeDefined();
//     expect(result.body.data.updated_at).toBeDefined();
//     expect(result.body.data.category).toBeDefined();
//   });

//   it('admin should can reject if request is invalid', async () => {
//     const user = await supertest(web).post('/login').send({
//       username: 'admin',
//       password: 'rahasia',
//     });

//     const testCategory = await getTestCategory();

//     const postImage = path.resolve(__dirname, './image/a.png');

//     const result = await supertest(web)
//       .post('/products')
//       .set('Authorization', `Bearer ${user.body.token}`)
//       .attach('image', postImage)
//       .field('sku', 123)
//       .field('stock', 11)
//       .field('category_id', testCategory.id);

//     expect(result.status).toBe(400);
//     expect(result.body.errors).toBeDefined();
//   });

//   it('admin should can reject if image file format is invalid', async () => {
//     const user = await supertest(web).post('/login').send({
//       username: 'admin',
//       password: 'rahasia',
//     });

//     const testCategory = await getTestCategory();

//     const postImage = path.resolve(__dirname, './image/false.webp');

//     const result = await supertest(web)
//       .post('/products')
//       .set('Authorization', `Bearer ${user.body.token}`)
//       .attach('image', postImage)
//       .field('sku', 123)
//       .field('stock', 11)
//       .field('category_id', testCategory.id);

//     expect(result.status).toBe(400);
//     expect(result.body.errors).toBeDefined();
//   });

//   it('should can reject if user role is not admin', async () => {
//     const user = await supertest(web).post('/login').send({
//       username: 'cashier',
//       password: 'rahasia',
//     });

//     const testCategory = await getTestCategory();

//     const postImage = path.resolve(__dirname, './image/a.png');

//     const result = await supertest(web)
//       .post('/products')
//       .set('Authorization', `Bearer ${user.body.token}`)
//       .attach('image', postImage)
//       .field('sku', 123)
//       .field('name', 'buku')
//       .field('stock', 11)
//       .field('price', 20000)
//       .field('category_id', testCategory.id);

//     expect(result.status).toBe(403);
//     expect(result.body.errors).toBeDefined();
//   });
// });

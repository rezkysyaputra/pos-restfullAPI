import supertest from 'supertest';
import {
  createAllTestUser,
  createManyTestCategory,
  deleteAllTestCategory,
  getTestCategory,
  removeTestUser,
} from './test-util.js';
import web from '../app/web.js';

describe('POST /categories', () => {
  beforeEach(async () => {
    await createAllTestUser();
  });
  afterEach(async () => {
    await removeTestUser();
    await deleteAllTestCategory();
  });
  it('admin should can create a new category', async () => {
    const user = await supertest(web).post('/login').send({
      username: 'admin',
      password: 'rahasia',
    });

    const result = await supertest(web)
      .post('/categories')
      .set('Authorization', `Bearer ${user.body.token}`)
      .send({
        name: 'shoes',
      });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('success');
    expect(result.body.data.name).toBe('shoes');
  });

  it('admin should can reject if request invalid', async () => {
    const user = await supertest(web).post('/login').send({
      username: 'admin',
      password: 'rahasia',
    });

    const result = await supertest(web)
      .post('/categories')
      .set('Authorization', `Bearer ${user.body.token}`)
      .send({
        sepatu: 'shoes',
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('admin should can reject if user role not admin', async () => {
    const user = await supertest(web).post('/login').send({
      username: 'cashier',
      password: 'rahasia',
    });

    const result = await supertest(web)
      .post('/categories')
      .set('Authorization', `Bearer ${user.body.token}`)
      .send({
        sepatu: 'shoes',
      });

    expect(result.status).toBe(403);
    expect(result.body.errors).toBeDefined();
  });

  it('admin should can reject if token invalid', async () => {
    const result = await supertest(web)
      .post('/categories')
      .set('Authorization', 'Bearer salah')
      .send({
        sepatu: 'shoes',
      });

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe('GET /categories', () => {
  beforeEach(async () => {
    await createAllTestUser();
    await createManyTestCategory();
  });
  afterEach(async () => {
    await deleteAllTestCategory();
    await removeTestUser();
  });

  it('admin should can get list of categories without query params', async () => {
    const user = await supertest(web).post('/login').send({
      username: 'admin',
      password: 'rahasia',
    });

    const result = await supertest(web)
      .get('/categories')
      .set('Authorization', `Bearer ${user.body.token}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('success');
    expect(result.body.data.length).toBe(10);
    expect(result.body.paging.page).toBe(1);
    expect(result.body.paging.size).toBe(10);
  });

  it('admin should can get list of categories with paging', async () => {
    const user = await supertest(web).post('/login').send({
      username: 'admin',
      password: 'rahasia',
    });

    const result = await supertest(web)
      .get('/categories?page=2&size=4')
      .set('Authorization', `Bearer ${user.body.token}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('success');
    expect(result.body.data.length).toBe(4);
    expect(result.body.paging.page).toBe(2);
    expect(result.body.paging.size).toBe(4);
  });

  it('admin should can get list of categories with searching', async () => {
    const user = await supertest(web).post('/login').send({
      username: 'admin',
      password: 'rahasia',
    });

    const result = await supertest(web)
      .get('/categories?name=a')
      .set('Authorization', `Bearer ${user.body.token}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('success');
    expect(result.body.data).toBeDefined();
    expect(result.body.paging).toBeDefined();
  });

  it('admin should can get list of categories with searching and paging', async () => {
    const user = await supertest(web).post('/login').send({
      username: 'cashier',
      password: 'rahasia',
    });

    const result = await supertest(web)
      .get('/categories?name=a&size=3&page=2')
      .set('Authorization', `Bearer ${user.body.token}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('success');
    expect(result.body.data).toBeDefined();
    expect(result.body.paging).toBeDefined();
  });

  it('admin should can reject if searching categories by name not found', async () => {
    const user = await supertest(web).post('/login').send({
      username: 'admin',
      password: 'rahasia',
    });

    const result = await supertest(web)
      .get('/categories?name=z')
      .set('Authorization', `Bearer ${user.body.token}`);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });

  it('admin should can reject if paging is not found', async () => {
    const user = await supertest(web).post('/login').send({
      username: 'cashier',
      password: 'rahasia',
    });

    const result = await supertest(web)
      .get('/categories?page=5&size9')
      .set('Authorization', `Bearer ${user.body.token}`);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe('GET /categories/:categoryId', () => {
  beforeEach(async () => {
    await createAllTestUser();
    await createManyTestCategory();
  });
  afterEach(async () => {
    await deleteAllTestCategory();
    await removeTestUser();
  });

  it('admin should can get category by id ', async () => {
    const user = await supertest(web).post('/login').send({
      username: 'admin',
      password: 'rahasia',
    });

    const testCategory = await getTestCategory();

    const result = await supertest(web)
      .get(`/categories/${testCategory.id}`)
      .set('Authorization', `Bearer ${user.body.token}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('success');
    expect(result.body.data.name).toBe('category0');
  });

  it('admin should can reject if category not found', async () => {
    const user = await supertest(web).post('/login').send({
      username: 'admin',
      password: 'rahasia',
    });

    const result = await supertest(web)
      .get('/categories/7')
      .set('Authorization', `Bearer ${user.body.token}`);

    console.log(result.body);

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });

  it('admin should can reject if category id format wrong', async () => {
    const user = await supertest(web).post('/login').send({
      username: 'admin',
      password: 'rahasia',
    });

    const result = await supertest(web)
      .get('/categories/bag')
      .set('Authorization', `Bearer ${user.body.token}`);

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe('PATCH /categories/:categoryId', () => {
  beforeEach(async () => {
    await createAllTestUser();
    await createManyTestCategory();
  });
  afterEach(async () => {
    await deleteAllTestCategory();
    await removeTestUser();
  });

  it('admin should can update a category', async () => {
    const user = await supertest(web).post('/login').send({
      username: 'admin',
      password: 'rahasia',
    });

    const testCategory = await getTestCategory();

    const result = await supertest(web)
      .patch(`/categories/${testCategory.id}`)
      .set('Authorization', `Bearer ${user.body.token}`)
      .send({
        name: 'new category',
      });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('success');
    expect(result.body.data.name).toBe('new category');
  });

  it('admin should can reject if request is invalid', async () => {
    const user = await supertest(web).post('/login').send({
      username: 'admin',
      password: 'rahasia',
    });

    const testCategory = await getTestCategory();

    const result = await supertest(web)
      .patch(`/categories/${testCategory.id}`)
      .set('Authorization', `Bearer ${user.body.token}`)
      .send({
        wrong: 'new category',
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('admin should can reject if user role not admin', async () => {
    const user = await supertest(web).post('/login').send({
      username: 'cashier',
      password: 'rahasia',
    });

    const testCategory = await getTestCategory();

    const result = await supertest(web)
      .patch(`/categories/${testCategory.id}`)
      .set('Authorization', `Bearer ${user.body.token}`)
      .send({
        name: 'new category',
      });

    expect(result.status).toBe(403);
    expect(result.body.errors).toBeDefined();
  });

  it('admin should can reject if category id not found', async () => {
    const user = await supertest(web).post('/login').send({
      username: 'admin',
      password: 'rahasia',
    });

    const testCategory = await getTestCategory();

    const result = await supertest(web)
      .patch(`/categories/${testCategory.id - 1}`)
      .set('Authorization', `Bearer ${user.body.token}`)
      .send({
        name: 'new category',
      });

    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

describe('DELETE /categories/:categoryId', () => {
  beforeEach(async () => {
    await createAllTestUser();
    await createManyTestCategory();
  });
  afterEach(async () => {
    await deleteAllTestCategory();
    await removeTestUser();
  });

  it('admin should can delete a category', async () => {
    const user = await supertest(web).post('/login').send({
      username: 'admin',
      password: 'rahasia',
    });

    const testCategory = await getTestCategory();

    const result = await supertest(web)
      .delete(`/categories/${testCategory.id}`)
      .set('Authorization', `Bearer ${user.body.token}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('success');
  });

  it('admin should can reject if category id not found', async () => {
    const user = await supertest(web).post('/login').send({
      username: 'admin',
      password: 'rahasia',
    });

    const testCategory = await getTestCategory();

    const result = await supertest(web)
      .delete(`/categories/${testCategory.id - 1}`)
      .set('Authorization', `Bearer ${user.body.token}`);
    expect(result.status).toBe(404);
    expect(result.body.errors).toBeDefined();
  });
});

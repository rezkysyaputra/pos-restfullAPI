import supertest from 'supertest';
import web from '../app/web.js';
import { createTestUser, removeTestUser } from './test-util.js';

describe('POST /register', () => {
  afterEach(async () => {
    await removeTestUser();
  });
  it('should can register new user', async () => {
    const result = await supertest(web).post('/register').send({
      username: 'test',
      full_name: 'test',
      role: 'CASHIER',
      email: 'test@gmail.com',
      password: 'rahasia',
    });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('success');
  });
  it('should can reject if request invalid', async () => {
    const result = await supertest(web).post('/register').send({
      username: '',
      full_name: '',
      role: 'CASHIER',
      email: 'test@gmail.com',
      password: 'rahasia',
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('should can reject if username already exists', async () => {
    let result = await supertest(web).post('/register').send({
      username: 'test',
      full_name: 'test',
      role: 'CASHIER',
      email: 'test@gmail.com',
      password: 'rahasia',
    });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('success');
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.full_name).toBe('test');
    expect(result.body.data.role).toBe('CASHIER');
    expect(result.body.data.email).toBe('test@gmail.com');
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(web).post('/register').send({
      username: 'test',
      full_name: 'test',
      role: 'CASHIER',
      email: 'test@gmail.com',
      password: 'rahasia',
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('should can reject if email already exists', async () => {
    let result = await supertest(web).post('/register').send({
      username: 'test',
      full_name: 'test',
      role: 'CASHIER',
      email: 'test@gmail.com',
      password: 'rahasia',
    });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('success');
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.full_name).toBe('test');
    expect(result.body.data.role).toBe('CASHIER');
    expect(result.body.data.email).toBe('test@gmail.com');
    expect(result.body.data.password).toBeUndefined();

    result = await supertest(web).post('/register').send({
      username: 'test2',
      full_name: 'test',
      role: 'ADMIN',
      email: 'test@gmail.com',
      password: 'rahasia',
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe('POST /login', () => {
  beforeEach(async () => {
    await createTestUser();
  });
  afterEach(async () => {
    await removeTestUser();
  });

  it('should can login ', async () => {
    const result = await supertest(web).post('/login').send({
      username: 'test',
      password: 'rahasia',
    });

    expect(result.status).toBe(200);
    expect(result.body.token).toBeDefined();
  });

  it('should can reject if request invalid', async () => {
    const result = await supertest(web).post('/login').send({
      username: '',
      password: '',
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('should can reject if username wrong', async () => {
    const result = await supertest(web).post('/login').send({
      username: 'salah',
      password: 'rahasia',
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('should can reject if username wrong', async () => {
    const result = await supertest(web).post('/login').send({
      username: 'test',
      password: 'salah',
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});

describe('GET /users', () => {
  beforeEach(async () => {
    await createTestUser();
  });
  afterEach(async () => {
    await removeTestUser();
  });

  it('should can get current user', async () => {
    const user = await supertest(web).post('/login').send({
      username: 'test',
      password: 'rahasia',
    });

    const result = await supertest(web)
      .get('/users')
      .set('Authorization', `Bearer ${user.body.token}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('success');
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.full_name).toBe('test');
    expect(result.body.data.role).toBe('ADMIN');
    expect(result.body.data.email).toBe('test@gmail.com');
    expect(result.body.data.password).toBeUndefined();
  });

  it('should can reject if token is invalid', async () => {
    const result = await supertest(web)
      .get('/users')
      .set('Authorization', 'Bearer wrong-token');

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it('should can reject if token is null', async () => {
    const result = await supertest(web).get('/users');

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe('PATCH /user', () => {
  beforeEach(async () => {
    await createTestUser();
  });
  afterEach(async () => {
    await removeTestUser();
  });

  it('should can update current user', async () => {
    const user = await supertest(web).post('/login').send({
      username: 'test',
      password: 'rahasia',
    });

    const result = await supertest(web)
      .patch('/users')
      .set('Authorization', `Bearer ${user.body.token}`)
      .send({
        full_name: 'test-update',
        role: 'ADMIN',
        email: 'test-update@gmail.com',
        password: 'rahasia-update',
      });

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('success');
    expect(result.body.data.username).toBe('test');
    expect(result.body.data.full_name).toBe('test-update');
    expect(result.body.data.role).toBe('ADMIN');
    expect(result.body.data.email).toBe('test-update@gmail.com');
    expect(result.body.data.password).toBeUndefined();
  });

  it('should can reject if request invalid', async () => {
    const user = await supertest(web).post('/login').send({
      username: 'test',
      password: 'rahasia',
    });

    const result = await supertest(web)
      .patch('/users')
      .set('Authorization', `Bearer ${user.body.token}`)
      .send({
        full_name: '',
        role: '',
        email: '',
        password: '',
      });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });

  it('should can reject if token invalid', async () => {
    const result = await supertest(web)
      .patch('/users')
      .set('Authorization', 'Bearer salah')
      .send({
        full_name: '',
        role: '',
        email: '',
        password: '',
      });

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it('should can reject if token null', async () => {
    const result = await supertest(web).patch('/users').send({
      full_name: '',
      role: '',
      email: '',
      password: '',
    });

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

describe('DELETE /logout', () => {
  beforeEach(async () => {
    await createTestUser();
  });
  afterEach(async () => {
    await removeTestUser();
  });

  it('should can delete current user', async () => {
    const user = await supertest(web).post('/login').send({
      username: 'test',
      password: 'rahasia',
    });

    const result = await supertest(web)
      .delete('/logout')
      .set('Authorization', `Bearer ${user.body.token}`);

    expect(result.status).toBe(200);
    expect(result.body.message).toBe('success');
  });

  it('should can reject if token is invalid', async () => {
    const result = await supertest(web)
      .delete('/logout')
      .set('Authorization', 'Bearer wrong-token');

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });

  it('should can reject if token is null', async () => {
    const result = await supertest(web).delete('/logout');

    expect(result.status).toBe(401);
    expect(result.body.errors).toBeDefined();
  });
});

import { TestServer } from "./testSetup";
import userRoutes from '../routes/user.routes';
import noteRoutes from '../routes/note.routes';
import User from '../models/user.model';
import Role from '../models/role.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || '';
const server = new TestServer();

// --- Mount all routes once ---
server.app.use('/users', userRoutes);
server.app.use('/notes', noteRoutes);

let adminToken: string;
let studentToken: string;
let noteId: string;

beforeAll(async () => {
  await server.start(); // Start MongoDB once

  // --- Admin user ---
  const hash = await bcrypt.hash('admin1234', 10);

  let adminRole = await Role.findOne({ role: 'ADMIN' });
  if (!adminRole) {
    adminRole = await Role.create({ role: 'ADMIN', active: true });
  }

  const adminUser = await User.create({
    username: "admin",
    password: hash,
    firstname: "testUser",
    lastname: "testUser",
    email: "testUser@aueb.gr",
    roles: [adminRole._id] 
  });

  const adminPayload = {
    id: adminUser._id.toString(),
    username: adminUser.username,
    roles: [{ role: adminRole.role, active: adminRole.active }]
  };
  adminToken = jwt.sign(adminPayload, JWT_SECRET, { expiresIn: '1h' });

  // --- Student user ---
  const studentHash = await bcrypt.hash('student123', 10);
  const studentUser = await User.create({
    username: 'student',
    password: studentHash,
    firstname: 'Student',
    lastname: 'Test',
    email: 'student@test.com',
  });
  const studentPayload = { id: studentUser._id.toString(), username: studentUser.username };
  studentToken = jwt.sign(studentPayload, JWT_SECRET, { expiresIn: '1h' });
});

afterAll(async () => {
  await server.stop(); // Stop MongoDB once
});

// ---------------- User API tests ----------------
describe('User API Tests', () => {

  test('GET /users -> returns list of users', async()=> {
    const res = await server.request.get('/users').set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200); // <- use 200, not 201
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /users -> creates new user', async()=> {
    const res = await server.request.post('/users')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({username: "newuser", password:"123456"});
    
    expect(res.status).toBe(201);
    expect(res.body.username).toBe('newuser');
  });
});

// ---------------- Notes API tests ----------------
describe('Notes API Tests', () => {

  test('POST /notes -> creates a note', async () => {
    const res = await server.request
      .post('/notes')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ title: 'Test Note', content: 'This is a test note.' });
    
    expect(res.status).toBe(201);
    noteId = res.body._id;
  });

  test('GET /notes -> lists notes', async () => {
    const res = await server.request
      .get('/notes')
      .set('Authorization', `Bearer ${studentToken}`);
    
    expect(res.status).toBe(200);
    expect(res.body.find((n: any) => n._id === noteId)).toBeDefined();
  });

  test('PUT /notes/:id -> updates a note', async () => {
    const res = await server.request
      .put(`/notes/${noteId}`)
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ content: 'Updated content' });

    expect(res.status).toBe(200);
    expect(res.body.content).toBe('Updated content');
  });

  test('DELETE /notes/:id -> deletes a note', async () => {
    const res = await server.request
      .delete(`/notes/${noteId}`)
      .set('Authorization', `Bearer ${studentToken}`);
    
    expect(res.status).toBe(200);
  });
});

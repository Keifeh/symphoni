// prisma/seeds/user.seed.ts

import type { PrismaClient } from '../../app/generated/prisma';
import bcrypt from 'bcryptjs';

// The function now accepts a prisma client instance and is typed to return a Promise
// that resolves to an array of User objects.
export async function seedUsers(prisma: PrismaClient) {
  console.log('Seeding users...');
  
  const userData = [
    { username: 'admin', email: 'admin@symphoni.home', firstName: 'Admin', lastName: 'User', password: 'password123', role: 'ADMIN' as const },
    { username: 'keith', email: 'keith@symphoni.home', firstName: 'Keith', lastName: 'Hughes', password: 'password123', role: 'USER' as const },
    { username: 'testuser1', email: 'testuser1@symphoni.home', firstName: 'Alice', lastName: 'Smith', password: 'password123', role: 'USER' as const },
    { username: 'testuser2', email: 'testuser2@symphoni.home', firstName: 'Bob', lastName: 'Johnson', password: 'password123', role: 'USER' as const },
    { username: 'testuser3', email: 'testuser3@symphoni.home', firstName: 'Charlie', lastName: 'Brown', password: 'password123', role: 'USER' as const },
    { username: 'testuser4', email: 'testuser4@symphoni.home', firstName: 'Diana', lastName: 'Prince', password: 'password123', role: 'USER' as const },
    { username: 'testuser5', email: 'testuser5@symphoni.home', firstName: 'Ethan', lastName: 'Hunt', password: 'password123', role: 'USER' as const },
    { username: 'testuser6', email: 'testuser6@symphoni.home', firstName: 'Fiona', lastName: 'Glenanne', password: 'password123', role: 'USER' as const },
    { username: 'testuser7', email: 'testuser7@symphoni.home', firstName: 'George', lastName: 'Costanza', password: 'password123', role: 'USER' as const },
    { username: 'testuser8', email: 'testuser8@symphoni.home', firstName: 'Hannah', lastName: 'Montana', password: 'password123', role: 'USER' as const },
    { username: 'testuser9', email: 'testuser9@symphoni.home', firstName: 'Ian', lastName: 'Malcolm', password: 'password123', role: 'USER' as const },
    { username: 'testuser10', email: 'testuser10@symphoni.home', firstName: 'Jane', lastName: 'Doe', password: 'password123', role: 'USER' as const },
    { username: 'testuser11', email: 'testuser11@symphoni.home', firstName: 'Kyle', lastName: 'Reese', password: 'password123', role: 'USER' as const },
    { username: 'testuser12', email: 'testuser12@symphoni.home', firstName: 'Laura', lastName: 'Palmer', password: 'password123', role: 'USER' as const },
    { username: 'testuser13', email: 'testuser13@symphoni.home', firstName: 'Michael', lastName: 'Scott', password: 'password123', role: 'USER' as const },
    { username: 'testuser14', email: 'testuser14@symphoni.home', firstName: 'Nancy', lastName: 'Drew', password: 'password123', role: 'USER' as const },
    { username: 'testuser15', email: 'testuser15@symphoni.home', firstName: 'Oscar', lastName: 'Martinez', password: 'password123', role: 'USER' as const },
    { username: 'testuser16', email: 'testuser16@symphoni.home', firstName: 'Pam', lastName: 'Beesly', password: 'password123', role: 'USER' as const },
    { username: 'testuser17', email: 'testuser17@symphoni.home', firstName: 'Quentin', lastName: 'Tarantino', password: 'password123', role: 'USER' as const },
    { username: 'testuser18', email: 'testuser18@symphoni.home', firstName: 'Rachel', lastName: 'Green', password: 'password123', role: 'USER' as const },
    { username: 'testuser19', email: 'testuser19@symphoni.home', firstName: 'Steve', lastName: 'Rogers', password: 'password123', role: 'USER' as const },
    { username: 'testuser20', email: 'testuser20@symphoni.home', firstName: 'Tony', lastName: 'Stark', password: 'password123', role: 'USER' as const },
    { username: 'testuser21', email: 'testuser21@symphoni.home', firstName: 'Ursula', lastName: 'Le Guin', password: 'password123', role: 'USER' as const },
    { username: 'testuser22', email: 'testuser22@symphoni.home', firstName: 'Victor', lastName: 'Frankenstein', password: 'password123', role: 'USER' as const },
    { username: 'testuser23', email: 'testuser23@symphoni.home', firstName: 'Walter', lastName: 'White', password: 'password123', role: 'USER' as const },
    { username: 'testuser24', email: 'testuser24@symphoni.home', firstName: 'Xavier', lastName: 'Riddle', password: 'password123', role: 'USER' as const },
    { username: 'testuser25', email: 'testuser25@symphoni.home', firstName: 'Yara', lastName: 'Greyjoy', password: 'password123', role: 'USER' as const },
    { username: 'testuser26', email: 'testuser26@symphoni.home', firstName: 'Zelda', lastName: 'Fitzgerald', password: 'password123', role: 'USER' as const },
    { username: 'testuser27', email: 'testuser27@symphoni.home', firstName: 'Arthur', lastName: 'Dent', password: 'password123', role: 'USER' as const },
    { username: 'testuser28', email: 'testuser28@symphoni.home', firstName: 'Bruce', lastName: 'Wayne', password: 'password123', role: 'USER' as const },
  ];

    // We'll collect all the created users into this array
    const createdUsers = [];

    for (const u of userData) {
      const hashedPassword = await bcrypt.hash(u.password, 10);
      const user = await prisma.user.upsert({
        where: { email: u.email },
        update: {},
        create: {
          username: u.username,
          email: u.email,
          firstName: u.firstName,
          lastName: u.lastName,
          password: hashedPassword,
          role: u.role,
        },
      });
      createdUsers.push(user);
    }
    
    console.log('Users seeded.');
    
    // The crucial fix: we return the array of users we just created.
    return createdUsers;
  }
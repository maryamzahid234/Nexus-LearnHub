# Walkthrough

This file walks you through running the project, seeding demo data, and testing the main flows.

## 1. Start MongoDB

Make sure your MongoDB server is running locally on:

`mongodb://127.0.0.1:27017/mern-learning-platform`

If you use MongoDB Atlas, update `server/.env` with your connection string first.

## 2. Install dependencies

From the project root:

```bash
npm install
```

## 3. Seed demo data

Run:

```bash
npm run seed:demo --workspace server
```

This creates or reuses:

- Admin account
- 3 student accounts
- 3 courses
- Sample enrollments

## 4. Demo login credentials

Admin account:

- Email: `admin@learnhub.com`
- Password: `Admin123!`

Student account:

- Email: `ayesha@student.learnhub.com`
- Password: `Student123!`

## 5. Run the app

From the project root:

```bash
npm run dev
```

Open:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## 6. Admin walkthrough

1. Log in with the admin account.
2. Open the dashboard to see high-level counts for students, courses, and enrollments.
3. Go to `Students` to:
   - review seeded student records
   - create a new student
   - edit department, phone, and status
   - delete a student
4. Go to `Courses` to:
   - review the demo courses
   - add a new course
   - edit course details
   - delete a course
5. Go to `Enrollments` to:
   - assign students to courses
   - view all existing enrollments
   - remove an enrollment

## 7. Student walkthrough

1. Log out from the admin account.
2. Log in with the seeded student account.
3. Open `Courses` to browse the available course cards.
4. Click `Enroll` on a course not already assigned.
5. Open `My Enrollments` to confirm the course appears there.
6. Remove an enrollment with the `Unenroll` action if needed.

## 8. Useful notes

- Public registration creates student accounts only.
- Admin accounts are intended to come from seeding, not the public register form.
- The demo seed script is idempotent, so you can run it again without creating duplicate enrollments.

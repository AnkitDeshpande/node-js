# Social media Application

This is a Node.js-based Social media application built with Express, Sequelize, and TypeScript. Follow the instructions below to set up, run, and interact with the application.

---

## **Prerequisites**
Before starting, ensure you have the following installed on your system:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MySQL** (or any other database supported by Sequelize)
- **Git** (optional, for cloning the repository)

---

## **Setup Instructions**

### 1. Clone the Repository
If you haven't already cloned the repository, run:
```bash
git clone https://github.com/AnkitDeshpande/node-js.git
cd Social media application
```

### 2. Install Dependencies
Install the required dependencies using npm or yarn:
```bash
npm install  
```

### 3. Configure Environment Variables
Create a ```.env``` file

 file in the root directory and add the following variables:
```properties
DB_USERNAME=<your-database-username>
DB_PASSWORD=<your-database-password>
DB_NAME=<your-database-name>
DB_HOST=127.0.0.1
```

For production, create a ```.env.production``` file with the appropriate values.

### 4. Set Up the Database
Ensure your database is running and properly configured in the 
```.env``` file. Then, run the following commands to set up the database:

#### Run Migrations
```bash
npm run migrate:development:up:all
```

#### (Optional) Seed the Database
If you want to populate the database with initial data, run:
```bash
npx sequelize-cli db:seed:all
```

---

## **Running the Application**

### 1. Start in Development Mode
To start the application in development mode with live reloading:
```bash
npm run dev
```

### 2. Start in Production Mode
To build and start the application in production mode:
```bash
npm run build
npm run server
```

---

## **API Documentation**
The application includes Swagger documentation for the API.

1. Start the application.
2. Open your browser and navigate to:
   ```
   http://localhost:5000/api-docs
   ```

---

## **Available Scripts**

### Development
- `npm run dev`: Starts the application in development mode with live reloading.

### Production
- `npm run build`: Compiles the TypeScript code into JavaScript.
- `npm run server`: Starts the application in production mode using PM2.

### Database
- `npm run migrate:development:up:all`: Runs all pending migrations in the development environment.
- `npm run migrate:development:down:all`: Reverts all migrations in the development environment.
- `npx sequelize-cli db:seed:all`: Seeds the database with initial data.
- `npx sequelize-cli db:seed:undo:all`: Reverts all seeders.

---

## **Troubleshooting**
- **Database Connection Error**: Ensure your database credentials in the 

.env

 file are correct and the database server is running.
- **Migration Errors**: Check the migration files for syntax errors or missing fields.
- **Port Already in Use**: Ensure no other application is running on port `5000`.
```

Save this file as `README.md` in the root of your project. Let me know if you need further customization!
Save this file as `README.md` in the root of your project. Let me know if you need further customization!

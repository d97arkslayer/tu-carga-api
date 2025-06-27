
# TuCarga API

API developed with Node.js, TypeScript, Sequelize, and ESLint to manage insurance logs, maintenance, and part changes for vehicles.

*--

## **Prerequisites**

1. **Node.js**: Version 18 or higher (LTS recommended). Check with:
   ```bash
   node --version
   ```

2. **npm**: Usually comes with Node.js. Check with:
   ```bash
   npm --version
   ```

3. **Docker & Docker Compose**: For the PostgreSQL database. Check with:
   ```bash
   docker --version
   docker-compose --version
   ```

4. **Git**: To clone the repository. Check with:
   ```bash
   git --version
   ```

*--

## **Installation and Setup**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/tucarga-api.git
   cd tucarga-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root by copying the example file:
   ```bash
   cp .env.example .env
   ```

   Then edit the `.env` file with your specific configuration. **Required variables:**
   ```env
   # Database Configuration (matches docker-compose.yml)
   DB_USER=admin
   DB_PASSWORD=admin123
   DB_NAME=tucarga
   DB_HOST=localhost
   DB_PORT=5432

   # Server Configuration
   PORT=4000
   NODE_ENV=development

   # JWT Configuration (IMPORTANT: Change this secret in production!)
   JWT_SECRET=your-super-secret-jwt-key-here
   
   # SendGrid Configuration (Optional - only needed for email features)
   SENDGRID_API_KEY=your-sendgrid-api-key-here
   SENDGRID_FROM_EMAIL=noreply@tucarga.com.co
   ```

   > **Note**: The SendGrid variables are optional and only needed if you plan to test email functionality (password recovery, email verification).

4. Start the PostgreSQL container with Docker:
   ```bash
   docker-compose up -d
   ```

5. Run database migrations to create the tables:
   ```bash
   npm run db:migrate
   ```

6. (Optional) Seed the database with initial data:
   ```bash
   npm run db:seed
   ```

*--

## **Running the Project**

### **Development Mode**
Run the project in development mode with hot reload:
```bash
npm run dev
```

The server will start at `http://localhost:4000` (or the PORT specified in your `.env` file).

### **Verify Everything Works**
Once the server is running, you can test the API:

1. **Health Check**: Visit `http://localhost:4000/` in your browser
2. **API Endpoints**: Use a tool like Postman or curl to test endpoints:
   ```bash
   # Example: Get all users (if you ran the seeders)
   curl http://localhost:4000/api/users
   
   # Example: Register a new user
   curl -X POST http://localhost:4000/api/auth/register \
        -H "Content-Type: application/json" \
        -d '{"email":"test@example.com","password":"test123","firstName":"Test","lastName":"User"}'
   ```

### **Production Mode**
1. Compile the code:
   ```bash
   npm run build
   ```

2. Start the server:
   ```bash
   npm start
   ```

*--

## **Migrations and Seeders**

### **Create a Migration**
Run the following command to generate a new migration:
```bash
npx sequelize-cli migration:generate --name <migration_name>
```

Example:
```bash
npx sequelize-cli migration:generate --name create_vehicles_table
```

Then, edit the generated file in `src/database/migrations` to define the table structure.

### **Run Migrations**
Apply migrations to create or update the database tables:
```bash
npm run db:migrate
```

### **Revert Migrations**
To undo the last executed migration:
```bash
npm run db:migrate:undo
```

### **Create a Seeder**
Generate a new seeder file with:
```bash
npx sequelize-cli seed:generate --name <seeder_name>
```

Example:
```bash
npx sequelize-cli seed:generate --name seed_vehicles
```

Edit the file in `src/database/seeders` to define the initial data.

### **Run Seeders**
Insert initial data into the database:
```bash
npm run db:seed
```

*--

## **API Structure**

The API provides endpoints for managing vehicles, maintenance records, and user accounts:

### **Main Endpoints**
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/users` - Get users (requires authentication)
- `GET /api/vehicles` - Get vehicles
- `POST /api/vehicles` - Create vehicle
- `GET /api/maintenance` - Get maintenance records
- `POST /api/maintenance` - Create maintenance record

### **Authentication**
Most endpoints require a JWT token. After login, include the token in the Authorization header:
```
Authorization: Bearer <your-jwt-token>
```

*--

## **Project Structure**

```
src/
├── config/          # Database and application configuration
├── controllers/     # Request handlers and business logic
├── database/        # Migrations and seeders
├── middlewares/     # Authentication, validation, error handling
├── models/          # Sequelize model definitions
├── routes/          # API route definitions
├── schemas/         # Joi validation schemas
├── services/        # Business logic services
└── utils/           # Utility functions and helpers
```

*--

## **Adding a New Model and Endpoint**

Here's an example of how to create a model, its migration, and an associated endpoint:

### **1. Create the Model**
In `src/models`, create a file `Driver.ts`:

```typescript
import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  timestamps: true,
  tableName: 'drivers',
})
export class Driver extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  licenseNumber!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birthDate!: Date;
}
```

### **2. Create a Migration**
```bash
npx sequelize-cli migration:generate --name create_drivers_table
```

Edit the migration file in `src/database/migrations`:
```typescript
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('drivers', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      licenseNumber: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      birthDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('drivers');
  },
};
```

Apply the migration:
```bash
npm run db:migrate
```

### **3. Create the Controller**
In `src/controllers`, create `DriverController.ts`:

```typescript
import { Request, Response } from 'express';
import { Driver } from '../models/Driver';

export const getDrivers = async (req: Request, res: Response) => {
  const drivers = await Driver.findAll();
  res.json(drivers);
};

export const createDriver = async (req: Request, res: Response) => {
  const { name, licenseNumber, birthDate } = req.body;
  const driver = await Driver.create({ name, licenseNumber, birthDate });
  res.status(201).json(driver);
};
```

### **4. Create the Route**
In `src/routes/driver.routes.ts`:

```typescript
import { Router } from 'express';
import { getDrivers, createDriver } from '@controllers/DriverController';

const router = Router();

router.get('/', getDrivers);
router.post('/', createDriver);

export default router;
```

### **5. Register the Route**
In `src/routes/index.ts`:

```typescript
import { Router } from 'express';
import driverRoutes from './driver.routes';

const router = Router();

router.use('/drivers', driverRoutes);

export default router;
```

*--

## **Test the Endpoint**

1. Run the server in development mode:
   ```bash
   npm run dev
   ```

2. Test the endpoints:
   - **GET /drivers**: Retrieve the list of drivers.
   - **POST /drivers**: Create a new driver.

*--

## **Troubleshooting**

### **Common Issues**

1. **Database Connection Error**:
   - Make sure Docker is running: `docker ps`
   - Check if PostgreSQL container is up: `docker-compose ps`
   - Verify `.env` database credentials match `docker-compose.yml`

2. **Port Already in Use**:
   - Change the `PORT` in your `.env` file to a different value (e.g., 4001)
   - Or kill the process using port 4000: `lsof -ti:4000 | xargs kill -9`

3. **Migration Errors**:
   - Make sure the database is running before running migrations
   - Check if migrations table exists: The first migration run creates it

4. **Module Not Found Errors**:
   - Run `npm install` again
   - Clear npm cache: `npm cache clean --force`
   - Delete `node_modules` and `package-lock.json`, then run `npm install`

### **Useful Commands for Debugging**

```bash
# Check if Docker containers are running
docker-compose ps

# View PostgreSQL logs
docker-compose logs postgres

# Connect to PostgreSQL directly
docker-compose exec postgres psql -U admin -d tucarga

# Check which process is using a port
lsof -i :4000
```

*--

## **Useful Commands**

| Command                 | Description                                       |
|-------------------------|---------------------------------------------------|
| `npm run dev`           | Run the server in development mode with hot reload |
| `npm run build`         | Compile TypeScript to JavaScript                 |
| `npm start`             | Run the compiled production server               |
| `npm run db:migrate`    | Execute pending migrations                        |
| `npm run db:migrate:undo` | Revert the last migration                       |
| `npm run db:seed`       | Run all seeders to populate initial data         |
| `npm run db:seed:undo`  | Undo all seeders                                 |
| `npm run lint:fix`      | Run ESLint and automatically fix issues          |
| `docker-compose up -d`  | Start PostgreSQL database in background          |
| `docker-compose down`   | Stop and remove database containers              |
| `docker-compose logs postgres` | View PostgreSQL container logs         |

*--

Feel free to reach out if you encounter any issues or need further assistance!

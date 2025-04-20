
# TuCarga API

API developed with Node.js, TypeScript, Sequelize, and ESLint to manage insurance logs, maintenance, and part changes for vehicles.

*--

## **Prerequisites**

1. **Node.js**: Version 22 or higher (LTS recommended).
2. **Docker**: For the PostgreSQL database.
3. **Project Dependencies**: Installed using `npm install`.

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

3. Create a `.env` file in the project root with the following configuration:
   ```env
   DB_USER=admin
   DB_PASSWORD=admin123
   DB_NAME=tucarga
   DB_HOST=localhost
   DB_PORT=5432
   ```

4. Start the PostgreSQL container with Docker:
   ```bash
   docker-compose up -d
   ```

*--

## **Running the Project**

### **Development Mode**
Run the project in development mode with hot reload:
```bash
npm run dev
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

## **Useful Commands**

| Command                 | Description                                       |
|-------------------------|---------------------------------------------------|
| `npm run dev`           | Run the server in development mode.               |
| `npm run db:migrate`    | Execute migrations.                               |
| `npm run db:seed`       | Run seeders.                                      |
| `npm run lint`          | Run ESLint to check the code.                     |
| `npm run lint:fix`      | Automatically fix linting errors.                 |

*--

Feel free to reach out if you encounter any issues or need further assistance!

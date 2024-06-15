# Sequelize PostgreSQL Node.js App

This is a Node.js application using Sequelize ORM with PostgreSQL database.

## Getting Started

### Prerequisites

- Node.js installed on your machine
- PostgreSQL database running locally or accessible remotely

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   ```

2. Navigate to the project directory:

   ```bash
   cd <project-directory>
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Setup

1. Initialize Sequelize:

   ```bash
   npx sequelize-cli init
   ```

2. Generate a model:

   ```bash
   npx sequelize-cli model:generate --name User --attributes "email:string,firstName:string,lastName:string"
   ```

3. Generate a migration:

   ```bash
   npx sequelize-cli migration:generate --name <migration-name>
   ```

4. Apply migrations:

   ```bash
   npx sequelize-cli db:migrate
   ```

## Reflect Model Changes in Database Tables

If you have made changes to your model files and want to reflect those changes in the database tables, follow these steps:

1. Generate a migration to apply the changes:

   ```bash
   npx sequelize-cli migration:generate --name <migration-name>
   ```

2. Review the generated migration file in the migrations directory. Ensure that the migration includes the necessary alterations to the database schema to reflect the changes made in your model files.

3. Apply the migration to update the database schema:

   ```bash
   npx sequelize-cli db:migrate
   ```

## Usage

- Start the application:

  ```bash
  npm start
  ```

- Access the application at [http://localhost:3000](http://localhost:3000)

## Contributing

Contributions are welcome! Please feel free to submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---
1. To install all dependencies run `npm install` command.
2. Add `.env` file in the root directory and add the following environment variables:
   ```
   PORT=3000
   ```
3. To start the server in development mode run `npm run start:dev` command.
4. To build the project run `npm run build` command.
5. To start the server in production mode run `npm run start:prod` command.
6. To test user api you can use the following endpoints:
   - `GET /api/users` - Get all users
   - `GET /api/users/:id` - Get user by id
   - `POST /api/users` - Create a new user
   - `PUT /api/users/:id` - Update user by id
   - `DELETE /api/users/:id` - Delete user by id
7. Make sure to use a tool like Postman or Insomnia to test the API endpoints.
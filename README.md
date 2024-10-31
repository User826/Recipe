# Recipe Sharing App

This is a recipe sharing app built with the MERN stack (MongoDB, Express, React, Node.js). Users can sign up and submit recipes. Admins must approve user accounts before they are able to login and use the app.

## Features

- User registration and account approval flow
- Recipe submission  
- Search recipes
- View recipe details
- Save recipes to favorites
- Admin panel to manage user accounts

## Usage 

### Install Dependencies

Run the following command in both the client and server directories:

```
npm install
```

### Run the Application

To run the application, you will need to set up two terminals:

1. **Terminal 1**:
   - Navigate to the `recipe_project` directory:
     ```bash
     cd recipe_project
     ```
   - Build the client and run the development server:
     ```bash
     npm run build && npm run dev
     ```

2. **Terminal 2**:
   - Navigate to the `recipe_project_api` directory:
     ```bash
     cd recipe_project_api
     ```
   - Run the API server:
     ```bash
     npm run dev
     ```

The application will then be accessible at [http://localhost:3000](http://localhost:3000).

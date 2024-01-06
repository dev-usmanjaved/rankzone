# Project Setup

## Frontend


### Installing
A step-by-step guide to set up your development environment
```
# Go into the project directory
cd frontend

# Install dependencies
npm install

```

### Env Variables
Create a `.env` file and add the following line to specify the base URL for the API:
```
REACT_APP_BASE_URL=http://127.0.0.1:3000
```

### Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

### `npm test`

Launches the test runner in the interactive watch mode.


## API

### Installing
A step by step guide that tell you how to get a development environment running.
```
# Go into the project directory
cd backend

# Install dependencies
bundle install

```
### Available Scripts

In the project directory, you can run:

### `bin/setup`

Install all the dependencies and prepare the database.

### `bundle exec rails db:seed`
This command executes the seed data defined in the db/seeds.rb file of your Rails application.  

### `bundle exec rails server`

Runs the app in the development mode: [http://localhost:3000](http://localhost:3000).

### `bundle exec rspec`

Launches the test runner.
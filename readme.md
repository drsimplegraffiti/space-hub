### Space-Hub

### How to run this application

- Fork and clone this repo - git clone https://github.com/drsimplegraffiti/space-hub
- Run the following command in your terminal
  - yarn
  - yarn start

### Packages used

> yarn add cloudinary express nodemon dotenv axios jsonwebtoken bcryptjs cors sequelize pg pg-hstore cors bcrypt morgan helmet

---

### Endpoints

### Auth Endpoints

| Method | Endpoint      | Description         |
| ------ | ------------- | ------------------- |
| POST   | /api/register | Register a new user |
| POST   | /api/login    | Login a user        |

---

### User Endpoints

| Method | Endpoint             | Description     |
| ------ | -------------------- | --------------- |
| POST   | /api/switch-to-admin | switch to admin |

---

### Bookings Endpoints

| Method | Endpoint                   | Description              |
| ------ | -------------------------- | ------------------------ |
| POST   | /api/booking/create        | Create a new booking     |
| GET    | /api/booking/search/byDate | Get all bookings by date |

---

### House listings Endpoints

| Method | Endpoint              | Description                                   |
| ------ | --------------------- | --------------------------------------------- |
| POST   | /api/house/create     | Create a new house listing                    |
| GET    | /api/house/all        | Get all house listings                        |
| GET    | /api/single/house/:id | Get a house listing by id                     |
| PUT    | /api/house/modify/:id | Update a house listing by id                  |
| DELETE | /api/house/single/:id | Delete a house listing by id                  |
| GET    | /api/house/me         | Get all houses belonging to a particular host |
| DELETE | /api/house/drop/all   | Bulk delete all houses                        |

### Admin Endpoints

| Method | Endpoint                    | Description                  |
| ------ | --------------------------- | ---------------------------- |
| GET    | /api/admin/users            | Get all users                |
| GET    | /api/admin/user/:id         | Get a user by id             |
| GET    | /api/admin/houseListings    | Get all house listing        |
| DELETE | /api/admin/houseListing/:id | Delete a house listing by id |

---

# LuxHub

This is a course project created by @winghojackyli and @veronicacheng2 in Summer 2023.

LuxHub is a MERN web application designed for buying and selling sneakers, apparel, accessories, and more. It provides a platform for users to place bids and asks for various products and keep track of their prices. Whether you're a sneaker enthusiast or a fashion aficionado, LuxHub offers a seamless experience for trading luxury items.


## Demo

Check out the live demo of LuxHub: [LuxHub Demo](https://luxhub.onrender.com/)

## Table of Contents

- [Installation](#installation)
- [Features](#features)
- [Screenshots](#screenshots)


## Installation

You can run LuxHub locally by following these steps:

1. Clone the repository:
```
git clone https://github.com/your-username/luxhub.git
```

2. Open 2 terminals and navigate to the frontend and backend directories respectively:
```
cd client
```
```
npm install
```
```
cd api
```
```
npm install
```

3. You will need to create .env and fill in the following variables for both backend and frontend:
For backend: MONGO_URL, PASS_KEY, JWT_KEY, STRIPE_KEY
For frontend: REACT_APP_STRIPE

4. Start the backend and frontend concurrently:
```
npm start
```

5. The application should now be accessible at http://localhost:3000.


## Features

LuxHub offers the following features:

- User authentication and registration.
- Placing bids and asks on products.
- Editing/Deleting bids and asks
- Browsing products by category.
- Searching products by name or brand
- Filtering products based on various criteria.
- Viewing price charts for products.
- Viewing active bids and asks for products
- Viewing posts created by admin (posts are mainatined by admin, and only admin can create, edit or delete posts)

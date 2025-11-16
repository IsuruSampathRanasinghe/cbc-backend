# CBC Backend

Small backend for the CBC project (Express + Mongoose). This repository contains API routes for users, products and orders.

**Project Structure**
- `index.js` - app entry point
- `routes/` - route definitions (`userRouter.js`, `productRouter.js`, `orderRouter.js`)
- `controllers/` - request handlers (e.g. `orderController.js`)
- `models/` - Mongoose models (e.g. `order.js`, `product.js`, `user.js`)
- `lib/` - utilities (e.g. `emailDesigner.js`)

**Requirements**
- Node.js 18+ (recommended)
- npm
- MongoDB instance (local or cloud)

**Environment variables**
- `MONGO_URI` : MongoDB connection string (required)
- `PORT` : port to run the server (optional, default 3000)
- `JWT_SECRET` : secret used for JWT signing/verification (required if auth middleware uses it)

If your project requires other env vars (email credentials, third-party keys), add them to a `.env` file or your host environment.

**Install**
Open PowerShell in the `backend` folder and run:

```powershell
npm install
```

**Run (development)**
Start the server:

```powershell
$env:MONGO_URI = "your-mongo-uri"; $env:JWT_SECRET = "your_jwt_secret"; npm start
```

If you use `nodemon` or a `dev` script, you can run `npm run dev`.

**API Overview (quick)**
- Authentication helpers are in `controllers/userController.js` (functions like `isAdmin`, `isCustomer` are used by controllers).
- Users: routes configured in `routes/userRouter.js`
- Products: routes configured in `routes/productRouter.js`
- Orders: routes configured in `routes/orderRouter.js` — order endpoints use `models/order.js` schema.

Example: GET all orders (admin)

```bash
curl -H "Authorization: Bearer <JWT>" http://localhost:3000/api/orders
```

Notes & Troubleshooting
- If you see `TypeError: The comparison function must be either a function or undefined` when sorting arrays, ensure `.toSorted()` is given a compare function or use `.sort()`/Mongoose `.sort()` instead. Example fix in `controllers/orderController.js`:

```js
// correct JS array toSorted usage
const orders = (await Order.find()).toSorted((a, b) => b.date - a.date)

// or better: use mongoose sorting where possible
const orders = await Order.find().sort({ date: -1 })
```

- Ensure your `MONGO_URI` is valid and reachable.

Want me to also:
- add example requests for each route?
- add a sample `.env.example` file?

If you'd like, I can commit this README or expand it with endpoint details and examples.
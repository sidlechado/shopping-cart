# Shopping Cart API

## How to run the project
* Clone the git repo
* You can either use docker or local (I kept a free Postgres on `ormconfig` for the sake of it being easier to test (same would go for .env))
* If you want to run locally, run `npm install` then `npm run dev`
* If you want to use docker, run `docker build -t shopping-cart .` then `docker run --name shopping-cart -p 3000:3000 shopping-cart`

## Documentation
You can find it on `url/api/documentation` e.g (http://localhost:3000/api/documentation), it uses Swagger and OpenAPI

## Some business rules to consider
* Each user can only have one order/shopping cart per store, but for multiple stores at the same time
* You can only add products from the particular store to your order, the same goes for coupons
* Only the user can edit their orders
* There's a stock checker before persisting the order to not allow the user to persist if there's not the minimum quantity of that product

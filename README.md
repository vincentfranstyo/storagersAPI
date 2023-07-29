# StoragersAPI
A Single-service API made for mini e-commerce application, made with Prisma DB, ExpressJS and Typescript

## Creator
- Vincent Franstyo (18221100)

## How to run on docker
1. Clone this repository
2. Get Docker Desktop
3. Ensure that docker desktop is running
4. Run `docker-compose up -d`
5. Open `localhost:4000` or through docker desktop
6. Open `ohl-fe.vercel.app`
7. Log in as admin (username: `admin`, password: `admin`)
8. Enjoy!


## How to run locally
1. Clone this repository
2. Run `npm install` or `yarn install`
3. Run `npm run dev` or `yarn dev`
4. Open `ohl-fe.vercel.app`
5. Log in as admin (username: `admin`, password: `admin`)
6. Enjoy!

## Design Patterns
- Singleton: digunakan agar tidak adanya multiple instance dari Prisma DB
- Facade: digunakan untuk memepermudah implementasi sistem kompleks menjadi subsistem
- Chain of Responsibility: digunakan untuk mempermudah implementasi router dan seeding
- Proxy: digunakan untuk memudahkan pemanggilan router
- Factory Method: digunakan karena dapat mengenkapsulasi pembuatan objek agar data tetap konsisten

## Tech Stack
- Prisma DB
- ExpressJS
- Typescript
- JWTAuth
- MySQL
- Docker

## Endpoints
### Barang
- `GET /api/barang`: get all products by query and companyId
- `GET /api/barang/:id`: get product by id
- `POST /api/barang`: create new product
- `PUT /api/barang/:id`: update product by id
- `DELETE /api/barang/:id`: delete product by id
- `PUT /api/barang/:user/:id`: update product by id and user

### Perusahaan
- `GET /api/perusahaan`: get all companies by query
- `GET /api/perusahaan/:id`: get company by id
- `POST /api/perusahaan`: create new company
- `PUT /api/perusahaan/:id`: update company by id
- `DELETE /api/perusahaan/:id`: delete company by id

### Login
- `POST /api/login`: login admin

### Self
- `GET /api/self`: get self data and verify through JWT

## Bonus
- SOLID (SRP): saya sebisa mungkin mengimplementasikan SRP pada project ini, seperti pada `src/barang` dan `src/perusahaan` dimana saya memisahkan fungsi-fungsi yang berbeda menjadi fungsi yang berbeda-beda sehingga dapat mempermudah untuk mengubah fungsi-fungsi tersebut tanpa mengubah fungsi lainnya
- SOLID (OCP): OCP pada project ini diimplementasikan seperti pada `src/barang` dan `src/perusahaan` dimana setiap fungsi pada barang.service.ts dan perusahaan.service.ts open for extension dan close for modification




# StoragersAPI
A Single-service API made for mini e-commerce application, made with Prisma DB, ExpressJS and Typescript

## Creator
- Vincent Franstyo (18221100)

## How to run

### Requirements
- [NodeJS](https://nodejs.org/en/download/)
- [Prisma](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch-sql-typescript-postgres)
- [Docker](https://docs.docker.com/get-docker/)
- Typescript (`npm install -g typescript`)
- Nodemon (`npm install -g nodemon`)
- [MySQL](https://dev.mysql.com/downloads/installer/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [JWTAuth](https://jwt.io/)

### Locally
1. Clone this repository
2. Run `npm install`
3. Set up the environment at .env file (e.g. mysql://root:[DB_PASSWORD]@localhost:3306/storagersorm)
4. Run `npx prisma generate`
5. Run `npx migrate dev --name init`
6. Run `npx prisma db seed`
7. Run `npm run dev`
8. Open `ohl-fe.vercel.app`
9. Log in as admin (username: `admin`, password: `admin`)
10. Enjoy!

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
- JavaScript
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
- **SOLID (SRP)**: saya sebisa mungkin mengimplementasikan SRP pada project ini, seperti pada `src/barang` dan `src/perusahaan` dimana saya memisahkan fungsi-fungsi yang berbeda menjadi fungsi yang berbeda-beda sehingga dapat mempermudah untuk mengubah fungsi-fungsi tersebut tanpa mengubah fungsi lainnya
- **SOLID (OCP)**: OCP pada project ini diimplementasikan seperti pada `src/barang` dan `src/perusahaan` dimana setiap fungsi pada barang.service.ts dan perusahaan.service.ts open for extension dan close for modification
- **SOLID (LSP)**: LSP adalah saat dimana superclass dapat digantikan oleh subclass tanpa mengubah fungsionalitas dari superclass tersebut.
- **SOLID (ISP)**: ISP adalah saat dimana sebuah interface tidak memiliki fungsi yang tidak digunakan oleh implementasi dari interface tersebut. Pada project ini, tidak ada interface yang tidak memiliki fungsi yang tidak digunakan.
- **SOLID (DIP)**: DIP adalah saat dimana sebuah fungsi tidak bergantung pada implementasi dari fungsi tersebut, tetapi bergantung pada interface dari fungsi tersebut.

- **Single Service Implementation**: Menggunakan typescript dan expressjs untuk membuat sebuah API yang dapat di-_consume_ oleh frontend dan Backend. Config TS: "Strict": "true", tetapi menggunakan any hanya untuk error type.

## WARNING
![img.png](img.png)
Maaf Kak, sudah dicoba untuk di-dockerize. Tetapi setelah coba di-debug masalahnya, solusinya masih belum ditemukan.


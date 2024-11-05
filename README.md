# Api book system

- Swagger -> http://18.191.118.156:4040/api/docs

# How to run

Create a .env file

```
AWS_REGION=us-east-2
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
PORT=4040
```

Then execute this commands

```
npm install
npm run start:dev
```

## MAIN FEATURES

- Book a service
  Entities related :
  - User
  - Service
  - datetime available
  - booking
    - datetimepicked
    - userId
    - serviceId
    - paymentId
  - payment

## ENTITIES

- person
- admin
- users
- categories (services)
- availableTime ?
- booking
- payments

### Summary

The following project provides REST API for Lanars

### Before running

#### Before starting application you need to:
1. Install all Node dependencies using:
    > npm install
2. Up docker compose container using:
    > npm run start:db
3. In order to create default bucket in your local S3 container using:
    > create-local-s3
4. Change access policy from private to public for bucket in minio [URL](http://localhost:7001/buckets/photo-storage/admin/summary)

### Running the application

To start the application use command:

	npm start

To start the application in watch mode, use the command:

	npm run start:watch

To start the application in debug mode, use the command:

	npm run start:debug

### Migrations

To apply on un-applied migrations to your database, use the command:

	npm run migration:run

To revert previously applied migration, use the command:

	npm run migration:revert

To create new empty migration, use the command:

	npm run migration:create -name=MIGRATION-NAME

To generate new migration based on the changes you've made, use the command:

	npm run migration:generate -name=MIGRATION-NAME

### Formatting

To check your code for lint issues and try fix, use the command:

	npm run lint

### Building the application

To build the application, use the command:

	npm run build

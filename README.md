# Album Reviews

This webapp uses the serverless deploy inside the [backend](https://github.com/telton/serverless-album-reviews-backend) repo that exposes a GraphQL API for performing CRUD actions on album reviews. You must sign in up in order to put in reviews. Authentication is done leveraging [Auth0](https://auth0.com/).

The UI isn't the best, and the error handling isn't full-featured, but the basics are here to utilize a GraphQL API for CRUD functionality.

# Set up

```bash
$ cp .env.example .env
```

Fill out `.env` with the appropriate variables and then start the server:

```bash
npm start
```

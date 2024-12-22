# MiaPlatform Typescript Template

## Summary
This is a template to be used in Mia Platform console to create a new microservice in Typescript.
It mainly uses the [mia-hot-start][mia-hot-start] plugin to set up a Fastify server with batteries included.

## Local Development

To develop the service locally you need:

- Node 20+

To setup node, please if possible try to use [nvm][nvm], so you can manage multiple versions easily. Once you have installed nvm, you can go inside the directory of the project and simply run `nvm install`, the `.nvmrc` file will install and select the correct version if you don’t already have it.

Once you have all the dependency in place, you can launch:

```shell
npm i
npm run test
```

This two commands, will install the dependencies and run the tests, ensuring that the service is working as expected.

To start the development server, execute this command:
```shell
npm run dev
```

[mia-hot-start]: https://www.npmjs.com/package/mia-hot-start
[nvm]: https://github.com/creationix/nvm

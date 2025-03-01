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

## IDE tests integrations

This project uses the official [node test runner][node-test]. In order to execute Typescript files you have to install ts-node with the `--register command`.

### Terminal
If you use the package.json scripts from the terminal it's already set up.

### WebStorm
If you use WebStorm, it's already set up by JetBrains (upgrade to the last version to be sure).

### VSCode
If you use VSCode, install [this extension][nodejs-testing-vscode]: this provides integration with VS Code.  
In order to execute Typescript files follow the instructions and add an object like this one in the VSCode settings.json file:
```json
{
    "nodejs-testing.extensions": [
        {
            "extensions": ["mjs", "cjs", "js"],
            "parameters": []
        },
        {
            "extensions": ["mts", "cts", "ts"],
            "parameters": ["--require", "ts-node/register"]
        }
    ]
}
```

[mia-hot-start]: https://www.npmjs.com/package/mia-hot-start
[nvm]: https://github.com/creationix/nvm

[node-test]: https://nodejs.org/api/test.html
[nodejs-testing-vscode]: https://marketplace.visualstudio.com/items?itemName=connor4312.nodejs-testing

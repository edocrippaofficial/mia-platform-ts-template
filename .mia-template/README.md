# mia_template_service_name_placeholder

[![pipeline status][pipeline]][git-link]
[![coverage report][coverage]][git-link]

## Summary
%CUSTOM_PLUGIN_SERVICE_DESCRIPTION%

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

## Contributing
Please use `npm run commit` to add and commit your changes keeping the messages format consistent.

[git-link]: <replace with your git link>
[pipeline]: <replace with your git link>/badges/master/pipeline.svg
[coverage]: <replace with your git link>/badges/master/coverage.svg

[nvm]: https://github.com/creationix/nvm

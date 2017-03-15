# Currency Exchange widget

Widget is basically an exchange calculator, which periodically fetches conversion rates from api.

Conversion results are updated automatically, realtime, as you type, or if rates are updated from server.

Current application has NO store and no flux implementation, for simplicity purposes.
This is not suitable for production environment.

## Project structure

Current isomorphic application is based on react-starter-kit.

Custom components are located at **/src/components** i.e. **/src/components/ExchangeWidget/ExchangeWidget.jsx**

## TODO
These are the issues of the project, yet to be done. But most probably they won't be. Because it's just a test task.

- Implement flux, connect all smart-components to store;
- Error handling (api, low-level request, global application);
- TypeScript or FlowType implementation.

## Start
- node version 6 is required.
- yarn
- yarn start
- open [http://localhost:3001](http://localhost:3001) in browser
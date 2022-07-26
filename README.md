# React Source Code Study
It's base on React v18.2.0

## Setup for local debug environment
1. git clone [git@github.com:facebook/react.git](git@github.com:facebook/react.git)
2. Use the `create-react-app` cli to create a new react application(`react-source-code-study` in my case)
3. Move the `packages` folder which is under the clone source code to the `react-source-code-study/src` folder
    ```
   // Then the folder should be look like this
    +-- README.md
    +-- .gitignore
    +-- package.json
    +-- src
    |   +-- index.js
    |   +-- react
        |   +-- packages
            |   +-- [React Source Code]
    +-- scripts
    |   +-- ...
    +-- public
    |   +-- ...
    +-- config
    |   +-- env.js
    |   +-- webpack.config.js
    |   +-- ...
    ```
4. Update `alias` in `config/webpack.config.js` 
   ```
   alias: {
        // ...
        ...(isEnvProductionProfile && {
          - // 'react-dom$': 'react-dom/profiling',
          ...
        }),
        ...,
        + 'react': path.resolve(__dirname, '../src/react/packages/react'),
        + 'shared': path.resolve(__dirname, '../src/react/packages/shared'),
        + 'react-dom': path.resolve(__dirname, '../src/react/packages/react-dom'),
        + 'react-reconciler': path.resolve(__dirname, '../src/react/packages/react-reconciler'),
   }
   ```
5. Add env in `config/env.js` and `package.json`
   ```javascript
   // In env.js
   const stringified = {
       'process.env': Object.keys(raw).reduce((env, key) => {
         env[key] = JSON.stringify(raw[key]);
         return env;
       }, {}),
      // Add env
       __DEV__: true,
       __PROFILE__: true,
       __UMD__: true,
       __EXPERIMENTAL__: true,
     };
   
   // in package.json
   "eslintConfig": {
    // ...
    "globals": {
      "__DEV__": true,
      "__PROFILE__": true,
      "__UMD__": true,
      "__EXPERIMENTAL__": true
    }
   }
   ```
6. `yarn start` to fixed runtime errors
   ```js
   // 1. add react export default in src/react/packages/react/index.js
   export * as default from './src/React'
   
   // 2. add reactDOM export default in src/react/packages/react-dom/client.js
   export default {
      createRoot,
      hydrateRoot
   }
   
   // 3. add fiberHostConfig in src/react/packages/react-reconciler/src/ReactFiberHostConfig.js
   
   // REMOVE THIS ERROR: 'throw new Error('This module must be shimmed by a specific renderer.');'
   // Then add host config for browser
   export * from './forks/ReactFiberHostConfig.dom'
   ```

### Then you can debug anywhere you want💃🏻. Enjoy😄



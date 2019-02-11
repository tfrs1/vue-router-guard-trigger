# Vue Router Guard Trigger

## Introduction

Vue Router navigation guards are a very convenient place to define authorization rules. However, they are checked only when the current route changes, but the state of your application can change even when the route doesn't.

This plugin allows you to re-trigger the navigation guards on demand in order to make sure that the user is still authorized to access the current resource.

## Getting started

### Installation

You can add the plugin as dependency by running the following [npm](https://www.npmjs.com/) command.
```shell
npm install --save vue-router-guard-trigger
```
You can also use [Yarn](https://yarnpkg.com/en/) to accomplish the same thing.
```shell
yarn add vue-router-guard-trigger
```

### Importing into the project

The following snippet demonstrates how to import and install the plugin before use.
```javascript
import VueRouterGuardTrigger from 'vue-router-guard-trigger';

Vue.use(VueRouterGuardTrigger);
```

## API

### $triggerCurrentRouteGuards() ⇒ <code>undefined</code>

Trigger all navigation guards defined on the current route.

#### Example
`$triggerCurrentRouteGuards()` calls `beforeEnter` navigation guards on all currently matched routes.
```javascript
export default {
    name: 'login-popup',
    // ...
    methods: {
        // ...
        onSubmit: function() {
            // ...
            this.afterLogin();
        },
        afterLogin: function() {
            this.$triggerCurrentRouteGuards();
        }
    }
    // ...
};
```

### $triggerGuard(guard, to?) ⇒ <code>undefined</code>

Trigger a specific guard.

| Param            | Type                  | Description                      |
| ---------------- | --------------------- | -------------------------------- |
| guard            | <code>function</code> | Navigation guard to be triggered |
| to (this.$route) | <code>object</code>   | Destination route object         |

#### Example
You can also trigger a specific guard by passing the name of the guard function to `$triggerGuard()` method.
 
```javascript
function exampleGuard(to, from, next) {
    if (to.param.pass) {
        next();
    } else {
        next(false);
    }
}

this.$triggerGuard(exampleGuard);
```

## License

This project is licensed under Unlicense license. This license does not require you to take the license with you to your project. Read the [UNLICENSE](https://github.com/aleksandar-micic/vue-router-guard-trigger/blob/master/UNLICENSE) file for more information.

# Mute Console

Mute Console is an npm package that provides a utility to mute console outputs for console methods in both browser and node environments. It is designed to be easy to use, customizable, and flexible. With this package, you can selectively mute console outputs for specific patterns or functions.

# Why?
When developing applications, there are often times when we need to focus on specific parts of the code and want to mute console outputs to reduce noise. Additionally, when working with 3rd party libraries, we may not have control over their console outputs and want to mute them to improve the overall readability of our logs. The Mute Console package provides an easy and customizable way to selectively mute console outputs, allowing developers to focus on what matters most.

## Installation

To install the package, simply run:

```
npm install @pragmaticstack/mute-console
```

## Usage

To use the package, import the `muteConsole` function and call its `start` method to start muting console outputs. By default, the package mutes the following console methods: `log`, `debug`, `info`, `warn`, and `error`. You can also provide an array of methods to mute.

### Basics

```javascript
import { muteConsole } from '@pragmaticstack/mute-console';

// Mute all logging methods containing the string "foo"
muteConsole(['foo']).start();

// Mute console logs containing the string "foo"
muteConsole(['foo'], { methods: ['log']}).start();

// Mute console logs containing the string "foo" or "bar"
muteConsole(['foo', 'bar'], { methods: ['log']}).start();

// Mute console logs containing the string "foo" or "bar" or a custom function
muteConsole(['foo', 'bar', (output) => output.includes('baz')]).start();
```
### Reusable configuration:
```javascript
// file: my-configured-mute-console.js
import { muteConsole } from '@pragmaticstack/mute-console';

// Configure mutings for messages containing the string "foo"
export const methods = muteConsole(['foo']);
```
```javascript
// in your imports
import { methods } from './my-configured-mute-console'

methods.start()
```

### Conditional muting:
```javascript
// in your imports
import { methods } from './my-configured-mute-console'

methods.start(process.env && process.env.NODE_ENV !== 'test')
```

### To stop muting console outputs, call the `stop` method:

```javascript
muteConsole(['foo']).start();

// Do something here

// Stop muting console outputs
muteConsole().stop();
```

```javascript
// a pre confiured setup
import { methods } from './my-configured-mute-console'

methods.stop()
```

## Contributing

Contributions are welcome! If you find any bugs or issues, please report them on the [GitHub repository](https://github.com/your/repo).

## License

Mute Console is licensed under the [MIT License](https://opensource.org/licenses/MIT).
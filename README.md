# dsc-spectrum

[![NPM version][npm-image]][npm-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

.

## Installation

`$ npm install --save dsc-spectrum`

## Usage

```js
import DSCSpectrum from 'dsc-spectrum';

let spectrum = DSCSpectrum.fromJcamp(jcamp);

let data = spectrum.get(); // default to 'weightversustemperature'

let data = spectrum.get('weightVersusTime');
```

## [API Documentation](https://cheminfo.github.io/dsc-spectrum/)

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/dsc-spectrum.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/dsc-spectrum
[codecov-image]: https://img.shields.io/codecov/c/github/cheminfo/dsc-spectrum.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/cheminfo/dsc-spectrum
[download-image]: https://img.shields.io/npm/dm/dsc-spectrum.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/dsc-spectrum

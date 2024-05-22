import { readFileSync } from 'fs';
import { join } from 'path';

import { fromJcamp } from '../..';

test('fromJcamp', () => {
  let jcamp = readFileSync(
    join(__dirname, './data/jcamp.jdx'),
    'utf8',
  );
  let analysis = fromJcamp(jcamp);

  let spectrum1 = analysis.getXYSpectrum();

  expect(spectrum1.variables.x.data).toHaveLength(346);
  expect(spectrum1.variables.y.data).toHaveLength(346);
  expect(spectrum1.variables.x.label).toStrictEqual('Temperature');
  expect(spectrum1.variables.x.units).toStrictEqual('°C');
  expect(spectrum1.variables.y.label).toStrictEqual('Heat flow');
  expect(spectrum1.variables.y.units).toStrictEqual('mW');

  let spectrum2 = analysis.getXYSpectrum({ units: 'W vs s' });

  expect(spectrum2.variables.x.data).toHaveLength(346);
  expect(spectrum2.variables.y.data).toHaveLength(346);
  expect(spectrum2.variables.x.label).toStrictEqual('Time');
  expect(spectrum2.variables.x.units).toStrictEqual('s');
  expect(spectrum2.variables.y.label).toStrictEqual('Heat flow');
  expect(spectrum2.variables.y.units).toStrictEqual('W');
});

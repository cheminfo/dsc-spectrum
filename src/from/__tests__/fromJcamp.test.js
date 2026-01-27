import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vitest';

import { fromJcamp } from '../../index.ts';

test('fromJcamp', () => {
  let jcamp = readFileSync(
    join(import.meta.dirname, './data/jcamp.jdx'),
    'utf8',
  );
  let analysis = fromJcamp(jcamp);

  let spectrum1 = analysis.getXYSpectrum();

  expect(spectrum1.variables.x.data).toHaveLength(346);
  expect(spectrum1.variables.y.data).toHaveLength(346);
  expect(spectrum1.variables.x.label).toBe('Temperature');
  expect(spectrum1.variables.x.units).toBe('°C');
  expect(spectrum1.variables.y.label).toBe('Heat flow');
  expect(spectrum1.variables.y.units).toBe('mW');

  let spectrum2 = analysis.getXYSpectrum({ units: 'W vs s' });

  expect(spectrum2.variables.x.data).toHaveLength(346);
  expect(spectrum2.variables.y.data).toHaveLength(346);
  expect(spectrum2.variables.x.label).toBe('Time');
  expect(spectrum2.variables.x.units).toBe('s');
  expect(spectrum2.variables.y.label).toBe('Heat flow');
  expect(spectrum2.variables.y.units).toBe('W');
});

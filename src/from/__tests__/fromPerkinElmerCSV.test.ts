import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { expect, test } from 'vitest';

import { fromJcamp, fromPerkinElmerCSV, toJcamp } from '../../index.ts';

test('fromPerkinElmer', () => {
  const csv = readFileSync(
    join(import.meta.dirname, './data/PerkinElmerCSV.txt'),
    'latin1',
  );
  const analysisOriginal = fromPerkinElmerCSV(csv);
  const jcamp = toJcamp(analysisOriginal);
  const analysis = fromJcamp(jcamp);

  const spectrum1 = analysis.getXYSpectrum();

  expect(spectrum1).toBeDefined();
  expect(spectrum1?.variables.x.data).toHaveLength(7610);
  expect(spectrum1?.variables.y.data).toHaveLength(7610);
  expect(spectrum1?.variables.x.label).toBe('Sample Temperature');
  expect(spectrum1?.variables.y.label).toBe('Heat Flow');
  expect(spectrum1?.variables.x.units).toBe('°C');
  expect(spectrum1?.variables.y.units).toBe('mW');

  const spectrum2 = analysis.getXYSpectrum({ units: 'mW vs s' });

  expect(spectrum2?.dataType).toBe('DSC');

  expect(spectrum2?.variables.x.data).toHaveLength(7610);
  expect(spectrum2?.variables.y.data).toHaveLength(7610);

  expect(spectrum2?.variables.x).toMatchObject({
    label: 'Time',
    units: 's',
    min: 0,
    max: 691.51824,
  });
  expect(spectrum2?.variables.y).toMatchObject({
    label: 'Heat Flow',
    units: 'mW',
    min: -16.173448,
    max: -7.840522,
  });

  const spectrum3 = analysis.getXYSpectrum({ units: '°C vs s' });

  expect(spectrum3?.variables.x.data).toHaveLength(7610);
  expect(spectrum3?.variables.y.data).toHaveLength(7610);

  expect(spectrum3?.variables.x).toMatchObject({
    label: 'Time',
    units: 's',
    min: 0,
    max: 691.51824,
  });
  expect(spectrum3?.variables.y).toMatchObject({
    label: 'Sample Temperature',
    units: '°C',
    min: -15.059,
    max: 89.675,
  });
});

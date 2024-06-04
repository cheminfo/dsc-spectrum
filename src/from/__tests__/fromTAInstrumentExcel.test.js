import { readFileSync } from 'fs';
import { join } from 'path';

import { fromTAInstrumentsExcel } from '../fromTAInstrumentsExcel';

test('import from TA instruments excel file', () => {
  const data = readFileSync(join(__dirname, 'data/MR0132-D.xls'));

  const output = fromTAInstrumentsExcel(data);
  expect(output.spectra).toHaveLength(5);
  expect(Object.keys(output.spectra[0].variables)).toStrictEqual([
    't',
    'x',
    'y',
  ]);

  const variables = output.spectra[0].variables;

  expect(variables.x.data).toHaveLength(9300);
  expect(variables.y.data).toHaveLength(9300);
  expect(variables.t?.data).toHaveLength(9300);
  expect(variables.x.data[0]).toBe(39.84);
  expect(variables.x.data[9299]).toBe(70.41);
});

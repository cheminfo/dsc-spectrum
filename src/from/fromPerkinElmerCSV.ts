import type { TextData } from 'cheminfo-types';
import { ensureString } from 'ensure-string';
import Papa from 'papaparse';

import { Analysis } from '../index.js';

/**
 * @param text
 * @param arrayBuffer
 * @returns - New class element with the given data
 */
export function fromPerkinElmerCSV(arrayBuffer: TextData) {
  const text = ensureString(arrayBuffer);
  const parsed = Papa.parse(text, {
    skipEmptyLines: true,
    header: true,
    dynamicTyping: true,
  }).data;

  const analysis = new Analysis();
  analysis.pushSpectrum(
    {
      x: {
        data: parsed.map((d: any) => d['Sample Temperature']) as number[],
        label: 'Sample Temperature [°C]',
        isDependent: true,
      },
      y: {
        data: parsed.map((d: any) => d['Unsubtracted Heat Flow']) as number[],
        label: 'Heat Flow [mW]',
        isDependent: true,
      },
      p: {
        data: parsed.map((d: any) => d['Program Temperature']) as number[],
        label: 'Program Temperature [°C]',
        isDependent: true,
      },
      t: {
        data: parsed.map((d: any) => d.Time) as number[],
        label: 'Time [min]',
        isDependent: false,
      },
    },
    { dataType: 'DSC' },
  );

  return analysis;
}

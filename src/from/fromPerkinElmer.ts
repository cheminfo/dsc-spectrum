import type { TextData } from 'ensure-string';
import { ensureString } from 'ensure-string';
import { parsePerkinElmerAscii } from 'tga-spectrum';

import { Analysis } from '../index.ts';

/**
 * Creates a new Chromatogram element based in a JCAMP string
 * @param arrayBuffer
 * @returns - New class element with the given data
 */
export function fromPerkinElmer(arrayBuffer: TextData) {
  const text = ensureString(arrayBuffer);
  const analysis = new Analysis();
  const parsed = parsePerkinElmerAscii(text);

  const meta: Record<string, unknown> = {
    ...parsed.header,
    stepsInfo: parsed.methodSteps.info,
    methodSteps: parsed.methodSteps.steps.map((step) => step.label),
    footer: parsed.footer,
  };

  const variables = parsed.methodSteps.steps[0].variables;
  for (let i = 1; i < parsed.methodSteps.steps.length; i++) {
    const stepVariable = parsed.methodSteps.steps[i].variables;
    for (let j = 0; j < variables.length; j++) {
      if (variables[j].data && stepVariable[j].data) {
        variables[j].data = variables[j].data.concat(stepVariable[j].data);
      }
    }
  }

  analysis.pushSpectrum(
    {
      t: {
        data: variables.find((v) => v.label.startsWith('Time'))?.data || [],
        label: 'Time [min]',
      },
      x: {
        data:
          variables.find((v) => v.label.startsWith('Sample Temperature'))
            ?.data || [],
        label: 'Sample Temperature [°C]',
      },
      y: {
        data:
          variables.find((v) => v.label.startsWith('Unsubtracted Heat Flow'))
            ?.data || [],
        label: 'Heat Flow [mW]',
      },
    },
    {
      dataType: 'DSC',
      title: (meta['Sample ID'] as string) || '',
      meta,
    },
  );

  return analysis;
}

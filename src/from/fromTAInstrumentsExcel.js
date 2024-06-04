import { Analysis } from 'common-spectrum';
import { dscParseTAInstrumentsXLS } from 'physical-chemistry-parser';

export function fromTAInstrumentsExcel(blob) {
  const analysis = new Analysis();
  const parsed = dscParseTAInstrumentsXLS(blob);

  analysis.pushSpectrum(parsed.variables, {
    dataType: 'DSC',
    title: parsed.meta['Sample name'],
    meta: {
      ...parsed.meta,
      cheminfo: {
        meta: {
          method: 'Full',
        },
      },
    },
  });

  for (const sheet of parsed.sheets) {
    analysis.pushSpectrum(sheet.variables, {
      dataType: 'DSC',
      title: parsed.meta['Sample name'],
      meta: {
        ...parsed.meta,
        cheminfo: {
          meta: {
            method: sheet.name,
          },
        },
      },
    });
  }

  return analysis;
}

import { Analysis } from 'common-spectrum';
import { dscParseTAInstrumentsXLS } from 'physical-chemistry-parser';

export function fromTAInstrumentsExcel(blob) {
  const analysis = new Analysis();
  const parsed = dscParseTAInstrumentsXLS(blob);

  analysis.pushSpectrum(parsed.variables, {
    dataType: 'DSC',
    title: parsed.meta['Sample name'],
    meta: parsed.meta,
  });

  return analysis;
}

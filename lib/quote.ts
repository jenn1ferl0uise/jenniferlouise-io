import {
  BASE_DAYS,
  FEATURE_GROUPS,
  FEATURE_IDS,
  features,
  type FeatureId,
} from '@/content/features';
import { getCaseStudy, work } from '@/content/work';

/** Starting points for the builder: every case study, as its feature set. */
export const presets = work.map(({ slug, title, features: presetFeatures }) => ({
  id: slug,
  label: title,
  features: presetFeatures,
}));

export const BUDGETS = [
  { id: 'under-4k', label: 'Under €4k' },
  { id: '4k-10k', label: '€4k–10k' },
  { id: '10k-20k', label: '€10k–20k' },
  { id: '20k-plus', label: '€20k+' },
  { id: 'not-sure', label: 'Not sure yet' },
] as const;

export type BudgetId = (typeof BUDGETS)[number]['id'];

export interface QuoteSelection {
  /** The case study the visitor started from, if any. */
  preset?: string;
  features: FeatureId[];
}

export interface QuoteDetails extends QuoteSelection {
  budget?: BudgetId;
}

export const EMPTY_SELECTION: QuoteSelection = { features: [] };

/** Keeps catalogue order and drops unknown or repeated ids, whatever the input. */
export function normaliseFeatures(ids: Iterable<string>): FeatureId[] {
  const wanted = new Set(ids);
  return FEATURE_IDS.filter((id) => wanted.has(id));
}

function isPreset(value: string | null | undefined): value is string {
  return !!value && presets.some((preset) => preset.id === value);
}

const splitList = (value: string | null | undefined) => (value ? value.split(',') : []);

// URL format: /quote?preset=property-manager&features=auth,bookings
// A preset on its own starts from that project's features.

export function selectionFromSearch(params: URLSearchParams): QuoteSelection {
  const preset = params.get('preset');
  const validPreset = isPreset(preset) ? preset : undefined;
  const list = params.get('features');

  if (list === null && validPreset) {
    return { preset: validPreset, features: getCaseStudy(validPreset)?.features ?? [] };
  }
  return { preset: validPreset, features: normaliseFeatures(splitList(list)) };
}

export function selectionToSearch({ preset, features: ids }: QuoteSelection): string {
  const params = new URLSearchParams();
  if (preset) params.set('preset', preset);
  if (ids.length > 0) params.set('features', ids.join(','));
  const search = params.toString();
  // Commas are safe in a query string; keep them readable.
  return search ? `?${search.replaceAll('%2C', ',')}` : '';
}

export const quoteHref = (preset: string) => `/quote${selectionToSearch({ preset, features: [] })}`;

/** Reads the builder's fields from a submitted form. Anything unknown is dropped. */
export function quoteFromFormData(formData: FormData): QuoteDetails {
  const preset = formData.get('preset')?.toString();
  const budget = formData.get('budget')?.toString();
  return {
    preset: isPreset(preset) ? preset : undefined,
    budget: BUDGETS.find((option) => option.id === budget)?.id,
    features: normaliseFeatures(splitList(formData.get('features')?.toString())),
  };
}

export const hasQuoteDetails = (quote: QuoteDetails) =>
  !!quote.preset || !!quote.budget || quote.features.length > 0;

/** Effort for a set of features, in working days, without the base setup. */
export function estimateDays(ids: readonly FeatureId[]): readonly [number, number] {
  return ids.reduce<[number, number]>(
    ([min, max], id) => [min + features[id].days[0], max + features[id].days[1]],
    [0, 0]
  );
}

/** A rough range in weeks for a whole project: base setup plus each feature, five days a week. */
export function estimateWeeks(ids: readonly FeatureId[]): readonly [number, number] {
  const [minDays, maxDays] = estimateDays(ids);
  return [
    Math.max(1, Math.round((minDays + BASE_DAYS[0]) / 5)),
    Math.max(1, Math.ceil((maxDays + BASE_DAYS[1]) / 5)),
  ];
}

export function formatRange([min, max]: readonly [number, number], unit: 'week' | 'day'): string {
  const plural = max === 1 ? unit : `${unit}s`;
  return min === max ? `${min} ${plural}` : `${min}–${max} ${plural}`;
}

export type FeatureSize = 'S' | 'M' | 'L';

/** How each size reads in the legend and to screen readers. */
export const SIZE_LABELS: Record<FeatureSize, string> = {
  S: 'a few days',
  M: 'about a week',
  L: 'one to two weeks',
};

export function featureSize(id: FeatureId): FeatureSize {
  const max = features[id].days[1];
  return max <= 3 ? 'S' : max <= 6 ? 'M' : 'L';
}

/** Plain-text summary for the email, grouped like the builder. */
export function formatQuoteSummary(quote: QuoteDetails): string {
  const lines = ['Project builder', '---------------'];
  if (quote.preset)
    lines.push(`Started from: ${getCaseStudy(quote.preset)?.title ?? quote.preset}`);
  if (quote.budget) {
    lines.push(`Budget: ${BUDGETS.find((option) => option.id === quote.budget)?.label}`);
  }

  if (quote.features.length === 0) {
    lines.push('Features: none selected');
    return lines.join('\n');
  }

  lines.push(`Rough estimate: ${formatRange(estimateWeeks(quote.features), 'week')}`, '');
  for (const group of FEATURE_GROUPS) {
    const inGroup = quote.features.filter((id) => features[id].group === group.id);
    if (inGroup.length === 0) continue;
    lines.push(`${group.label}:`, ...inGroup.map((id) => `  - ${features[id].label}`));
  }
  return lines.join('\n');
}

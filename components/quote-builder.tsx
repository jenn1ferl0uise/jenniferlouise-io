'use client';

import { useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ContactForm from '@/components/contact-form';
import { FEATURE_GROUPS, FEATURE_IDS, features, type FeatureId } from '@/content/features';
import { trackEvent } from '@/lib/analytics';
import {
  BUDGETS,
  EMPTY_SELECTION,
  SIZE_LABELS,
  estimateWeeks,
  featureSize,
  formatRange,
  normaliseFeatures,
  presets,
  selectionFromSearch,
  selectionToSearch,
  type FeatureSize,
  type QuoteSelection,
} from '@/lib/quote';

const SIZES = Object.keys(SIZE_LABELS) as FeatureSize[];

const featuresByGroup = FEATURE_GROUPS.map((group) => ({
  ...group,
  ids: FEATURE_IDS.filter((id) => features[id].group === group.id),
}));

/**
 * The builder's state lives in the URL (?preset=…&features=…), so a selection can be shared or
 * linked to from a case study. `history.replaceState` keeps Next's useSearchParams in sync.
 */
export function QuoteBuilder() {
  const searchParams = useSearchParams();
  const selection = useMemo(() => selectionFromSearch(searchParams), [searchParams]);

  const update = (next: QuoteSelection) => {
    window.history.replaceState(null, '', `${window.location.pathname}${selectionToSearch(next)}`);
  };

  return <QuoteBuilderView selection={selection} onChange={update} />;
}

interface QuoteBuilderViewProps {
  selection: QuoteSelection;
  /** Absent while prerendered, before the URL has been read. */
  onChange?: (next: QuoteSelection) => void;
}

export function QuoteBuilderView({ selection, onChange }: QuoteBuilderViewProps) {
  const selected = new Set(selection.features);
  const estimate = formatRange(estimateWeeks(selection.features), 'week');

  const choosePreset = (id: string) => {
    const preset = presets.find((p) => p.id === id);
    if (!preset) return;
    trackEvent.quotePresetSelect(id);
    onChange?.({ preset: id, features: preset.features });
  };

  const toggleFeature = (id: FeatureId) => {
    const on = !selected.has(id);
    trackEvent.quoteFeatureToggle(id, on);
    const next = on ? [...selection.features, id] : selection.features.filter((f) => f !== id);
    onChange?.({ ...selection, features: normaliseFeatures(next) });
  };

  return (
    <>
      <section
        className="cell builder col-4"
        data-section="quote:builder"
        aria-labelledby="builder-h"
      >
        <span className="lbl">(1) your project</span>
        <h2 id="builder-h">What does it need?</h2>
        <p>
          Start from something I&apos;ve built, or from scratch. Then switch features on and off
          until it looks like your project.
        </p>

        <div className="builder-group" role="group" aria-labelledby="presets-h">
          <h3 id="presets-h" className="lbl">
            start from
          </h3>
          <div className="chips">
            <button
              type="button"
              className="chip"
              aria-pressed={!selection.preset}
              onClick={() => onChange?.(EMPTY_SELECTION)}
            >
              Scratch
            </button>
            {presets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                className="chip"
                aria-pressed={selection.preset === preset.id}
                onClick={() => choosePreset(preset.id)}
              >
                {preset.label}
              </button>
            ))}
          </div>
        </div>

        {featuresByGroup.map((group) => (
          <div
            key={group.id}
            className="builder-group"
            role="group"
            aria-labelledby={`group-${group.id}`}
          >
            <h3 id={`group-${group.id}`} className="lbl">
              {group.label.toLowerCase()}
            </h3>
            <div className="chips">
              {group.ids.map((id) => (
                <button
                  key={id}
                  type="button"
                  className="chip"
                  aria-pressed={selected.has(id)}
                  aria-describedby={`feature-${id}`}
                  title={features[id].description}
                  onClick={() => toggleFeature(id)}
                >
                  <span className="size" data-size={featureSize(id)} aria-hidden="true" />
                  {features[id].label}
                  <span id={`feature-${id}`} hidden>
                    {features[id].description} Effort: {SIZE_LABELS[featureSize(id)]}.
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}

        <ul className="fine size-legend" aria-label="Effort">
          {SIZES.map((size) => (
            <li key={size}>
              <span className="size" data-size={size} aria-hidden="true" />
              {SIZE_LABELS[size]}
            </li>
          ))}
        </ul>
      </section>

      <div className="summary-col col-2">
        <aside className="cell summary" aria-labelledby="summary-h">
          <span className="lbl">(2) rough timeline</span>
          <h2 id="summary-h" className="sr-only">
            Your selection
          </h2>
          <p className="estimate" aria-live="polite">
            ~{estimate}
          </p>
          <p className="fine">
            To design, build and launch
            {selection.features.length > 0
              ? ` with ${selection.features.length} feature${selection.features.length === 1 ? '' : 's'}`
              : ', before any features'}
            . A starting point, not a fixed price.
          </p>
          {selection.features.length > 0 && (
            <>
              <ul className="summary-list">
                {selection.features.map((id) => (
                  <li key={id}>{features[id].label}</li>
                ))}
              </ul>
              <button
                type="button"
                className="link-btn"
                onClick={() => onChange?.(EMPTY_SELECTION)}
              >
                Clear all
              </button>
            </>
          )}
        </aside>
      </div>

      <section className="cell quote-form col-4" aria-labelledby="quote-form-h">
        <span className="lbl">(3) send it</span>
        <h2 id="quote-form-h">
          Tell me about <em>it</em>
        </h2>
        <p>
          Your selection is sent along with your message, so I can reply with a proper estimate.
        </p>
        <ContactForm
          source="quote"
          messageLabel="About your project"
          submitLabel="Send quote request"
        >
          <input type="hidden" name="preset" value={selection.preset ?? ''} />
          <input type="hidden" name="features" value={selection.features.join(',')} />
          <fieldset className="field field-wide budget">
            <legend>Budget (optional)</legend>
            <div className="chips">
              {BUDGETS.map((budget) => (
                <label key={budget.id} className="chip">
                  <input type="radio" name="budget" value={budget.id} className="sr-only" />
                  {budget.label}
                </label>
              ))}
            </div>
          </fieldset>
        </ContactForm>
      </section>
    </>
  );
}

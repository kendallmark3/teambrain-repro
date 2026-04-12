import { useState } from 'react';
import {
  getRecommendation,
  type Concern,
  type Recommendation,
  type Region,
  type Season,
  type SkinType,
} from '../data/mockRecommendations';

const SKIN_TYPES: SkinType[] = ['Oily', 'Dry', 'Combination', 'Sensitive'];
const CONCERNS: Concern[] = ['Acne', 'Aging', 'Hydration', 'Brightening'];
const REGIONS: Region[] = ['North America', 'Europe', 'Asia', 'Middle East'];
const SEASONS: Season[] = ['Spring', 'Summer', 'Fall', 'Winter'];

/** Shows what AI looks like under intent governance: structured, consistent, context-aware. */
export function IntentPanel() {
  const [skinType, setSkinType] = useState<SkinType>('Oily');
  const [concern, setConcern] = useState<Concern>('Acne');
  const [region, setRegion] = useState<Region>('North America');
  const [season, setSeason] = useState<Season>('Spring');
  const [result, setResult] = useState<Recommendation | null>(null);

  function handleGenerate() {
    setResult(getRecommendation(skinType, concern));
  }

  return (
    <div className="panel panel--intent">
      <div className="panel__header">
        <span className="panel__badge panel__badge--intent">Intent-Driven</span>
        <h2 className="panel__title">With Governance</h2>
        <p className="panel__subtitle">Structured output — every time, for every customer</p>
      </div>

      <div className="panel__body">
        <div className="inputs">
          <div className="input-group">
            <label className="input-label">Skin Type</label>
            <select
              className="select"
              value={skinType}
              onChange={(e) => setSkinType(e.target.value as SkinType)}
            >
              {SKIN_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Concern</label>
            <select
              className="select"
              value={concern}
              onChange={(e) => setConcern(e.target.value as Concern)}
            >
              {CONCERNS.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Region</label>
            <select
              className="select"
              value={region}
              onChange={(e) => setRegion(e.target.value as Region)}
            >
              {REGIONS.map((r) => (
                <option key={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="input-group">
            <label className="input-label">Season</label>
            <select
              className="select"
              value={season}
              onChange={(e) => setSeason(e.target.value as Season)}
            >
              {SEASONS.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>

        <button className="btn btn--intent" onClick={handleGenerate}>
          Generate
        </button>

        {result !== null && (
          <div className="recommendation">
            <div className="recommendation__context">
              Context applied: {region} · {season}
            </div>

            <div className="recommendation__row">
              <span className="recommendation__label">Cleanser</span>
              <span className="recommendation__value">{result.cleanser}</span>
            </div>
            <div className="recommendation__row">
              <span className="recommendation__label">Serum</span>
              <span className="recommendation__value">{result.serum}</span>
            </div>
            <div className="recommendation__row">
              <span className="recommendation__label">Moisturizer</span>
              <span className="recommendation__value">{result.moisturizer}</span>
            </div>

            <p className="recommendation__rationale">{result.rationale}</p>
          </div>
        )}
      </div>
    </div>
  );
}

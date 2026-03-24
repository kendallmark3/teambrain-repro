import { useState } from 'react';
import { getUncontrolledResponse } from '../data/uncontrolledResponses';

/** Shows what AI looks like without intent: unpredictable, unstructured output. */
export function UncontrolledPanel() {
  const [response, setResponse] = useState<string | null>(null);

  function handleGenerate() {
    setResponse(getUncontrolledResponse());
  }

  return (
    <div className="panel panel--uncontrolled">
      <div className="panel__header">
        <span className="panel__badge panel__badge--uncontrolled">No Intent</span>
        <h2 className="panel__title">Without Governance</h2>
        <p className="panel__subtitle">Raw AI output — no constraints, no structure</p>
      </div>

      <div className="panel__body">
        <button className="btn btn--uncontrolled" onClick={handleGenerate}>
          Generate
        </button>

        {response !== null && (
          <div className="uncontrolled-output">
            <p className="uncontrolled-output__text">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
}

import { useEffect, useState } from "react";
import { apiFetch, ApiError } from "./api/client";

interface HealthResponse {
  status: string;
  timestamp: string;
  uptime: number;
}

type FetchState =
  | { phase: "idle" }
  | { phase: "loading" }
  | { phase: "ok"; data: HealthResponse }
  | { phase: "error"; message: string };

/**
 * Root component — demonstrates end-to-end connectivity by fetching the
 * server health endpoint on mount and displaying the result.
 */
export default function App() {
  const [state, setState] = useState<FetchState>({ phase: "idle" });

  useEffect(() => {
    setState({ phase: "loading" });

    apiFetch<HealthResponse>("/health")
      .then((data) => setState({ phase: "ok", data }))
      .catch((err) => {
        const message =
          err instanceof ApiError
            ? `${err.status}: ${err.message}`
            : "Unknown error";
        setState({ phase: "error", message });
      });
  }, []);

  return (
    <main style={styles.container}>
      <h1 style={styles.heading}>TeamBrain API</h1>

      {state.phase === "loading" && (
        <p style={styles.muted}>Checking server health…</p>
      )}

      {state.phase === "ok" && (
        <div style={styles.card}>
          <span style={{ ...styles.badge, ...styles.badgeOk }}>
            {state.data.status}
          </span>
          <dl style={styles.dl}>
            <dt>Timestamp</dt>
            <dd>{new Date(state.data.timestamp).toLocaleString()}</dd>
            <dt>Uptime</dt>
            <dd>{state.data.uptime}s</dd>
          </dl>
        </div>
      )}

      {state.phase === "error" && (
        <div style={styles.card}>
          <span style={{ ...styles.badge, ...styles.badgeError }}>error</span>
          <p style={styles.errorText}>{state.message}</p>
        </div>
      )}
    </main>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    fontFamily: "system-ui, sans-serif",
    maxWidth: 480,
    margin: "4rem auto",
    padding: "0 1rem",
  },
  heading: { marginBottom: "1.5rem" },
  muted: { color: "#6b7280" },
  card: {
    border: "1px solid #e5e7eb",
    borderRadius: 8,
    padding: "1.25rem",
  },
  badge: {
    display: "inline-block",
    padding: "2px 10px",
    borderRadius: 9999,
    fontSize: 13,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "1rem",
  },
  badgeOk: { background: "#d1fae5", color: "#065f46" },
  badgeError: { background: "#fee2e2", color: "#991b1b" },
  dl: { margin: 0, display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 16px" },
  errorText: { margin: 0, color: "#991b1b", fontSize: 14 },
};

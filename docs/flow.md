# System Flow — Python OTEL Agent Framework

```mermaid
flowchart TD
    subgraph CLUSTER["App Team Kubernetes Cluster"]
        direction TB

        subgraph SVC1["Microservice A (Python)"]
            APP1[App Code]
            AGT1[Python OTEL Agent\nsidecar / init container]
        end

        subgraph SVC2["Microservice B (Python)"]
            APP2[App Code]
            AGT2[Python OTEL Agent\nsidecar / init container]
        end

        subgraph SVC3["Microservice C (Python)"]
            APP3[App Code]
            AGT3[Python OTEL Agent\nsidecar / init container]
        end

        CP[Control Plane\nAgent Config & Registration]
        COL[OTEL Collector]
        BUF[Agent Buffer\nRetry Queue]

        APP1 -->|framework layer only\nno business logic touch| AGT1
        APP2 --> AGT2
        APP3 --> AGT3

        CP -->|Kubernetes annotations\nConfigMaps / Helm values\nno OTEL knowledge needed| AGT1
        CP --> AGT2
        CP --> AGT3

        AGT1 -->|traces · metrics · logs| COL
        AGT2 --> COL
        AGT3 --> COL

        AGT1 -- collector down --> BUF
        AGT2 -- collector down --> BUF
        AGT3 -- collector down --> BUF
        BUF -->|retry when restored| COL

        COL -->|K8s Event / health endpoint| HEALTH[Collector Status\nSurfaced to App Teams]
    end

    subgraph BACKENDS["Observability Backends"]
        TRACE[Jaeger / Tempo\nDistributed Tracing]
        METRICS[Prometheus / Grafana\nMetrics & Dashboards]
        LOGS[Existing Log Pipeline\nnot replaced]
    end

    COL --> TRACE
    COL --> METRICS
    COL -.->|coexists with| LOGS

    subgraph SCOPE["Out of Scope"]
        NOREM[❌ Auto-Remediation]
        NOMOD[❌ Business Logic Modification]
        NOBARE[❌ Non-Kubernetes / Bare Metal]
    end

    style CLUSTER fill:#1e293b,stroke:#3b82f6,color:#f8fafc
    style BACKENDS fill:#14532d,stroke:#22c55e,color:#f8fafc
    style SCOPE fill:#450a0a,stroke:#ef4444,color:#f8fafc
    style BUF fill:#78350f,stroke:#f59e0b,color:#f8fafc
    style HEALTH fill:#1e3a5f,stroke:#60a5fa,color:#f8fafc
```

## Flow Summary

| Step | What Happens | Constraint Enforced |
|------|-------------|---------------------|
| 1. App team configures agent | Via K8s annotations / ConfigMaps only | Zero OTEL knowledge required |
| 2. Control plane registers agent | Agent pulls config from control plane | Control plane required |
| 3. Agent instruments service | Framework/middleware layer only | No business logic modification |
| 4. Telemetry flows to collector | Traces, metrics, structured logs | Observe only — no remediation |
| 5. Collector goes down | Agent buffers and retries | Collector downtime must not crash services |
| 6. Outage surfaced | K8s Event or health endpoint | Collector connectivity surfaced to app teams |
| 7. Collector exports | To tracing, metrics backends | Existing log pipeline coexists, not replaced |

"""
Real-Time Signal Monitoring System
Intent-driven demo: clean architecture with live visualization.
"""

import numpy as np
import matplotlib.pyplot as plt
import matplotlib.animation as animation
from abc import ABC, abstractmethod
from collections import deque


# --- Abstract interface: defines the contract for any signal processor ---

class SignalProcessor(ABC):
    @abstractmethod
    def generate_signal(self) -> float:
        """Generate the next signal sample."""
        ...

    @abstractmethod
    def detect_anomaly(self, value: float) -> bool:
        """Return True if the value is anomalous."""
        ...


# --- Concrete implementation: sine wave + noise + random spikes ---

class RealTimeSignalProcessor(SignalProcessor):
    def __init__(self):
        self.tick = 0

    def generate_signal(self) -> float:
        # Smooth sine baseline + Gaussian noise + occasional spike
        baseline = np.sin(2 * np.pi * self.tick / 20)
        noise = np.random.normal(0, 0.3)
        spike = np.random.choice([0, np.random.uniform(3, 5)], p=[0.95, 0.05])
        self.tick += 1
        return baseline + noise + spike

    def detect_anomaly(self, value: float) -> bool:
        # Any sample with absolute value > 2 is flagged
        return abs(value) > 2


# --- Live visualization ---

def main():
    processor = RealTimeSignalProcessor()
    window = 100  # number of visible ticks on the chart

    times = deque(maxlen=window)
    values = deque(maxlen=window)

    fig, ax = plt.subplots(figsize=(12, 5))
    fig.patch.set_facecolor("#1a1a2e")
    ax.set_facecolor("#16213e")

    line_signal, = ax.plot([], [], color="#00d4ff", linewidth=1.5, label="Signal")
    line_avg, = ax.plot([], [], color="#f5a623", linewidth=1.5, linestyle="--", label="Moving Average")
    scatter_anomaly = ax.scatter([], [], color="red", s=60, zorder=5, label="Anomaly")

    ax.set_title("Intent-Driven Engineering (LearnTeachMaster.org)", color="white", fontsize=14, pad=12)
    ax.set_xlabel("Time (ticks)", color="#aaaaaa")
    ax.set_ylabel("Signal Value", color="#aaaaaa")
    ax.tick_params(colors="#aaaaaa")
    for spine in ax.spines.values():
        spine.set_edgecolor("#333366")
    ax.legend(loc="upper left", facecolor="#1a1a2e", labelcolor="white")
    ax.set_ylim(-6, 7)

    def update(_frame):
        value = processor.generate_signal()
        tick = processor.tick
        times.append(tick)
        values.append(value)

        t_arr = np.array(times)
        v_arr = np.array(values)

        line_signal.set_data(t_arr, v_arr)

        # Moving average (window=5) — only valid once we have 5+ samples
        if len(v_arr) >= 5:
            avg = np.convolve(v_arr, np.ones(5) / 5, mode="valid")
            line_avg.set_data(t_arr[4:], avg)  # align: valid output starts at index 4
        else:
            line_avg.set_data([], [])

        # Anomaly scatter points
        anomaly_mask = np.array([processor.detect_anomaly(v) for v in v_arr])
        if anomaly_mask.any():
            scatter_anomaly.set_offsets(np.c_[t_arr[anomaly_mask], v_arr[anomaly_mask]])
        else:
            scatter_anomaly.set_offsets(np.empty((0, 2)))

        ax.set_xlim(t_arr[0], max(t_arr[-1], t_arr[0] + window))
        return line_signal, line_avg, scatter_anomaly

    ani = animation.FuncAnimation(fig, update, interval=500, blit=False, cache_frame_data=False)
    plt.tight_layout()
    plt.show()


if __name__ == "__main__":
    main()

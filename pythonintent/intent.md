# TITLE:
Real-Time Signal Monitoring System (Intent-Driven Demo)

# INTENT:
Build a clean, class-based Python application that simulates a real-time signal monitoring system. 
The system should continuously generate synthetic signal data, detect anomalies, and visualize the data live using a line chart.

This demo is meant to showcase:
- Intent-driven engineering
- Clean architecture (interface + implementation)
- Real-time system behavior
- Data processing using NumPy
- Visualization using Matplotlib

# REQUIREMENTS:

1. ARCHITECTURE:
- Create an abstract base class called `SignalProcessor`
    - Method: generate_signal()
    - Method: detect_anomaly(value)

- Create a concrete implementation:
    - Class: RealTimeSignalProcessor
    - Uses NumPy to generate signal data
    - Simulates:
        - Smooth sine wave baseline
        - Random Gaussian noise
        - Occasional spikes (anomalies)

2. SIGNAL LOGIC:
- Use NumPy to:
    - Generate sine wave signal
    - Add noise (normal distribution)
    - Randomly inject spikes (~5% probability)
- An anomaly is any value where abs(value) > 2

3. VISUALIZATION:
- Use matplotlib
- Create a live updating line chart using animation
- Update every 500ms

4. GRAPH REQUIREMENTS:
- Title: "Real-Time Signal Monitoring System"
- X-axis: Time (ticks)
- Y-axis: Signal Value
- Plot:
    - Main signal line
    - Highlight anomalies as red dots
- Include legend:
    - "Signal"
    - "Anomaly"

5. OPTIONAL ENHANCEMENT (include this):
- Add moving average (window = 5)
- Plot as dashed line labeled "Moving Average"

6. EXECUTION:
- Provide a main() function
- Script must run immediately when executed
- No user input required
- Should open a live graph window

7. CODE STYLE:
- Keep code clean and readable
- Use comments to explain key sections
- Keep total code reasonably concise (~60–100 lines)

8. LIBRARIES:
- numpy
- matplotlib
- abc (for interface)

9. OUTPUT:
- Provide a complete Python script
- No placeholders
- Ready to copy, paste, and run

# GOAL:
When executed, the program should:
- Continuously generate signal data
- Display a live updating graph
- Show anomalies in real time
- Demonstrate a clean, extensible architecture

# EXTRA CONTEXT:
This is a teaching/demo tool for engineers to understand how intent-driven systems can translate into working code quickly.
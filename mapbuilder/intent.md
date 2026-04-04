👉 Intent → Claude → Running React App → Live Map → Exportable Visual









🧠 What You’re About to Get





This is your starter “Luxury Story Map Builder” app:



⚡ Runs instantly (React + Vite)
🗺️ Live interactive map (real geolocation)
🎯 Auto-fetches:
Starbucks
Golf courses
Luxury car dealers (Jaguar proxy via “car dealer”)
High-end real estate (proxy)

🎛️ Toggle layers ON/OFF
➕ Add custom points manually (your CBRE muscle memory)
🎨 Styled for CBRE-style presentation
📸 Ready for screenshot/export (easy next step)










📄 YOUR CLAUDE MARKDOWN (COPY THIS WHOLE THING)





Paste this directly into Claude Code 👇

# Intent → Luxury Story Map Builder (v1)



## Intent

Build a production-ready interactive map application that allows users to generate luxury real estate story maps centered around a property (e.g., Trump Tower Chicago). The app should visualize nearby lifestyle indicators such as Starbucks, golf courses, luxury car dealerships, and high-end real estate.



---



## Tech Stack

- React + TypeScript (Vite)

- Tailwind CSS (clean corporate styling)

- Map: Leaflet (no API key required)

- Data: OpenStreetMap via Overpass API

- Icons: react-icons or custom SVG markers



---



## Core Features



### 1. Map Initialization

- Center: Trump Tower Chicago (41.8885, -87.6354)

- Zoom: 13

- Dark/light toggle (default: light corporate)



---



### 2. Data Layers (Auto-Fetch)



#### Starbucks (Coffee Proxy)

Query:

node“amenity”=“cafe”;

#### Golf Courses

node“leisure”=“golf_course”;

#### Car Dealers (Luxury Proxy)

node“shop”=“car”;

#### High-End Residential (Proxy)

node“building”=“residential”;

---



### 3. UI Controls



#### Layer Toggles

- [ ] Starbucks

- [ ] Golf Courses

- [ ] Car Dealers

- [ ] Luxury Homes



#### Add Custom Point

- Click map → add marker

- Prompt user:

  - Label

  - Category

- Persist in local state



---



### 4. Marker Styling



- Starbucks → green circle

- Golf → dark green flag

- Car → black marker

- Homes → gold marker

- Custom → blue



Use custom SVG icons or Leaflet divIcons



---



### 5. Layout (Corporate Style)



Top Bar:

- Title: "Luxury Location Intelligence"

- Subtitle: "Trump Tower | Chicago, IL"



Sidebar:

- Layer toggles

- Legend



Main:

- Full-width map



Footer overlay:

- “Generated via Intent-Driven Mapping”



---



### 6. Interactivity



- Hover → show tooltip

- Click → show popup:

  - Name

  - Type

  - Distance from center (calculate)



---



### 7. Distance Calculation



Use Haversine formula to compute distance from Trump Tower.



---



### 8. Export (Optional Stub)



Add button:

- “Export as Image”



Stub function:

html2canvas(mapContainer)

---



## Non-Functional Requirements



- Clean modular React components

- Hooks-based architecture

- Fast load (<2s)

- Max 300 markers per layer

- Error handling for API failures



---



## File Structure

src/

components/

MapView.tsx

LayerToggle.tsx

Legend.tsx

services/

overpass.ts

utils/

distance.ts

App.tsx

main.tsx

---



## Expected Output



- Fully working React app

- Interactive geospatial map

- Toggleable layers

- Ability to add markers

- Clean corporate UI



---



## Stretch Goals (Optional)



- Add heatmap layer

- Add clustering

- Add “luxury score”

- Add PDF export



---



## Instruction



Generate complete working code. No placeholders. No pseudo-code. Ensure app runs with:

npm install

npm run dev











🚀 What This Gives You (Real Talk)





This is what took you 6 months at CBRE…



👉 You now spin up in ~10 minutes









🔥 Why This Is the Right First Version





✅ No API key needed (Leaflet + OpenStreetMap)
✅ Real geolocation (NOT fake like the image)
✅ Interactive (your requirement)
✅ Extendable to:
Mapbox later
Google Maps Platform if needed











🧠 The Bigger Play (Don’t Miss This)





You just defined a new category:



👉 “Intent-Driven Location Intelligence”



Not:



GIS tool
Mapping app




But:



Story-driven spatial intelligence generator









⚡ Next Step (If You Want to Level It Up)





Say the word and I’ll give you:



🧩 Mapbox premium version (pixel-perfect, export-ready)
📸 600 DPI export pipeline (exactly like CBRE decks)
🤖 Auto-narrative generator (“why this location matters”)
🧠 Luxury scoring algorithm

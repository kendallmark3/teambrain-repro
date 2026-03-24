import { UncontrolledPanel } from './components/UncontrolledPanel';
import { IntentPanel } from './components/IntentPanel';

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <div className="header__inner">
          <span className="header__brand">L'ORÉAL</span>
          <h1 className="header__title">Beauty Intelligence</h1>
          <p className="header__tagline">Intent-Driven AI · Powered by TeamBrain</p>
        </div>
      </header>

      <main className="main">
        <div className="panels">
          <UncontrolledPanel />
          <IntentPanel />
        </div>
      </main>

      <footer className="footer">
        <p>"We're not scaling prompts. We're scaling decisions."</p>
      </footer>
    </div>
  );
}

import usePinger from "./hooks/usePinger"; // Import the custom hook
import useInputs from "./hooks/useInputs";

import "./App.css";

function App() {
  const {
    url,
    bearerToken,
    delayMs,
    handleUrlChange,
    handleBearerTokenChange,
    handleDelayMsChange,
  } = useInputs();

  const { pinging, success, startPinging, stopPinging } = usePinger({
    url,
    bearerToken,
    delayMs,
  });

  return (
    <div className="container">
      <h1>URL Pinger</h1>
      <div>
        <label>
          URL
          <input
            disabled={pinging}
            type="text"
            value={url}
            onChange={handleUrlChange}
          />
        </label>
      </div>
      <div>
        <label>
          Bearer Token&nbsp;<small>(Optional)</small>
          <input
            disabled={pinging}
            type="text"
            value={bearerToken}
            onChange={handleBearerTokenChange}
          />
        </label>
      </div>
      <div>
        <label>
          Delay (ms)
          <input
            disabled={pinging}
            type="number"
            value={delayMs}
            onChange={handleDelayMsChange}
          />
        </label>
      </div>
      <div className="actions">
        {pinging ? (
          <button onClick={stopPinging}>Stop Pinging</button>
        ) : (
          <button onClick={startPinging}>Start Pinging</button>
        )}
      </div>
      {pinging && (
        <div className={["status", success ? "success" : "error"].join(" ")}>
          {success ? "OK" : "ERROR"}
        </div>
      )}
    </div>
  );
}

export default App;

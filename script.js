// =========================
// GLOBAL MODE
// =========================

let currentMode = "new";

// =========================
// INITIAL LOAD
// =========================

window.onload = function () {

  updateTimestamp();

  renderCandleInputs();

  setMode("new");

};

// =========================
// TIMESTAMP ENGINE
// =========================

function updateTimestamp() {

  const now = new Date();

  const dateOptions = {

    day: "2-digit",
    month: "short",
    year: "numeric"

  };

  const timeOptions = {

    hour: "2-digit",
    minute: "2-digit"

  };

  document.getElementById(
    "currentDate"
  ).innerText =

    now.toLocaleDateString(
      "en-IN",
      dateOptions
    );

  document.getElementById(
    "currentTime"
  ).innerText =

    now.toLocaleTimeString(
      "en-IN",
      timeOptions
    );

}

// =========================
// MODE SWITCHER
// =========================

function setMode(mode) {

  currentMode = mode;

  document
    .getElementById("modeNew")
    .classList.remove("active-mode");

  document
    .getElementById("modeWatchlist")
    .classList.remove("active-mode");

  document
    .getElementById("modeActive")
    .classList.remove("active-mode");

  document
    .getElementById("watchlistSection")
    .classList.add("hidden");

  document
    .getElementById("activeTradeSection")
    .classList.add("hidden");

  if (mode === "new") {

    document
      .getElementById("modeNew")
      .classList.add("active-mode");

    document
      .getElementById("modeTitle")
      .innerText =
      "New Scan";

    document
      .getElementById("modeSubtitle")
      .innerText =
      "Analyze fresh market opportunities";

  }

  else if (mode === "watchlist") {

    document
      .getElementById("modeWatchlist")
      .classList.add("active-mode");

    document
      .getElementById("watchlistSection")
      .classList.remove("hidden");

    document
      .getElementById("modeTitle")
      .innerText =
      "Watchlist Follow-Up";

    document
      .getElementById("modeSubtitle")
      .innerText =
      "Review and revalidate shortlisted setups";

  }

  else if (mode === "active") {

    document
      .getElementById("modeActive")
      .classList.add("active-mode");

    document
      .getElementById("activeTradeSection")
      .classList.remove("hidden");

    document
      .getElementById("modeTitle")
      .innerText =
      "Active Trade Follow-Up";

    document
      .getElementById("modeSubtitle")
      .innerText =
      "Manage live running positions";

  }

}

// =========================
// ADVANCED TOGGLE
// =========================

function toggleAdvancedSection() {

  const toggle =

    document.getElementById(
      "advancedToggle"
    );

  const section =

    document.getElementById(
      "advancedSection"
    );

  if (toggle.checked) {

    section.classList.remove(
      "hidden"
    );

  }

  else {

    section.classList.add(
      "hidden"
    );

  }

}

// =========================
// CANDLE INPUTS
// =========================

function renderCandleInputs() {

  const candleContainer =

    document.getElementById(
      "candleContainer"
    );

  const candleTitles = [

    "Most Recent Candle",

    "Previous Candle",

    "2 Candles Ago",

    "3 Candles Ago",

    "4 Candles Ago"

  ];

  let html = "";

  for (let i = 1; i <= 5; i++) {

    html += `

      <div class="candle-block">

        <h3>
          ${candleTitles[i - 1]}
        </h3>

        <div class="input-grid">

          <div class="input-group">

            <label>
              Closing Price
            </label>

            <input
              type="number"
              id="close${i}"
              placeholder="Close Price"
            />

          </div>

          <div class="input-group">

            <label>
              Candle Nature
            </label>

            <select id="nature${i}">

              <option value="Bullish">
                Bullish
              </option>

              <option value="Bearish">
                Bearish
              </option>

            </select>

          </div>

          <div class="input-group">

            <label>
              Volume
            </label>

            <input
              type="text"
              id="volume${i}"
              placeholder="10L / 15M / 1Cr"
            />

          </div>

        </div>

      </div>

    `;

  }

  candleContainer.innerHTML = html;

}

// =========================
// RESET ENGINE
// =========================

function resetAllFields() {

  const inputs =
    document.querySelectorAll(
      "input"
    );

  inputs.forEach(input => {

    if (
      input.type !== "checkbox"
    ) {

      input.value = "";

    }

  });

  const selects =
    document.querySelectorAll(
      "select"
    );

  selects.forEach(select => {

    select.selectedIndex = 0;

  });

  document.getElementById(
    "advancedToggle"
  ).checked = false;

  toggleAdvancedSection();

  document
    .getElementById("resultCard")
    .classList.add("hidden");

}

// =========================
// ANALYZE STOCK
// =========================

function analyzeStock() {

  const stockName = safeString(

    document.getElementById(
      "stockName"
    ).value

  );

  const timeframe = safeString(

    document.getElementById(
      "timeframe"
    ).value,

    "Daily"

  );

  const ltp = safeNumber(

    document.getElementById(
      "ltp"
    ).value

  );

  const ema20 = safeNumber(

    document.getElementById(
      "ema20"
    ).value

  );

  const ema50 = safeNumber(

    document.getElementById(
      "ema50"
    ).value

  );

  const rsi = safeNumber(

    document.getElementById(
      "rsi"
    ).value

  );

  // =========================
  // VALIDATION
  // =========================

  const basicValidation =

    validateBasicInputs({

      stockName,
      ltp,
      ema20,
      ema50,
      rsi

    });

  if (!basicValidation.valid) {

    alert(
      basicValidation.message
    );

    return;

  }

  // =========================
  // ADVANCED ENGINE
  // =========================

  const advancedEnabled = safeBoolean(

    document.getElementById(
      "advancedToggle"
    ).checked

  );

  // =========================
  // SETUP ENGINE
  // =========================

  const setupData =

    calculateSetupScores({

      ltp,
      ema20,
      ema50,
      rsi,
      timeframe

    });

  // =========================
  // DEFAULT MOMENTUM
  // =========================

  let momentumData = {

    momentumScore: 0,

    relativeVolumeStatus:
      "Not Enabled",

    momentumTrend:
      "Basic Engine Only",

    participationTrend:
      "Basic Engine Only",

    weaknessDetected: false

  };

  // =========================
  // ADVANCED ANALYSIS
  // =========================

  if (advancedEnabled) {

    const candles = [];

    for (let i = 1; i <= 5; i++) {

      candles.push({

        close: safeNumber(

          document.getElementById(
            "close" + i
          ).value

        ),

        nature: safeString(

          document.getElementById(
            "nature" + i
          ).value,

          "Bullish"

        ),

        volume: safeNumber(

          parseVolume(

            document.getElementById(
              "volume" + i
            ).value

          )

        )

      });

    }

    const candleValidation =

      validateCandleInputs(
        candles
      );

    if (!candleValidation.valid) {

      alert(
        candleValidation.message
      );

      return;

    }

    momentumData =

      calculateMomentum({

        advancedEnabled,
        candles

      });

  }

  // =========================
  // VERDICT ENGINE
  // =========================

  const verdictData =

    generateVerdict({

      ...setupData,

      ...momentumData,

      ltp,
      ema20,
      ema50,
      rsi,
      timeframe,

      advancedEnabled

    });

  // =========================
  // REASONING ENGINE
  // =========================

  const reasons = safeArray(

    generateReasons({

      ...setupData,

      ...momentumData,

      ...verdictData,

      ltp,
      ema20,
      ema50,
      rsi,

      advancedEnabled

    })

  );

  // =========================
  // TRADE PLAN ENGINE
  // =========================

  const tradePlan =

    generateTradePlan({

      ...setupData,

      ...momentumData,

      ...verdictData,

      ltp,
      ema20,
      ema50,
      rsi

    });

  // =========================
  // POSITION SIZE ENGINE
  // =========================

  let positionData = {

    quantity: 0,

    riskAmount: 0,

    positionValue: 0,

    perShareRisk: 0,

    warning: "",

    message:
      "Position Size Not Calculated"

  };

  if (verdictData.verdict === "BUY") {

    const capital = 100000;

    const riskPercent = 1;

    const numericSL = safeNumber(
      tradePlan.stopLoss
    );

    if (numericSL > 0) {

      positionData =

        calculatePositionSize({

          capital,

          riskPercent,

          entryPrice: ltp,

          stopLoss: numericSL

        });

    }

  }

  // =========================
  // ACTIVE TRADE MODE
  // =========================

  if (currentMode === "active") {

    const executedEntry = safeNumber(

      document.getElementById(
        "executedEntry"
      ).value

    );

    const currentSL = safeNumber(

      document.getElementById(
        "currentSL"
      ).value

    );

    const currentTarget = safeNumber(

      document.getElementById(
        "currentTarget"
      ).value

    );

    const quantity = safeNumber(

      document.getElementById(
        "quantityTraded"
      ).value

    );

    const activeValidation =

      validateActiveTradeInputs({

        executedEntry,
        currentSL,
        currentTarget,
        quantity

      });

    if (!activeValidation.valid) {

      alert(
        activeValidation.message
      );

      return;

    }

    const tradeData =

      manageActiveTrade({

        ...setupData,

        ...momentumData,

        ...verdictData,

        ltp,
        ema20,
        ema50,
        rsi,

        executedEntry,
        currentSL,
        currentTarget,
        quantity

      });

    renderTradeResults({

      stockName,
      timeframe,

      ...setupData,

      ...momentumData,

      ...verdictData,

      ...tradeData

    });

    return;

  }

  // =========================
  // STANDARD RESULTS
  // =========================

  renderStandardResults({

    stockName,
    timeframe,

    ...setupData,

    ...momentumData,

    ...verdictData,

    ...tradePlan,

    ...positionData,

    reasons

  });

}

// =========================
// SCORE BAR
// =========================

function generateScoreBar(score) {

  return `

    <div class="score-bar">

      <div
        class="score-fill"
        style="width:${safeScore(score)}%"
      ></div>

    </div>

  `;

}

// =========================
// BADGE GENERATOR
// =========================

function generateBadges(badges) {

  return badges.map(badge => {

    return `

      <div class="badge badge-${badge.type}">

        ${badge.text}

      </div>

    `;

  }).join("");

}

// =========================
// RISK PILL
// =========================

function generateRiskPill(risk) {

  let className = "risk-medium";

  if (risk === "Low")
    className = "risk-low";

  if (risk === "High")
    className = "risk-high";

  return `

    <div class="risk-pill ${className}">

      ${risk} Risk

    </div>

  `;

}

// =========================
// CONFIDENCE METER
// =========================

function generateConfidenceMeter(confidence) {

  return `

    <div class="confidence-wrapper">

      <div class="confidence-label">

        <span>
          Execution Confidence
        </span>

        <span>
          ${confidence}%
        </span>

      </div>

      <div class="confidence-bar">

        <div
          class="confidence-fill"
          style="width:${confidence}%"
        ></div>

      </div>

    </div>

  `;

}

// =========================
// STANDARD RESULTS
// =========================

function renderStandardResults(data) {

  const resultCard =
    document.getElementById(
      "resultCard"
    );

  const resultContent =
    document.getElementById(
      "resultContent"
    );

  const setupFullName =

    APP_CONFIG.SETUP_NAMES[
      safeText(data.setup)
    ];

  let verdictClass = "avoid";
  let verdictCardClass = "avoid-card";

  if (data.verdict === "BUY") {

    verdictClass = "buy";
    verdictCardClass = "buy-card";

  }

  if (data.verdict === "WATCH") {

    verdictClass = "watch";
    verdictCardClass = "watch-card";

  }

  // =========================
  // POSITION SIZE
  // =========================

  let positionSizeHTML = "";

  if (data.verdict === "BUY") {

    positionSizeHTML = `

      <div class="card buy-card">

        <div class="section-header">

          <h3>
            Position Size
          </h3>

        </div>

        <div class="result-grid">

          <div class="result-item">

            <h4>
              Suggested Quantity
            </h4>

            <p>
              ${safeText(data.quantity)}
            </p>

          </div>

          <div class="result-item">

            <h4>
              Risk Amount
            </h4>

            <p>
              ${safeCurrency(data.riskAmount)}
            </p>

          </div>

          <div class="result-item">

            <h4>
              Position Value
            </h4>

            <p>
              ${safeCurrency(data.positionValue)}
            </p>

          </div>

          <div class="result-item">

            <h4>
              Per Share Risk
            </h4>

            <p>
              ${safeCurrency(data.perShareRisk)}
            </p>

          </div>

        </div>

      </div>

    `;

  }

  // =========================
  // RESULT HTML
  // =========================

  resultContent.innerHTML = `

    <!-- =========================
         VERDICT HERO
    ========================== -->

    <div class="card ${verdictCardClass}">

      <div class="section-header">

        <h3>
          Final Verdict
        </h3>

      </div>

      <div class="result-grid">

        <div class="result-item">

          <h4>
            Verdict
          </h4>

          <p class="${verdictClass}">
            ${safeText(data.verdict)}
          </p>

        </div>

        <div class="result-item">

          <h4>
            Setup Grade
          </h4>

          <p>
            ${safeText(data.setupGrade)}
          </p>

        </div>

        <div class="result-item">

          <h4>
            Setup
          </h4>

          <p>
            ${safeText(data.setup)}
          </p>

          <small>
            ${safeText(setupFullName)}
          </small>

        </div>

        <div class="result-item">

          <h4>
            Trade Action
          </h4>

          <p>
            ${safeText(data.tradeAction)}
          </p>

        </div>

      </div>

      ${generateConfidenceMeter(
        safeScore(
          data.executionConfidence
        )
      )}

      <div class="badge-container">

        ${generateBadges(
          safeArray(
            data.signalBadges
          )
        )}

      </div>

    </div>

    <!-- =========================
         TRADE PLAN
    ========================== -->

    <div class="card">

      <div class="section-header">

        <h3>
          Trade Plan
        </h3>

      </div>

      <div class="result-grid">

        <div class="result-item">

          <h4>
            Entry Zone
          </h4>

          <p>
            ${safeText(data.entryZone)}
          </p>

        </div>

        <div class="result-item">

          <h4>
            Trigger Zone
          </h4>

          <p>
            ${safeText(data.triggerZone)}
          </p>

        </div>

        <div class="result-item">

          <h4>
            Stop Loss
          </h4>

          <p class="avoid">
            ${safeText(data.stopLoss)}
          </p>

        </div>

        <div class="result-item">

          <h4>
            Target
          </h4>

          <p class="buy">
            ${safeText(data.target)}
          </p>

        </div>

        <div class="result-item">

          <h4>
            Risk Level
          </h4>

          ${generateRiskPill(
            safeText(data.riskLevel)
          )}

        </div>

      </div>

    </div>

    <!-- =========================
         SETUP SCORES
    ========================== -->

    <div class="card">

      <div class="section-header">

        <h3>
          Setup Scores
        </h3>

      </div>

      <div class="result-grid">

        <div class="result-item">

          <h4>
            Setup Score
          </h4>

          <p>
            ${safeScore(data.setupScore)}/100
          </p>

          ${generateScoreBar(
            data.setupScore
          )}

        </div>

        <div class="result-item">

          <h4>
            CB Score
          </h4>

          <p>
            ${safeScore(data.cbScore)}/100
          </p>

          ${generateScoreBar(
            data.cbScore
          )}

        </div>

        <div class="result-item">

          <h4>
            PC Score
          </h4>

          <p>
            ${safeScore(data.pcScore)}/100
          </p>

          ${generateScoreBar(
            data.pcScore
          )}

        </div>

        <div class="result-item">

          <h4>
            RB Score
          </h4>

          <p>
            ${safeScore(data.rbScore)}/100
          </p>

          ${generateScoreBar(
            data.rbScore
          )}

        </div>

      </div>

    </div>

    <!-- =========================
         MOMENTUM ANALYSIS
    ========================== -->

    <div class="card">

      <div class="section-header">

        <h3>
          Momentum Analysis
        </h3>

      </div>

      <div class="result-grid">

        <div class="result-item">

          <h4>
            Momentum Score
          </h4>

          <p>
            ${safeScore(
              data.momentumScore
            )}/100
          </p>

          ${generateScoreBar(
            data.momentumScore
          )}

        </div>

        <div class="result-item">

          <h4>
            Momentum Trend
          </h4>

          <p>
            ${safeText(
              data.momentumTrend
            )}
          </p>

        </div>

        <div class="result-item">

          <h4>
            Participation Trend
          </h4>

          <p>
            ${safeText(
              data.participationTrend
            )}
          </p>

        </div>

        <div class="result-item">

          <h4>
            Relative Volume
          </h4>

          <p>
            ${safeText(
              data.relativeVolumeStatus
            )}
          </p>

        </div>

      </div>

    </div>

    ${positionSizeHTML}

    <!-- =========================
         REASONS
    ========================== -->

    <div class="reason-box">

      <h3>
        Why This Verdict?
      </h3>

      <ul>

        ${safeArray(data.reasons)
          .map(
            item =>
              `<li>${safeText(item)}</li>`
          )
          .join("")}

      </ul>

    </div>

    ${data.warning ? `

      <div class="reason-box">

        <h3>
          Warning
        </h3>

        <ul>

          <li>
            ${safeText(data.warning)}
          </li>

        </ul>

      </div>

    ` : ""}

  `;

  resultCard.classList.remove(
    "hidden"
  );

}

// =========================
// TRADE RESULTS
// =========================

function renderTradeResults(data) {

  const resultCard =
    document.getElementById(
      "resultCard"
    );

  const resultContent =
    document.getElementById(
      "resultContent"
    );

  resultContent.innerHTML = `

    <div class="card buy-card">

      <div class="section-header">

        <h3>
          Active Trade Management
        </h3>

      </div>

      <div class="result-grid">

        <div class="result-item">

          <h4>
            Stock Name
          </h4>

          <p>
            ${safeText(data.stockName)}
          </p>

        </div>

        <div class="result-item">

          <h4>
            Timeframe
          </h4>

          <p>
            ${safeText(data.timeframe)}
          </p>

        </div>

        <div class="result-item">

          <h4>
            Trade Verdict
          </h4>

          <p class="buy">
            ${safeText(data.tradeVerdict)}
          </p>

        </div>

        <div class="result-item">

          <h4>
            Trade Health
          </h4>

          <p>
            ${safeText(data.tradeHealth)}
          </p>

        </div>

        <div class="result-item">

          <h4>
            P/L %
          </h4>

          <p>
            ${safePercent(data.pnlPercent)}
          </p>

        </div>

      </div>

    </div>

    <div class="reason-box">

      <h3>
        Why This Trade Verdict?
      </h3>

      <ul>

        ${safeArray(data.tradeReasons)
          .map(
            item =>
              `<li>${safeText(item)}</li>`
          )
          .join("")}

      </ul>

    </div>

  `;

  resultCard.classList.remove(
    "hidden"
  );

}

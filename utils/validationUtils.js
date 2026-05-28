// =========================
// SAFE NUMBER
// =========================

function safeNumber(value, fallback = 0) {

  const parsed = parseFloat(value);

  if (

    isNaN(parsed) ||

    !isFinite(parsed)

  ) {

    return fallback;

  }

  return parsed;

}

// =========================
// SAFE STRING
// =========================

function safeString(value, fallback = "N/A") {

  if (

    value === undefined ||
    value === null ||
    value === ""

  ) {

    return fallback;

  }

  return value;

}

// =========================
// SAFE ARRAY
// =========================

function safeArray(value) {

  if (!Array.isArray(value)) {

    return [];

  }

  return value;

}

// =========================
// VALIDATE BASIC INPUTS
// =========================

function validateBasicInputs(data) {

  const {

    stockName,
    ltp,
    ema20,
    ema50,
    rsi

  } = data;

  if (

    !stockName ||

    safeNumber(ltp) <= 0 ||

    safeNumber(ema20) <= 0 ||

    safeNumber(ema50) <= 0 ||

    safeNumber(rsi) <= 0

  ) {

    return {

      valid: false,

      message:
        "Please fill all mandatory market data fields correctly."

    };

  }

  return {

    valid: true,

    message:
      "Basic Inputs Valid"

  };

}

// =========================
// VALIDATE ACTIVE TRADE
// =========================

function validateActiveTradeInputs(data) {

  const {

    executedEntry,
    currentSL,
    currentTarget,
    quantity

  } = data;

  if (

    safeNumber(executedEntry) <= 0 ||

    safeNumber(currentSL) <= 0 ||

    safeNumber(currentTarget) <= 0 ||

    safeNumber(quantity) <= 0

  ) {

    return {

      valid: false,

      message:
        "Please fill all active trade inputs correctly."

    };

  }

  return {

    valid: true,

    message:
      "Active Trade Inputs Valid"

  };

}

// =========================
// VALIDATE ADVANCED CANDLES
// =========================

function validateCandleInputs(candles) {

  let validCandles = 0;

  candles.forEach(candle => {

    if (

      safeNumber(candle.close) > 0 &&

      safeNumber(candle.volume) > 0

    ) {

      validCandles++;

    }

  });

  // =========================
  // MINIMUM 2 VALID CANDLES
  // =========================

  if (validCandles < 2) {

    return {

      valid: false,

      message:
        "At least 2 valid candles required for advanced analysis."

    };

  }

  return {

    valid: true,

    message:
      "Advanced Candle Inputs Valid"

  };

}

// =========================
// SAFE PERCENT
// =========================

function safePercent(value) {

  const num = safeNumber(value);

  return num.toFixed(2) + "%";

}

// =========================
// SAFE CURRENCY
// =========================

function safeCurrency(value) {

  const num = safeNumber(value);

  return "₹" + num.toFixed(2);

}

// =========================
// SAFE TEXT OUTPUT
// =========================

function safeText(value, fallback = "N/A") {

  if (

    value === undefined ||
    value === null ||
    value === "" ||
    value === "NaN"

  ) {

    return fallback;

  }

  return value;

}

// =========================
// SAFE SCORE
// =========================

function safeScore(value) {

  const num = safeNumber(value);

  if (num < 0) return 0;

  if (num > 100) return 100;

  return Math.round(num);

}

// =========================
// SAFE BOOLEAN
// =========================

function safeBoolean(value) {

  return value === true;

}

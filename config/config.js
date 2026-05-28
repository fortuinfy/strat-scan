// =========================
// APP CONFIGURATION
// =========================

const APP_CONFIG = {

  // =========================
  // APP INFO
  // =========================

  APP_NAME:
    "TradeScan AI",

  APP_SUBTITLE:
    "Advanced Multi-Engine Trading Assistant",

  VERSION:
    "1.0.0",

  // =========================
  // SETUP DEFINITIONS
  // =========================

  SETUP_NAMES: {

    CB:
      "Continuation Breakout",

    PC:
      "Pullback Continuation",

    RB:
      "Range Breakout"

  },

  // =========================
  // VERDICT DEFINITIONS
  // =========================

  VERDICTS: {

    BUY: {

      label:
        "BUY",

      description:
        "High Probability Opportunity",

      className:
        "buy"

    },

    WATCH: {

      label:
        "WATCH",

      description:
        "Needs Further Confirmation",

      className:
        "watch"

    },

    AVOID: {

      label:
        "AVOID",

      description:
        "Weak Risk Reward Structure",

      className:
        "avoid"

    }

  },

  // =========================
  // TRADE VERDICTS
  // =========================

  TRADE_VERDICTS: {

    HOLD: {

      label:
        "CONTINUE HOLDING",

      description:
        "Trend Structure Healthy"

    },

    TRAIL: {

      label:
        "TRAIL STOP LOSS",

      description:
        "Protect Existing Gains"

    },

    PARTIAL: {

      label:
        "PARTIAL EXIT",

      description:
        "Momentum Slowing Near Target"

    },

    EXIT: {

      label:
        "FULL EXIT",

      description:
        "Trend Structure Weakening"

    }

  },

  // =========================
  // PRIORITY LEVELS
  // =========================

  PRIORITY_LEVELS: {

    HIGH: {

      color:
        "#22c55e"

    },

    MEDIUM: {

      color:
        "#facc15"

    },

    LOW: {

      color:
        "#ef4444"

    }

  },

  // =========================
  // RSI SETTINGS
  // =========================

  RSI: {

    STRONG_MIN:
      60,

    MODERATE_MIN:
      50,

    OVERBOUGHT:
      75,

    WEAK:
      45

  },

  // =========================
  // MOMENTUM SETTINGS
  // =========================

  MOMENTUM: {

    STRONG:
      70,

    MODERATE:
      50,

    WEAK:
      40

  },

  // =========================
  // RELATIVE VOLUME
  // =========================

  RELATIVE_VOLUME: {

    VERY_HIGH:
      1.8,

    HIGH:
      1.3,

    LOW:
      0.7

  },

  // =========================
  // SETUP SCORE LEVELS
  // =========================

  SETUP_SCORES: {

    STRONG:
      75,

    MODERATE:
      55

  },

  // =========================
  // POSITION SIZING
  // =========================

  RISK_MANAGEMENT: {

    DEFAULT_RISK_PERCENT:
      1,

    MAX_RISK_PERCENT:
      2

  },

  // =========================
  // UI SETTINGS
  // =========================

  UI: {

    DEFAULT_TIMEFRAME:
      "Daily",

    DEFAULT_MODE:
      "new"

  }

};

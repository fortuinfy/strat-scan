// =========================
// MOMENTUM ENGINE
// =========================

window.calculateMomentum =
function(data) {

  // =========================
  // ADVANCED MODE CHECK
  // =========================

  if (!data.advancedEnabled) {

    return {

      momentumScore: 0,

      relativeVolume: 0,

      relativeVolumeStatus:
        "Not Enabled",

      momentumTrend:
        "Basic Engine Only",

      participationTrend:
        "Basic Engine Only",

      weaknessDetected: false,

      advancedReasons: []

    };

  }

  // =========================
  // CONFIG
  // =========================

  const config =
    window.APP_CONFIG;

  // =========================
  // INPUTS
  // =========================

  const {

    candles

  } = data;

  // =========================
  // CANDLE DATA
  // =========================

  const c1 = candles[0];
  const c2 = candles[1];
  const c3 = candles[2];
  const c4 = candles[3];
  const c5 = candles[4];

  // =========================
  // INITIAL VALUES
  // =========================

  let momentumScore = 0;

  let weaknessDetected = false;

  let advancedReasons = [];

  // =========================
  // VOLUME CALCULATIONS
  // =========================

  const avgVolume = (

    c2.volume +
    c3.volume +
    c4.volume +
    c5.volume

  ) / 4;

  const relativeVolume =
    avgVolume > 0

      ?

      c1.volume / avgVolume

      :

      0;

  const relativeVolumeStatus =

    window.getRelativeVolumeStatus(
      relativeVolume
    );

  // =========================
  // HIGHER CLOSES
  // =========================

  if (c1.close > c2.close) {

    momentumScore +=
      config.momentum.scoring
        .higherClose;

    advancedReasons.push(
      "Recent candle closed higher than previous candle."
    );

  }

  if (c2.close > c3.close) {

    momentumScore +=
      config.momentum.scoring
        .higherClose;

  }

  if (c3.close > c4.close) {

    momentumScore +=
      config.momentum.scoring
        .higherClose;

  }

  if (c4.close > c5.close) {

    momentumScore +=
      config.momentum.scoring
        .higherClose;

  }

  // =========================
  // BULLISH CANDLES
  // =========================

  if (c1.nature === "Bullish") {

    momentumScore +=
      config.momentum.scoring
        .bullishCandle;

    advancedReasons.push(
      "Latest candle remains bullish."
    );

  }

  if (c2.nature === "Bullish") {

    momentumScore +=
      config.momentum.scoring
        .bullishCandle;

  }

  // =========================
  // RELATIVE VOLUME
  // =========================

  if (
    relativeVolumeStatus === "High"
  ) {

    momentumScore +=
      config.momentum.scoring
        .highRelativeVolume;

    advancedReasons.push(
      "Strong relative volume participation detected."
    );

  }

  else if (
    relativeVolumeStatus === "Low"
  ) {

    advancedReasons.push(
      "Participation volume remains weak."
    );

  }

  // =========================
  // RISING PARTICIPATION
  // =========================

  if (

    c1.volume > c2.volume

    &&

    c2.volume > c3.volume

  ) {

    momentumScore +=
      config.momentum.scoring
        .risingVolumeParticipation;

    advancedReasons.push(
      "Volume participation expanding progressively."
    );

  }

  // =========================
  // MOMENTUM TREND
  // =========================

  let momentumTrend =
    "Weak Momentum";

  if (

    momentumScore >=
    config.momentum.conditions
      .strongMomentumScore

  ) {

    momentumTrend =
      "Strong Bullish Momentum";

  }

  else if (

    momentumScore >=
    config.momentum.conditions
      .moderateMomentumScore

  ) {

    momentumTrend =
      "Moderate Momentum";

  }

  // =========================
  // PARTICIPATION TREND
  // =========================

  let participationTrend =
    "Weak Participation";

  if (
    relativeVolumeStatus === "High"
  ) {

    participationTrend =
      "Strong Participation";

  }

  else if (
    relativeVolumeStatus === "Normal"
  ) {

    participationTrend =
      "Stable Participation";

  }

  // =========================
  // WEAKNESS ENGINE
  // =========================

  // Consecutive bearish candles

  if (

    c1.nature === "Bearish"

    &&

    c2.nature === "Bearish"

  ) {

    weaknessDetected = true;

    advancedReasons.push(
      "Consecutive bearish candles detected."
    );

  }

  // Falling close sequence

  if (

    c1.close < c2.close

    &&

    c2.close < c3.close

  ) {

    weaknessDetected = true;

    advancedReasons.push(
      "Recent candle closes weakening progressively."
    );

  }

  // Weak latest candle

  if (

    c1.nature === "Bearish"

    &&

    c1.volume > avgVolume

  ) {

    weaknessDetected = true;

    advancedReasons.push(
      "High-volume bearish candle detected."
    );

  }

  // Weak momentum score

  if (

    momentumScore <
    config.momentum.conditions
      .moderateMomentumScore

  ) {

    advancedReasons.push(
      "Momentum strength remains weak."
    );

  }

  // =========================
  // RETURN
  // =========================

  return {

    momentumScore,

    relativeVolume,

    relativeVolumeStatus,

    momentumTrend,

    participationTrend,

    weaknessDetected,

    advancedReasons

  };

};

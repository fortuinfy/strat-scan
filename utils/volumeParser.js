// =========================
// VOLUME PARSER
// =========================

function parseVolume(volumeInput) {

  // =========================
  // EMPTY CHECK
  // =========================

  if (

    !volumeInput ||

    volumeInput.trim() === ""

  ) {

    return 0;

  }

  // =========================
  // NORMALIZE INPUT
  // =========================

  const value =

    volumeInput
      .toString()
      .trim()
      .toUpperCase();

  // =========================
  // REMOVE SPACES
  // =========================

  const cleanedValue =

    value.replace(/\s+/g, "");

  // =========================
  // CRORE
  // =========================

  if (

    cleanedValue.includes("CR")

  ) {

    return (

      parseFloat(
        cleanedValue.replace("CR", "")
      ) * 10000000

    );

  }

  // =========================
  // LAKH
  // =========================

  if (

    cleanedValue.includes("L")

  ) {

    return (

      parseFloat(
        cleanedValue.replace("L", "")
      ) * 100000

    );

  }

  // =========================
  // MILLION
  // =========================

  if (

    cleanedValue.includes("M")

  ) {

    return (

      parseFloat(
        cleanedValue.replace("M", "")
      ) * 1000000

    );

  }

  // =========================
  // THOUSAND
  // =========================

  if (

    cleanedValue.includes("K")

  ) {

    return (

      parseFloat(
        cleanedValue.replace("K", "")
      ) * 1000

    );

  }

  // =========================
  // NORMAL NUMBER
  // =========================

  return parseFloat(
    cleanedValue
  );

}

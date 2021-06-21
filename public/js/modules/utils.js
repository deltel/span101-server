const capitalizeWord = (label) => {
  const capitalLetter = label.charAt(0).toUpperCase();
  return capitalLetter + label.slice(1);
};

export const transformLabel = (label) => {
  if (label === "part_of_speech") {
    const tempValue = label.split("_");
    tempValue[0] = capitalizeWord(tempValue[0]);
    tempValue[2] = capitalizeWord(tempValue[2]);
    return tempValue.join(" ");
  }

  if (["created_at", "updated_at"].includes(label)) {
    const tempValue = label.split("_");
    tempValue[0] = capitalizeWord(tempValue[0]);
    tempValue[1] = capitalizeWord(tempValue[1]);
    return tempValue.join(" ");
  }

  return capitalizeWord(label);
};

export const getId = () => {
  return window.location.pathname.split("/")[2];
};

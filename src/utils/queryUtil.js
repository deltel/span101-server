const getQueryValues = (dataObj) => {
  let querySubstring = "";
  let sep = "";
  const updates = Object.keys(dataObj).concat("updated_at");
  const updateValues = Object.values(dataObj)
    .map((value) => value.toLowerCase())
    .concat(new Date());

  updates.forEach((update, index) => {
    const num = index + 1;
    if (index > 0) sep = ", ";
    querySubstring = querySubstring + sep + update + " = " + "$" + num;
  });

  return {
    querySubstring,
    updateValues,
  };
};

module.exports = getQueryValues;

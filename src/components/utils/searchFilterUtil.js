const searchFilterUtil = (arr, key, searchKey) => {
  return arr.filter(function (obj) {
    return Object.keys(obj).some(() => {
      return obj[key].toLowerCase().includes(searchKey.toLowerCase());
    });
  });
};

export { searchFilterUtil };

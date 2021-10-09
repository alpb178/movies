export const createFilters = (params) => {
  const filters = [];
  Object.entries(params).forEach((e) => {
    if (e[1]) {
      filters.push(`${e[0]}${typeof e[1] === 'string' ? '.contains' : '.equals'}=${e[1]}`);
    }
  });

  return filters.join('&');
};

export const removeFilter = (value, filters, callback) => {
  const newFilters = Object.keys(filters.toJS())
    .filter((key) => !value.includes(key))
    .reduce(
      (obj, key) => ({
        ...obj,
        [key]: filters.toJS()[key]
      }),
      {}
    );

  callback({ filters: newFilters });
};

export default createFilters;

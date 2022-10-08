module.exports = (reqQuery: any): any => {
  let query: any = {};
  if (Object.keys(reqQuery).length > 0) {
    const { page, limit, ...filters } = reqQuery;
    if (page > 0 && limit > 0) {
      query.limit = parseInt(limit);
      query.offset = limit * (page - 1);
    }
    if (Object.keys(filters).length > 0) {
      query.where = {};
      for (const [key, value] of Object.entries(filters)) {
        Object.assign(query.where, { [key]: value });
      }
    }
  }
  return query;
};

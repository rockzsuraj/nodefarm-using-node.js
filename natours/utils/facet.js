class Facet {
  constructor(model, queryString) {
    this.model = model;
    this.queryString = queryString;
    this.excludeQueries = new Set(['sort', 'limit', 'page', 'fields']);
    this.replaceKey = new Set(['gte', 'gt', 'lte', 'lt']);
  }

  processValue(value) {
    if (typeof value === 'object' && value !== null) {
      const processedObject = {};
      Object.entries(value).forEach(([objKey, objValue]) => {
        if (this.replaceKey.has(objKey)) {
          const operator = `$${objKey}`;
          processedObject[operator] = parseFloat(objValue);
        } else {
          processedObject[objKey] = this.processValue(objValue);
        }
      });
      return processedObject;
    }

    return value;
  }

  processQuery(queryObj) {
    const processedQuery = {};
    if (queryObj || typeof queryObj === 'object') {
      Object.entries(queryObj).forEach(([key, value]) => {
        if (this.excludeQueries.has(key)) {
          return;
        }
        const processedValue = this.processValue(value);
        processedQuery[key] = processedValue;
      });
    }
    return processedQuery;
  }

  filteringPipeline() {
    const queryObj = { ...this.queryString };
    return this.processQuery(queryObj);
  }

  sortBy() {
    if (this.queryString.sort) {
      const sortBy = {};
      this.queryString.sort.split(',').forEach((el) => {
        const isAsc = !el.startsWith('-');
        const key = isAsc ? el.trim() : el.substring(1).trim();
        sortBy[key] = isAsc ? 1 : -1;
      });
      return sortBy;
    }
    return { createdAt: 1 };
  }

  limitField() {
    if (this.queryString.fields) {
      const limitField = {};
      this.queryString.fields.split(',').forEach((el) => {
        const key = el.trim();
        limitField[key] = 1;
      });
      return limitField;
    }
    return { __v: 0 };
  }

  pagination() {
    if (this.queryString.limit || this.queryString.page) {
      const limit = this.queryString.limit * 1 || 10;
      const page = this.queryString.page * 1 || 1;
      const skip = (page - 1) * limit;

      return { limit, skip };
    }
    return { limit: 0, skip: 0 };
  }

  filters() {
    const query = [
      {
        $match: this.filteringPipeline(),
      },
      {
        $facet: {
          result: [
            {
              $skip: this.pagination().skip,
            },
            {
              $limit: this.pagination().limit,
            },
            {
              $project: this.limitField(),
            },
          ],
          count: [
            {
              $count: 'count',
            },
          ],
        },
      },
      {
        $project: {
          result: 1,
          count: {
            $arrayElemAt: ['$count', 0],
          },
        },
      },
    ];
    this.model = this.model.aggregate(query);

    return this.model;
  }
}

module.exports = Facet;

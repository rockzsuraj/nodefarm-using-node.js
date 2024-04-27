class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    const queryObj = { ...this.queryString };
    const excludeQueries = ['sort', 'limit', 'page', 'fields'];
    excludeQueries.forEach((el) => delete queryObj[el]);

    // 1B) Advanced filtering
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`,
    );
    this.query = this.query.find(JSON.parse(queryString));
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = {};
      this.queryString.sort.split(',').forEach((el) => {
        const isAsc = !el.startsWith('-');
        const key = isAsc ? el.trim() : el.substring(1).trim();
        sortBy[key] = isAsc ? 'asc' : 'desc';
      });
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort({ createdAt: 'asc' });
    }
    return this;
  }

  limitField() {
    if (this.queryString.fields) {
      const limitField = {};
      this.queryString.fields.split(',').forEach((el) => {
        const key = el.trim();
        limitField[key] = 1;
      });
      this.query = this.query.select(limitField);
    } else {
      this.query = this.query.select({ __v: 0 });
    }
    return this;
  }

  pagination() {
    if (this.queryString.limit || this.queryString.page) {
      const limit = this.queryString.limit || 10;
      const page = this.queryString.page || 1;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);
    } else {
      this.query = this.query.skip(0).limit(10);
    }
    return this;
  }
}

module.exports = APIFeatures;

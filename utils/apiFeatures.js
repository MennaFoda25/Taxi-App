const { Op } = require('sequelize');

class ApiFeatures {
  constructor(queryString) {
    (this.queryString = queryString), (this.options = {});
  }
  filter() {
    const queryObj = { ...this.queryString };
    const excludeFields = ['page', 'sort', 'limit', 'fields', 'keyword'];
    excludeFields.forEach((field) => delete queryObj[field]);

    const where = {};

    for (let key in queryObj) {
      if (typeof queryObj[key] === 'object') {
        const operators = {};
        for (let op in queryObj[key]) {
          const sequelizeOp = this.mapOperator(op);
          if (sequelizeOp) operators[sequelizeOp] = queryObj[key][op];
        }
        where[key] = operators;
      } else {
        where[key] = queryObj[key];
      }
    }

    this.options.where = where;
    return this;
  }

  // Sorting
  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').map((field) => {
        return field.startsWith('-') ? [field.substring(1), 'DESC'] : [field, 'ASC'];
      });
      this.options.order = sortBy;
    } else {
      this.options.order = [['createdAt', 'DESC']];
    }
    return this;
  }

  // Limit selected fields
  limitFields() {
    if (this.queryString.fields) {
      this.options.attributes = this.queryString.fields.split(',');
    }
    return this;
  }

  // Search
  search(modelName) {
    if (this.queryString.keyword) {
      if (!this.options.where) this.options.where = {};

      if (modelName === 'Products') {
        this.options.where[Op.or] = [
          { title: { [Op.iLike]: `%${this.queryString.keyword}%` } },
          { description: { [Op.iLike]: `%${this.queryString.keyword}%` } },
        ];
      } else {
        this.options.where.name = { [Op.iLike]: `%${this.queryString.keyword}%` };
      }
    }
    return this;
  }

  // Pagination
  paginate(countDocuments) {
    const page = parseInt(this.queryString.page, 10) || 1;
    const limit = parseInt(this.queryString.limit, 10) || 50;
    const offset = (page - 1) * limit;
    const endIndex = page * limit;

    const pagination = {
      currentPage: page,
      limit,
      numberOfPages: Math.ceil(countDocuments / limit),
    };

    if (endIndex < countDocuments) {
      pagination.next = page + 1;
    }
    if (offset > 0) {
      pagination.prev = page - 1;
    }

    this.options.limit = limit;
    this.options.offset = offset;
    this.paginationResult = pagination;

    return this;
  }

  // Helper: map Mongo operators to Sequelize
  mapOperator(op) {
    const map = {
      gte: Op.gte,
      gt: Op.gt,
      lte: Op.lte,
      lt: Op.lt,
    };
    return map[op] || null;
  }
}

module.exports = ApiFeatures;

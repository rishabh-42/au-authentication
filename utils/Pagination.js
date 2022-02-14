const httpStatus = require('http-status');
const AppError = require('./AppError');

class Pagination {
    constructor({ pageNumber, pageSize }) {
        if (!pageNumber || isNaN(pageNumber) || pageNumber <= 0)
            throw new AppError(httpStatus.UNPROCESSABLE_ENTITY,'valid pageNumber value required for pagination', 'invalid pageNumber in query')
        if (!pageSize || isNaN(pageSize) || pageSize <= 0)
        throw new AppError(httpStatus.UNPROCESSABLE_ENTITY,'valid pageSize value required for pagination', 'invalid pageNumber in pageSize');
        this.pageNumber = parseInt(pageNumber)
        this.pageSize = parseInt(pageSize)
    }

    getNoOfPages(totalRecords) {
        if (!totalRecords) return 0
        return Math.ceil(totalRecords / this.getLimit())
    }
    getOffset() {
        return (this.pageNumber - 1) * this.pageSize
    }
    getLimit() {
        return this.pageSize
    }
}

module.exports = Pagination;
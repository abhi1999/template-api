const {genericService} = require('../services')
const {handleError} = require('../utils');
const log4js = require('log4js');
const appLogger = log4js.getLogger();


class GenericController {
  constructor(collection){
    this._collection = collection;
    appLogger.info('Generic Controller for collection - '+ collection)
    this._service = new genericService(collection);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.updateById = this.updateById.bind(this);
    this.deleteById = this.deleteById.bind(this);
    this.create = this.create.bind(this);
  }
  async getAll(req, res, next){
    try {
      let data = await this._service.getAll()
      res.status(200).json(data);
      next()
    } catch(e) {
      console.log(e.message)
      handleError(res, e.message, "Failed to get contacts.");
      next(e)
    }
  }
  async getById(req, res, next){
    try {
      const {id} =req.params;
      const data = await this._service.getById(id)
      res.status(200).json(data);
      next()
    } catch(e) {
      console.log(e.message)
      handleError(res, e.message, "Failed to get by Id." + id);
      next(e)
    }
  }
  async updateById(req, res, next){
    try {
      const contact = req.body;
      const data = await this._service.updateById(id,contact)
      res.status(200).json(data);
      next()
    } catch(e) {
      console.log(e.message)
      handleError(res, e.message, "Failed to update by Id."+ id);
      next(e)
    }
  }
  async deleteById(req, res, next){
    try {
      const {id} =req.params;
      const data = await this._service.deleteById(id);
      res.status(200).json(data);
      next()
    } catch(e) {
      console.log(e.message)
      handleError(res, e.message, "Failed to delete by Id."+ id);
      next(e)
    }
  }
  async create(req, res, next){
    try {
      const obj = req.body;
      obj.createDate = new Date();
      const data = await this._service.create(obj);
      res.status(200).json(data);
      next()
    }
    catch(e) {
      console.log(e.message)
      handleError(res, e.message, "Failed to create "+obj);
      next(e);
    }
  }
}


module.exports = GenericController
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
      console.error('IAMHERE', req.params)
      const obj = req.body;
      const {id} =req.params;
      obj.updateDate = new Date();
      console.error('IAMHERE2', req.body)
      
      console.error('updating '+ this._collection + "  for ", id)
     
      console.error('updating '+ this._collection + "  for ", id)
      const data = await this._service.updateById(id,obj)
      console.error('DID I GET HERE', req.body)
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
      console.log('iamhere', req.body)
      const obj = req.body;
      obj.createDate = new Date();
      obj.updateDate = new Date();
      const data = await this._service.create(obj);
      res.status(200).json(data);
      next()
    }
    catch(e) {
      console.log(e.message)
      handleError(res, e.message, "Failed to create");
      next(e);
    }
  }
}


module.exports = GenericController
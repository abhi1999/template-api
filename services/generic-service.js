const { dbBasic} = require('./../db')
 
/*
  * if you need to make calls to additional tables, data stores (Redis, for example), 
  * or call an external endpoint as part of creating the blogpost, add them to this service
*/
class GenericService {
  constructor(collection){
    this.collection = collection;
    this._genericDbAccessor = new dbBasic(collection);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.updateById = this.updateById.bind(this);
    this.deleteById = this.deleteById.bind(this);
    this.create = this.create.bind(this);
  }
  async getAll(){
    try {
      return await this._genericDbAccessor.getAll();
    } catch(e) {
      throw new Error(e.message)
    }
  }
  async create(obj){
    try {
      return await this._genericDbAccessor.create(obj);
    } catch(e) {
      throw new Error(e.message)
    }
  }
  async getById(id)  {
    try {
      return await this._genericDbAccessor.findById(id);
    } catch(e) {
      throw new Error(e.message)
    }
  }
  async updateById(id, obj){
    try {
      console.log('IGOTHERE', id, this.collection)
      return await this._genericDbAccessor.updateById(id, obj);
    } catch(e) {
      throw new Error(e.message)
    }
  }
  async deleteById(id){
    try {
      return await this._genericDbAccessor.deleteById(id);
    } catch(e) {
      throw new Error(e.message)
    }
  }
}

module.exports= GenericService
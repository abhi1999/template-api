
const { bingoService } = require('../services')
const {handleError} = require('../utils');

// const { getAll, getById, updateById, deleteById, create } = contactsSerivce;
 
/*
 * call other imported services, or same service but different functions here if you need to
*/
const getGameList = async (req, res, next) => {
  try {
    let data = await bingoService.getGameList()
    res.status(200).json(data);
    next()
  } catch(e) {
    console.log(e.message)
    handleError(res, e.message, "Failed to get game list.");
    next(e)
  }
}

const getGameParticipants = async (req, res, next) => {
  try {
    const {gameId} =req.params;
    let data = await bingoService.getGameParticipants(gameId);
    res.status(200).json(data);
    next()
  } catch(e) {
    console.log(e.message)
    handleError(res, e.message, "Failed to get participants.");
    next(e)
  }
}


const verifyPassword = async (req, res, next) => {
  try {
    const {gameId, participantId} =req.params;
    const {password} = req.body;
    
    console.warn(gameId, password)
    let data = await bingoService.verifyPassword(gameId, participantId, password);
    res.status(200).json(data);
    next()
  } catch(e) {
    console.log(e.message)
    handleError(res, e.message, "Failed to verify password.");
    next(e)
  }
}

const getGameDetails = async (req, res, next) => {
  try {
    const {gameId, participantId} =req.params;
    let data = await bingoService.getGameDetails(gameId, participantId);
    res.status(200).json(data);
    next()
  } catch(e) {
    console.log(e.message)
    handleError(res, e.message, "Failed to game details.");
    next(e)
  }
}
const callNumber = async (req, res, next) => {
  try {
    const {gameId, number} =req.params;
    let data = await bingoService.callNumber(gameId, number);
    res.status(200).json(data);
    next()
  } catch(e) {
    console.log(e.message)
    handleError(res, e.message, e.message);
    next(e)
  }
}

const cancelNumberCall = async (req, res, next) => {
  try {
    const {gameId, number} =req.params;
    let data = await bingoService.cancelNumberCall(gameId, number);
    res.status(200).json(data);
    next()
  } catch(e) {
    console.log(e.message)
    handleError(res, e.message, e.message);
    next(e)
  }
}
module.exports = { getGameList, getGameParticipants,verifyPassword, getGameDetails, callNumber,cancelNumberCall }
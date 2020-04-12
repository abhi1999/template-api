const { bingoDb} = require('../db')
 
const { getBingoNumber } = require("./bingo/utils");
const { data } = require("./bingo/raw-data");

const wrapInPromise = (data) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => resolve(data), 1)
    })
}
const getGameList = async () => {
    try {
        const gameListData = data.map(d => { return { id: d.id, name: d.name } })
/*        const all = await bingoDb.getAll();
        console.error('iamhere')
        console.log(all)
        */
        return await wrapInPromise(gameListData)
    } catch (e) {
        throw new Error(e.message)
    }
}

const getGameParticipants = async (gameId) => {
    try {
        const game = data.find(d => d.id === gameId);
        if (game === undefined) {
            return [];
        }
        else {
            console.log(game)
            const gameParticipants = game.allParticipants.map(p => { return { id: p.id, name: p.name, gameId: game.id } })
            return await wrapInPromise(gameParticipants);
        }
        // return await contactsDb.getAll();
    } catch (e) {
        throw new Error(e.message)
    }
}

const verifyPassword = async (gameId, participantId, password) => {
    const game = data.find(d => d.id === gameId);
    if (game === undefined) {
        return await wrapInPromise({
            isValid: false,
            message: "Unknown Game - " + gameId,
            bingoCardNumbers: [], participantId
        })
    }
    const gameParticipant = game.allParticipants.find(p => p.id === participantId);
    if (gameParticipant === undefined) {
        return await wrapInPromise({
            isValid: false,
            message: "Unknown Participant",
            bingoCardNumbers: [], participantId
        })
    }
    const isValid = gameParticipant.id === password
    console.log(gameParticipant)
    return await wrapInPromise({
        isValid,
        message: isValid ? 'Succesful' : "Wrong Password",
        bingoCardNumbers: isValid ? gameParticipant.bingoCardNumbers : [], participantId
    })
};

const getGameDetails = async (gameId, participantId) => {
    const game = data.find(d => d.id === gameId);
    if (game === undefined) {
        return {};
    }
    else {
        return await wrapInPromise({ gameId: game.id, winItems: game.winItems, calledNumbers: game.calledNumbers });
    }
}


const claimBingo = async (gameId, participantId) => {
    return await wrapInPromise({ message: "Bingo reported" })

}

const callNumber = async (gameId, number) => {
    const game = data.find(d => d.id === gameId);
    
    if (game === undefined) {
        throw new Error("Invalid Game")
    }
    if (game.calledNumbers.indexOf(number) > -1) {
        throw new Error("Already Called")
    }
    game.calledNumbers.push(number);

    /*const all = await bingoDb.getAll();
    const gg = all.find(g=> g.id === id)
    
    if(bingoDb.findById(gg._id.toString())){
       console.error(bingoDb.findById(gg._id.toString()))
        bingoDb.updateById(gg._id.toString(), game)
    }
    else{
        console.log('else')
        // bingoDb.create(game)
    }*/
    return  await getGameDetails(gameId)
}

const cancelNumberCall = async (gameId, number) => {
    const game = data.find(d => d.id === gameId);
    if (game === undefined) {
        throw new Error("Invalid Game")
    }
    const index = game.calledNumbers.indexOf(number)
    if (index === -1) {
        throw new Error("Number was never called")
    }
    game.calledNumbers.splice(index, 1);
    return  await getGameDetails(gameId)
}

module.exports = { getGameList, getGameParticipants, verifyPassword, getGameDetails, callNumber, cancelNumberCall, claimBingo }
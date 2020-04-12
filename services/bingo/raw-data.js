const data = [
    {
        id: "1", name: 'Game1',
        allParticipants:[
            {   
                id:"Abhishek", 
                name:'Abhishek', 
                password:'pandey',
                bingoCardNumbers:[{"letter":"b","numbers":[6,12,3,15,8]},{"letter":"i","numbers":[30,18,29,16,26]},{"letter":"n","numbers":[40,41,45,35]},{"letter":"g","numbers":[55,56,58,46,53]},{"letter":"o","numbers":[72,73,67,69,63]}]
            },
            {   
                id:"Rashmi", 
                name:'Rashmi', 
                password:'malukani',
                bingoCardNumbers:[{"letter":"b","numbers":[4,1,2,11,10]},{"letter":"i","numbers":[30,25,18,24,27]},{"letter":"n","numbers":[31,38,33,42]},{"letter":"g","numbers":[58,59,57,47,60]},{"letter":"o","numbers":[67,63,61,65,68]}]
            },
            {   
                id:"aadi", 
                name:'Aadi', 
                password:'pandey',
                bingoCardNumbers:[{"letter":"b","numbers":[7,1,14,11,9]},{"letter":"i","numbers":[27,20,29,22,26]},{"letter":"n","numbers":[39,34,45,35]},{"letter":"g","numbers":[53,60,49,58,46]},{"letter":"o","numbers":[61,65,66,62,67]}]
            }
        ],
        calledNumbers:[],
        winItems:[
            {name:'Middle Line', type:'MiddleLine', isAvailable:true, winnerName:""},
            {name:'Top Line', type:'TopLine', isAvailable:true, winnerName:""},
            {name:'Bottom Line', type:'BottomLine', isAvailable:true, winnerName:""},
            {name:'Full house', type:'FullHouse1', isAvailable:true, winnerName:""},
            {name:'Full house2', type:'FullHouse3', isAvailable:true, winnerName:""}
        ]
    },
    { id: "2", name: 'Family Bingo', participants:["abhishek", 'aadi', 'Rashmi'] },
    { id: "3", name: 'Family Bingo 2', participants:["abhishek", 'aadi', 'Rashmi'] },
    { id: "4", name: 'Family Bingo 3', participants:["abhishek", 'aadi', 'Rashmi'] }
]

module.exports = { data}
/*
TopLine,
    MiddleLine,
    BottomLine,
    FullHouse1,
    FullHouse2,
    FullHouse3
    */
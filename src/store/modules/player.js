import AXIOS from 'axios'

const state = {
    // players: [
    //     {id: 1, name: "ni"},
    //     {id: 2, name: "nu"},
    //     {id: 3, name: "ma"}
    // ]
    players:[],
    playerGames:[],
    tmpPlayer: {id: 1, name: 'Anonymous'},
    games:[]
};

const getters = {
    getPlayers: (state) => state.players,
    getPlayer: (state) => (id) => {
        return state.players.find( player => player.id == id )
    },
    getPlayerGames: (state) => state.playerGames,
    getTmpPlayer: (state) => state.tmpPlayer,
    getPlayerGames: (state) => (playerId) => {
        return state.games.find( game => game.playerId == playerId )
    },
};

const actions = {
    async loadPlayers({commit}){
        const response = await AXIOS.get('http://localhost:8081/players' );
        commit('commitPlayers',response.data);
    },
    async loadPlayerGames({commit}, playerId){
        const response = await AXIOS.get('http://localhost:8081/players/'+playerId+'/games');
        commit('commitPlayerGames',response.data);
    },
    async savePlayer({commit}, newPlayer){
        const response = await AXIOS.post('http://localhost:8081/players', newPlayer);
        commit('commitSavePlayer',response.data);
    },
    async setTmpPlayer({commit}, tmpPlayer){
        commit('commitSetTmpPlayer',tmpPlayer);
    },
    async play({commit}, playerId){
        const response = await AXIOS.post('http://localhost:8081/players/'+playerId+'/games');
        commit('commitPlay',response.data);
    },
    

};

const mutations = {
    commitPlayers:(state, players) => {
        state.players = players;
    },
    commitPlayerGames:(state, games) => {
        state.playerGames = games;
    },
    commitSavePlayer:(state, newPlayer) =>{
        const index = state.players.findIndex(player => player.id === newPlayer.id);
        if(index!==-1){
            state.players.splice(index,1,newPlayer);
        }else{
            //state.players.unshift(newPlayer); // unshift is the opposite of push, it creates a newPlayer at the BEGINNING of the array[0]
            state.players.push(newPlayer);
        }   
    },
    commitSetTmpPlayer:(state, tmpPlayer) =>{
        state.tmpPlayer = tmpPlayer;
    },
    commitPlay:(state, newGame) =>{
        const index = state.games.findIndex(game => game.id === newGame.id);
        if(index!==-1){
            state.games.splice(index,1,newGame);
        }else{
            state.games.push(newGame);
        }   
    },
    
};


export default{
    state,
    getters,
    actions,
    mutations
}
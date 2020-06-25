import AXIOS from 'axios'

const state = {
    // players: [
    //     {id: 1, name: "ni"},
    //     {id: 2, name: "nu"},
    //     {id: 3, name: "ma"}
    // ]
    players:[],
    playerGames:[],
    rank: null,
    loser: null,
    winner: null
};

const getters = {
    getPlayers: (state) => state.players,
    getPlayer: (state) => (id) => {
        return state.players.find( player => player.id == id )
    },
    getPlayerGames: (state) => state.playerGames,
    getRank: (state) => state.rank,
    getLoser: (state) => state.loser,
    getWinner: (state) => state.winner,
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
    async createPlayer({commit}, newPlayer){
        const response = await AXIOS.post('http://localhost:8081/players', newPlayer);
        commit('commitCreatePlayer',response.data);
    },
    async modifyPlayer({commit}, newPlayer){
        const response = await AXIOS.put('http://localhost:8081/players', newPlayer);
        commit('commitModifyPlayer',response.data);
    },
    async setTmpPlayer({commit}, tmpPlayer){
        commit('commitSetTmpPlayer',tmpPlayer);
    },
    async play({commit, dispatch}, playerId){
        const response = await AXIOS.post('http://localhost:8081/players/'+playerId+'/games');
        commit('commitPlay',response.data);
        dispatch('loadPlayers'); // Call action within action in order to update the successrate 
    },
    async deletePlayerGames({commit}, playerId){
        const response = await AXIOS.delete('http://localhost:8081/players/'+playerId+'/games');
        commit('commitDeletePlayerGames',response.data);
    },
    async deletePlayer({commit}, playerId){
        const response = await AXIOS.delete('http://localhost:8081/players/'+playerId);
        commit('commitDeletePlayer',response.data);
    },
    async rank({commit}){
        const response = await AXIOS.get('http://localhost:8081/players/ranking' );
        commit('commitRank',response.data);
    },
    async loser({commit}){
        const response = await AXIOS.get('http://localhost:8081/players/ranking/loser' );
        commit('commitLoser',response.data);
    },
    async winner({commit}){
        const response = await AXIOS.get('http://localhost:8081/players/ranking/winner' );
        commit('commitWinner',response.data);
    },

};

const mutations = {
    commitPlayers:(state, players) => {
        state.players = players;
    },
    commitPlayerGames:(state, games) => {
        state.playerGames = games;
    },
    commitCreatePlayer:(state, newPlayer) => {
        //state.players.unshift(newPlayer); // unshift is the opposite of push, it creates a newPlayer at the BEGINNING of the array[0]
        state.players.push(newPlayer);
    },
    commitModifyPlayer:(state, newPlayer) => {
        const index = state.players.findIndex(player => player.id === newPlayer.id);
        if(index!==-1){
            state.players.splice(index,1,newPlayer);
        }
    },
    commitSetTmpPlayer:(state, tmpPlayer) => {
        state.tmpPlayer = tmpPlayer;
    },
    commitPlay:(state, newGame) =>{
        state.playerGames.push(newGame);
    },
    commitDeletePlayerGames:(state, msg) => {
        state.playerGames = []
        console.log(msg);
    },
    commitDeletePlayer:(state, palyerId) => {
        state.players = state.players.filter( player => player.id!=palyerId );
    },
    commitRank:(state, result) => {
        state.rank = result;
    },
    commitLoser:(state, result) => {
        state.loser = result[0];
    },
    commitWinner:(state, result) => {
        state.winner = result[0];
    }
    
};


export default{
    state,
    getters,
    actions,
    mutations
}
export default{
    
    SET_TEAMS(state , teams){
        state.teams = teams 
    },

    DELETE_TEAM_MEMBER(state , item ){
        state.teams = state.teams.filter(team => team.id !== item.id);
    },

    UPDATE_TEAM(state , data ){
        const index = state.teams.findIndex(team => team.id === data.id);
        if(index !== -1){
            state.teams.splice(index , 1 , data);
        }
    }

   
};
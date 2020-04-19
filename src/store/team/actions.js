import axios from 'axios'
export default{
    
    getTeams(ctx){
        return new Promise((resolve , reject) => {
            axios.get('api/team')
            .then((response) => {
                if(response.status == 201){
                    const teams = response.data.data
                    ctx.commit('SET_TEAMS' , teams);
                }
                resolve(response);
            })
            .catch((error) => {
                console.log(error);
            })
        });
    },

    saveTeam(ctx , data){
        return new Promise((resolve , reject) => {
            axios.post('api/team' , data )
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },

    getTeamById(ctx , id){
        return new Promise((resolve , reject) => {
            axios.get(`api/team/${id}`)
            .then((response) => {
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        })
    },




    deleteTeam(ctx , item){
        return new Promise((resolve , reject ) => {
            axios.delete(`api/team/${item.id}`)
            .then((response) => {
                ctx.commit('DELETE_TEAM_MEMBER' , item);
                resolve(response);
            })
            .catch((error) => {
                reject(error);
            })
        });
    }
};
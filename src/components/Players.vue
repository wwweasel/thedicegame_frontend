<template>
    <div>
        <ion-list>
            <ion-list-header lines="full">
                <ion-label>Players</ion-label>
            </ion-list-header>
            <div v-bind:key="player.id" v-for="player in players">
                <ion-item detail="true" lines="full" button @click="$router.push('/player/'+player.id)">
                    <small slot="start">{{player.id}}</small>
                    <ion-label>{{player.name}}</ion-label>                    
                </ion-item>
            </div>
        </ion-list>
    </div>
</template>

<script>
export default {
    name: "Players",
    data(){
        return {
            players:[
                {id: 1, name: "ni"},
                {id: 2, name: "nu"},
                {id: 3, name: "ma"},
            ]        
        }
    },
    methods:{
        buttonClick(event){
            console.log("Clicked: "+event.target.id);
        }
    }
}
</script>
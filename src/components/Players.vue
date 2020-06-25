<template>
    <div>
        <ion-fab vertical="top" horizontal="end" slot="fixed">
            <ion-fab-button color="light">
                <ios-arrow-down-icon w="30px" h="30px"/>
            </ion-fab-button>
            <ion-fab-list side="bottom">
                <ion-fab-button @click="triggerRank" color="light"><ios-analytics-icon w="30px" h="30px"/></ion-fab-button>
                <ion-fab-button @click="triggerLoser" color="light"><ios-sad-icon w="30px" h="30px"/></ion-fab-button>
                <ion-fab-button @click="triggerWinner" color="light"><ios-happy-icon w="30px" h="30px"/></ion-fab-button>
            </ion-fab-list>
        </ion-fab>

        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
            <ion-fab-button @click="openModal" color="shade">
                <ios-add-icon w="40px" h="40px"/>
            </ion-fab-button>
        </ion-fab>

        <ion-header>
            <ion-toolbar color="primary">
                <ion-title>The Dice Game</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-list>
            <ion-list-header lines="full" color="light">
                <ion-label >Players</ion-label>
            </ion-list-header>

            <div v-bind:key="player.id" v-for="player in getPlayers">
                <ion-item-sliding>
                    <ion-item :id="'item'+player.id" detail="true" lines="full" button @click="$router.push('/player/'+player.id)">
                        <ion-badge slot="start" color="medium"><small>{{player.id}}</small></ion-badge>
                        <ion-label>{{player.name!=null ? player.name:'Anonymous'}}</ion-label>
                        <ion-badge slot="end" color="medium"><small>{{player.successrate}}</small></ion-badge>     
                    </ion-item>
                    <ion-item-options side="end" @ionSwipe="del(player.id)">
                        <ion-item-option color="danger" @click="del(player.id)" expandable><ios-trash-icon w="30px" h="30px"/></ion-item-option>
                    </ion-item-options>
                </ion-item-sliding>
            </div>
        </ion-list>

    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CreatePlayerModal from '../components/CreatePlayerModal.vue';

export default {
    name: "Players",
    data(){
        return {
            icons:null
        }
    },
    methods:{
        ...mapActions(['loadPlayers','createPlayer','deletePlayer','rank','loser','winner']),
        openModal(){
            return this.$ionic.modalController
            .create({
                component: CreatePlayerModal,
                cssClass: 'my-custom-class',
                componentProps: {
                    data: {
                        content: 'New Content',
                    },
                    propsData: {
                        title: 'Create Player',
                    },
                    parent: this,
                },
            })
            .then(m => m.present())
        },
        del(id){
            //console.log("Will delete: " + id);
            this.deletePlayer(id);
        },
        triggerRank() {
            return this.$ionic.alertController
            .create({
                cssClass: 'my-custom-class',
                header: '',
                subHeader: '',
                message: 'The average successrate of all the players is: ' + this.getRank,
                buttons: ['OK'],
            })
            .then(a => a.present())
        },
        triggerLoser(){
            return this.$ionic.alertController
            .create({
                cssClass: 'my-custom-class',
                header: 'Loser:',
                subHeader: 'id: '+this.getLoser.id,
                message: this.getLoser.name!=null ? 'Name: '+this.getLoser.name:'Name: Anonymous',
                buttons: ['OK'],
            })
            .then(a => a.present())
        },
        triggerWinner(){
            return this.$ionic.alertController
            .create({
                cssClass: 'my-custom-class',
                header: 'Winner:',
                subHeader: 'id: '+this.getWinner.id,
                message: this.getWinner.name!=null ? 'Name: '+this.getWinner.name:'Name: Anonymous',
                buttons: ['OK'],
            })
            .then(a => a.present());            
        }
    },
    computed: {
        ...mapGetters(['getPlayers','getRank','getLoser','getWinner']),
    },
    created(){
        //console.log("CREATED:");
        this.loadPlayers();
        this.rank();
        this.loser();
        this.winner();
    },
    mounted(){
        // This will be triggered by the CreatePlayerModal onSubmit() function, 
        // which emits 'closeModal' as well as the emitPlayer
        this.$on('closeModal', (emitPlayer) => {
            //console.log(emitPlayer.name, emitPlayer.id);
            this.createPlayer(emitPlayer);
            this.$ionic.modalController.dismiss();
        })
    }
}
</script>
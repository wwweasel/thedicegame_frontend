<template>
    <div>
        <ion-list>
            <ion-list-header lines="full" color="light">
                <ion-label >Players</ion-label>
            </ion-list-header>
            <div v-bind:key="player.id" v-for="player in getPlayers">
                <ion-item detail="true" lines="full" button @click="$router.push('/player/'+player.id)">
                    <ion-badge slot="start" color="medium"><small>{{player.id}}</small></ion-badge>
                    <ion-label>{{player.name}}</ion-label>
                    <ion-badge slot="end" color="medium"><small>{{player.successrate}}</small></ion-badge>     
                </ion-item>
            </div>
        </ion-list>

        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
            <ion-fab-button @click="openModal">
                <ios-add-icon w="40px" h="40px"/>
            </ion-fab-button>
        </ion-fab>
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
        ...mapActions(['loadPlayers','savePlayer']),
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
        }
    },
    computed: {
        ...mapGetters(['getPlayers','getTmpPlayer']),
    },
    created(){
        //console.log("CREATED:");
        this.loadPlayers();
    },
    mounted(){
        // This will be triggered by the CreatePlayerModal onSubmit() function, 
        // which emits 'closeModal' as well as the emitPlayer
        this.$on('closeModal', (emitPlayer) => {
            //console.log(emitPlayer.name, emitPlayer.id);
            this.savePlayer(emitPlayer);
            this.$ionic.modalController.dismiss();
        })
    }
}
</script>
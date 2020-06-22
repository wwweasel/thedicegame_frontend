<template>
    <div>
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
        ...mapActions(['loadPlayers','createPlayer']),
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
            console.log("Will delete: " + id);
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
            this.createPlayer(emitPlayer);
            this.$ionic.modalController.dismiss();
        })
    }
}
</script>
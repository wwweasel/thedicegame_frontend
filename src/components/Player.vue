<template>

  <div class="ion-page">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Player Overview</ion-title>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-list lines="full">

        <ion-list-header color="light">
          <ion-grid>
            <ion-row>
              <ion-col size="1"><ion-badge color="medium">{{playerId}}</ion-badge></ion-col>
              <ion-col size="11"><ion-text><h3>{{getPlayer(playerId).name}}</h3></ion-text></ion-col>
            </ion-row>
            <ion-row>
              <ion-col size="1"><ion-label></ion-label></ion-col>
              <ion-col size="11"><ion-label>{{'successrate: ' + getPlayer(playerId).successrate}}</ion-label></ion-col>
            </ion-row>
          </ion-grid>
        </ion-list-header>

        <div v-bind:key="game.id" v-for="game in getPlayerGames">

          <ion-item v-if="game.id % 2 === 0" color="light">
            <ion-badge slot="start" color="medium"><small>{{game.id}}</small></ion-badge>

            <ion-badge v-if="game.success === true" color="warning"><ion-label>{{'result: '+game.result}}</ion-label></ion-badge>
            <ion-badge v-else color="primary"><ion-label>{{'Result: '+game.result}}</ion-label></ion-badge>
          </ion-item>

          <ion-item v-else>
            <ion-badge slot="start" color="medium"><small>{{game.id}}</small></ion-badge>

            <ion-badge v-if="game.success === true" color="warning"><ion-label>{{'result: '+game.result}}</ion-label></ion-badge>
            <ion-badge v-else color="primary"><ion-label>{{'Result: '+game.result}}</ion-label></ion-badge>
          </ion-item>

        </div>

      </ion-list>

      <ion-fab vertical="bottom" horizontal="end" slot="fixed">
        <ion-fab-button>
          <ios-arrow-up-icon w="30px" h="30px"/>
        </ion-fab-button>
        <ion-fab-list side="top">
          <ion-fab-button @click="openModal" color="medium"><ios-create-icon w="20px" h="20px"/></ion-fab-button>
          <ion-fab-button @click="openModal" color="danger"><ios-trash-icon w="20px" h="20px"/></ion-fab-button>
        </ion-fab-list>
      </ion-fab>

    </ion-content>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import CreatePlayerModal from '../components/CreatePlayerModal.vue';
export default {
    name: "Player",
    props:{
        playerId:{
            type: String,
        },
    },
    methods:{
        ...mapActions(['loadPlayerGames','savePlayer']),
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
                        title: 'Edit Player',
                        playerId: Number(this.playerId)
                    },
                    parent: this,
                },
            })
            .then(m => m.present())
        }
    },
    computed: {
        ...mapGetters(['getPlayers','getPlayer','getPlayerGames']),
    },
    created(){
        //console.log("CREATED:");
        this.loadPlayerGames(Number(this.playerId));
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
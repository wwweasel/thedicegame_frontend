<template>
  <div>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>

      <ion-fab vertical="top" edge="true" horizontal="end" slot="fixed">
        <ion-fab-button @click="onSubmit" color="light">
          <ios-checkmark-icon w="40px" h="40px"/>
        </ion-fab-button>
      </ion-fab>

      <ion-fab vertical="top" edge="true" horizontal="start" slot="fixed">
        <ion-fab-button @click="cancel" color="light">
          <ios-close-icon w="40px" h="40px"/>
        </ion-fab-button>
      </ion-fab>

      <ion-grid>
        <form @submit="onSubmit">
          <ion-col>
            <ion-item>
              <ion-label position="floating">Name</ion-label>
              <ion-input :input="emitPlayer.name" @input="typing" name="Bla" :placeholder="playerName"></ion-input><!--:input="test" @input="test=@event.target.value"-->
            </ion-item>
          </ion-col>
          <!--<ion-col>
            <ion-button type="submit" color="primary" expand="block">Create</ion-button>
            <ion-button @click="cancel" color="medium" expand="block">Cancel</ion-button>
          </ion-col>-->
        </form>
      </ion-grid>     
    </ion-content>
  </div>
</template>

<script>
export default {
  name: 'CreatePlayerModal',
  props: {
    title: { type: String, default: 'Create Player' },
    playerId: { type: Number, default: null },
    playerName: { type: String, default: null }
  },
  data() {
    return {
      content: 'Content',
      emitPlayer: {
        id: this.playerId,
        name: this.playerName
      }
    }
  },
  methods:{
    onSubmit(event){
        event.preventDefault();
        this.$parent.$emit('closeModal', this.emitPlayer);
        // The Modal will be closed(dismissed) by the parent
    },
    typing(event){
        this.emitPlayer.name = event.target.value;
    },
    cancel(){
      this.$ionic.modalController.dismiss(); 
    }
  }
}
</script>
<template>
  <div class="ion-page">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Players</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <CreatePlayer></CreatePlayer>
      <Players></Players>
    </ion-content>
  </div>
</template>

<script>
import CreatePlayer from '../components/CreatePlayer.vue';
import Players from '../components/Players.vue';

export default {
  name: 'Home',
  components: {
    CreatePlayer,
    Players
  }
}
</script>

<template>
  <div class="ion-page">
    <ion-content>
      <!--<CreatePlayer></CreatePlayer>-->
      <Players></Players>
    </ion-content>
  </div>
</template>

<script>
//import CreatePlayer from '../components/CreatePlayer.vue';
import Players from '../components/Players.vue';

export default {
  name: 'Home',
  components: {
    //CreatePlayer,
    Players
  }
}
</script>

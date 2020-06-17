<template>

  <div class="ion-page">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Player</ion-title>
        <ion-buttons slot="start">
          <ion-back-button default-href="/"></ion-back-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
        <ion-card>
            <ion-card-header>
                <ion-card-subtitle>{{playerId}}</ion-card-subtitle>
                <ion-card-title>PlayerName</ion-card-title>
            </ion-card-header>

            <ion-card-content>
                Keep close to Nature's heart... and break clear away, once in awhile,
                and climb a mountain or spend a week in the woods. Wash your spirit clean.
            </ion-card-content>
        </ion-card>
    </ion-content>
  </div>

</template>

<script>
export default {
    name: "Player",
    props:{
        playerId:{
            type: String,
        },
    },
}
</script>
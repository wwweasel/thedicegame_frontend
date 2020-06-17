<template>
    <ion-grid>
        <form @submit="onSubmit">
            <ion-col>
                <ion-item>
                    <ion-label>Name</ion-label>
                    <ion-input :input="test" @input="typing" name="Bla" placeholder="Enter your Player's name here"></ion-input><!--:input="test" @input="test=@event.target.value"-->
                </ion-item>
            </ion-col>
            <ion-col>
                <ion-button type="submit" color="primary" expand="block">go!</ion-button>
            </ion-col>
        </form>
    </ion-grid>
</template>

<script>
export default {
    name: "CreatePlayer",
    data(){
        return {
            test: "test"
        }
    },
    methods:{
        onSubmit(event){
            event.preventDefault();
            console.log(this.test);
        },
        typing(event){
            this.test = event.target.value;
        }
    }
}
</script>
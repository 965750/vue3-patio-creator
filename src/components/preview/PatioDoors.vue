<template>
    <div class="patioDoors flex absolute">
        <DoorMeasure measureType="width" />
        <DoorMeasure measureType="height" />
        <div
            class="sideDoor"
            :style="doorStyles"
        >
        </div>
        <div v-if="(currentDoor.doors > 1)">
            <DoorMeasure />
            <div
                class="sideDoor"
                :style="doorStyles"
            >
            </div>
        </div>
        <div class="patioDoors__shadow absolute">

        </div>
    </div>
</template>

<script>
import {
    computed
} from 'vue'
import DoorMeasure from './DoorMeasure.vue'
import { storeFav } from '@/composables/storeFav'

export default {
    name: "PatioDoors",
    setup() {
        const { currentDoor } = storeFav()
        
        let doorStyles = computed(() => {
            return {
                border: `10px solid ${currentDoor.value.color}`,
                height: `${currentDoor.value.height}px`,
                width: `${currentDoor.value.width}px`,
            }
        })

        return {
            doorStyles,
            currentDoor
        }
    },
    components: {
        DoorMeasure
    }
}
</script>

<style lang="scss" scoped>
.patioDoors {
    bottom: 50px;
    left: 50%;
    transform: translate(-50%);
    background: no-repeat url("../../assets/patio.jpg");
    background-position: 0% 100%;

    &__shadow {
        border: 2px dashed #ccc;
        height: 280px;
        width: 300px;
        bottom: 0px;
    }
}
</style>

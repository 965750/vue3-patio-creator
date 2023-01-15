<template>
    <div class="buttonContainer">
        <button @click="changeDoorsNumber(1)" :class="{'splitSingleButton--active': currentDoor.doors === 1}" class="splitSingleButton bold">
            1
        </button>
        <button @click="changeDoorsNumber(2)" :class="{'splitSingleButton--active': currentDoor.doors === 2}" class="splitSingleButton bold">
            2
        </button>
    </div>
</template>

<script>
import { storeFav } from '@/composables/storeFav'

export default {
    name: 'DoubleButton',
    setup() {
        const { store, currentDoor } = storeFav()

        const changeDoorsNumber = (doorsNumber) => {
            store.dispatch('updateDoor', {
                attr: 'doors',
                value: doorsNumber
            })
        }

        return {
            changeDoorsNumber,
            currentDoor
        }
    }
}
</script>

<style lang="scss" scoped>
.buttonContainer {
    height: 40px;
    border-radius: 40px;
    display: flex;
    justify-content: center;
    overflow: hidden;
}

.splitSingleButton {
    border: none;
    background: rgb(1, 230, 14);
    background: linear-gradient(0deg, rgba(1, 230, 14, 1) 0%, rgba(6, 244, 19, 1) 50%, rgba(6, 244, 19, 1) 100%);
    height: 100%;
    width: 100%;
    cursor: pointer;
    color: #FFF;
    font-size: $fontHeader;

    &:hover {
        background: darken(rgb(1, 230, 14), 1%);
    }

    &--active {
        background: darken(rgb(1, 230, 14), 3%)
    }

    &:nth-child(1) {
        border-right: 1px solid $secondary;
    }
}
</style>

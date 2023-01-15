<template>
    <div class="editorContainer">
        <InputSlider
            label="Window Height"
            :range="{min: 210, max: 280, step: 5}"
            metric="cm"
            name="height"
        />
        <InputSlider
            label="Window Width"
            :range="{min: 80, max: 150, step: 5}"
            metric="cm"
            name="width"
            class="mt-3"
        />
        <p class="bold mt-3">Doors number</p>
        <DoubleButton />
        <p class="bold mt-3">
            Doors color
        </p>
        <ColorPicker />
        <InputButton class="mt-5" />
        <GoBack class="backBtn" />
    </div>
</template>

<script>
import InputSlider from '@/components/editor/InputSlider.vue'
import DoubleButton from '@/components/editor/DoubleButton.vue'
import ColorPicker from '@/components/editor/ColorPicker.vue'
import InputButton from '@/components/editor/InputButton.vue'
import GoBack from '@/components/minor/GoBack.vue'

export default {
    name: 'PatioEditor',
    components: {
        InputSlider,
        DoubleButton,
        ColorPicker,
        InputButton,
        GoBack
    }
}
</script>

<style lang="scss" scoped>
.editorContainer {
    padding: 10px;
}

.backBtn {
    position: absolute;
    right: 10px;
    bottom: 5px;
}
</style>

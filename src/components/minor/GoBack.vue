<template>
    <div class="flex backBtn" @click="goBack">
        <Unicon width="20" height="20" name="step-backward" fill="#24c449" />
        <p class="ml-2">back to project list</p>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'

export default {
    name: 'GoBack',
    setup() {
        const router = useRouter()

        const goBack = () => {
            router.push({
                name: 'SavedProjects'
            })
        }

        return {
            goBack
        }
    }
}
</script>

<style lang="scss" scoped>
.backBtn {
    color: $secondary;
    cursor: pointer;
}
</style>
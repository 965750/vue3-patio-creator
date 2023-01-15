<template>
    <div>
        <ProjectsList v-if="!isLoading" />
        <LoadingSpinner v-else />
    </div>
</template>

<script>
import ProjectsList from '@/components/projects/ProjectsList.vue'
import LoadingSpinner from '@/components/minor/LoadingSpinner.vue'
import {
    useStore
} from 'vuex'
import {
  computed,
  onMounted
} from 'vue'

export default {
    name: 'SavedProjects',
    components: {
        ProjectsList,
        LoadingSpinner
    },
    setup() {
        const store = useStore()
        const isLoading = computed(() => store.getters.isLoading)

        onMounted(() => {
            store.dispatch('getProjects')
        })

        return {
            isLoading
        }
    }
}
</script>

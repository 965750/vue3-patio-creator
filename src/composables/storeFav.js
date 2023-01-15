import {
    useStore
} from 'vuex'
import {
    computed
} from 'vue'

export function storeFav() {
    
    const store = useStore()

    // most often used getters
    const currentDoor = computed(() => store.getters.currentDoor)

    return {
        store,
        currentDoor
    }
}
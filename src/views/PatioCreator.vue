<template>
    <div class="creatorWindow">
        <div
            v-if="!isLoading"
            class="creatorWindow__content flex h-full"
        >
            <div class="preview h-full">
                <PreviewWindow />
            </div>
            <div class="editor h-full">
                <PatioEditor />
            </div>
        </div>
        <LoadingSpinner v-else />
    </div>
</template>

<script>
import LoadingSpinner from '@/components/minor/LoadingSpinner.vue'
import PatioEditor from '@/components/editor/PatioEditor.vue'
import PreviewWindow from '@/components/preview/PreviewWindow.vue'
import {
    onMounted,
    computed
} from 'vue'
import {
    useRoute
} from 'vue-router'
import {
    useStore
} from 'vuex'

export default {
    name: 'PatioCreator',
    components: {
        PatioEditor,
        PreviewWindow,
        LoadingSpinner
    },
    setup() {
        const route = useRoute()
        const store = useStore()

        onMounted(() => {
            if (route.params.id && route.params.id !== 'new') {
                store.dispatch('loadProject', route.params.id)
            } else {
                store.dispatch('createDefaultProject')
            }
        })

        const isLoading = computed(() => store.getters.isLoading)

        return {
            isLoading
        }
    }
}
</script>

<style lang="scss" scoped>
.creatorWindow {
    height: 420px;
    width: 900px;
    border: 1px solid $darkest;
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translate(-50%);
    border-radius: 20px;
    overflow: hidden;
}

.preview {
    width: 70%;
}

.editor {
    width: 30%;
    border-left: 1px solid $darkest;
}

@media screen and (max-width: 1024px) {
    .creatorWindow {
        width: 98%;
    }

    .preview {
        width: 60%;
    }

    .editor {
        width: 40%;
    }
}

@media screen and (max-width: 768px) {
    .creatorWindow {
        width: 100%;
        height: auto;
        border: none;
        overflow: auto;
        border-radius: 0px;
        top: 0px;

        &__content {
            flex-direction: column;
            align-items: center;
        }

        .preview {
            overflow: hidden;
            height: 420px;
            width: 100%;
        }

        .editor {
            border: none;
            height: 420px;
            width: 100%;
            padding: 0 30px;
        }
    }
}
</style>

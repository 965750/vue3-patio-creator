<template>
    <div
        class="box"
        :class="{'box--new': !saved}"
    >
        <div
            v-if="!saved"
            class="boxContent"
        >
            <div
            data-cy-create-project-btn
                @click="createProject"
                class="boxContent__circle m-auto flex justify-center items-center"
            >
                <Unicon
                    width="120"
                    height="120"
                    name="plus"
                    fill="#fff"
                />
            </div>
            <p
                @click="createProject"
                class="boxContent__create mt-4"
            >CREATE A NEW PROJECT</p>
        </div>
        <div
            v-else
            class="boxContent relative"
        >
            <div
            data-cy-load-project-btn
                @click="loadProject"
                class="boxContent__circle m-auto flex justify-center items-center"
            >
                <Unicon
                    width="120"
                    height="120"
                    name="play"
                    fill="#fff"
                />
            </div>
            <div class="flex justify-between">
                <div class="mt-3">
                    <p>
                        <span class="bold">Project Name:</span>
                        <span class="boxContent__text">{{ project.name }}</span>
                    </p>
                    <p>
                        <span class="bold">Last Update:</span>
                        <span class="boxContent__text">{{ timeDistance }}</span>
                    </p>
                </div>
                <div
                :data-cy="`delete-btn-${project.name}`"
                    class="boxContent__delete absolute pt-1"
                    @click="deleteProject"
                >
                    <Unicon
                        width="30"
                        height="30"
                        name="trash"
                        fill="#fff"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    ref,
    computed
} from "vue"
import {
    formatDistanceToNow,
} from 'date-fns'
import {
    useRouter
} from "vue-router"
import {
    useStore
} from "vuex"

export default {
    name: 'ProjectBox',
    props: {
        saved: {
            required: false,
            type: Boolean
        },
        project: {
            required: false,
            type: Object
        }
    },
    setup(props) {
        const name = ref('placeholder name')
        const router = useRouter()
        const store = useStore()

        const timeDistance = computed(() => {
            if(props.project.updatedAt) {
                return formatDistanceToNow(Number(props.project.updatedAt.seconds + '000')) + ' ago'
            } else {
                return 'Some time ago'
            }
        })

        const createProject = () => {
            store.dispatch('createDefaultProject')
            router.push({
                name: 'PatioCreator',
                params: {
                    id: 'new'
                }
            })
        }

        const loadProject = () => {
            store.dispatch('switchIsLoading', true)
            router.push({
                name: 'PatioCreator',
                params: {
                    id: props.project.id
                }
            })
        }

        const deleteProject = () => {
            store.dispatch('deleteProject', props.project.id)
        }

        return {
            loadProject,
            createProject,
            deleteProject,
            name,
            timeDistance
        }
    }
}
</script>

<style lang="scss" scoped>
.box {
    width: 300px;
    border-radius: 20px;
    // border: 1px solid rgba($dark, .1);
    margin: 10px;
    background: rgba($secondary, .1);
    box-shadow: 5px 5px 10px 5px $dark;

    &--new {
        border: 1px solid $secondary;
        color: $secondary;
        background: rgba($secondary, .15);
    }
}

.boxContent {
    padding: 20px;
    text-align: left;

    &__create {
        font-weight: bold;
        font-size: $fontBig;
        cursor: pointer;
    }

    &__text {
        margin-left: 10px;
    }

    &__circle {
        background: $primary;
        border-radius: 50%;
        height: 150px;
        width: 150px;
        opacity: .6;
        transition: all .2s;

        &:hover {
            opacity: 1;
        }
    }

    &__delete {
        background: #dc3e3e;
        border-radius: 50%;
        height: 40px;
        width: 40px;
        top: 5px;
        right: 5px;
        opacity: .5;
        transition: all .2s;

        &:hover {
            opacity: .9;
        }
    }
}
</style>

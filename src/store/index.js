import { createStore } from 'vuex'
import router from '@/router/index'
import { notify } from "@kyvg/vue3-notification"
import { projectFirestore, timestamp } from '@/firebase/config'

export default createStore({
  state: {
    projects: [],
    door: {
      height: 250,
      width: 120,
      doors: 2,
      color: '#712f00',
      name: ''
    },
    isLoading: false
  },
  getters: {
    currentDoor: (state) => state.door,
    savedProjects: (state) => state.projects,
    isLoading: (state) => state.isLoading
  },
  mutations: {
    updateDoor (state, {attr, value}) {
      state.door[attr] = value
    },
    setDoor (state, payload) {
      state.door = payload
    },
    setDefaultDoor (state) {
      state.door = {
        height: 250,
        width: 120,
        doors: 2,
        color: '#712f00',
        name: ''
      }
    },
    switchIsLoading(state, payload) {
      state.isLoading = payload
    }
  },
  actions: {
    updateDoor ({commit}, payload) {
      commit('updateDoor', payload)
    },
    async saveProjectUpdate ({commit, state}, localName) {
      try {
        await projectFirestore.collection('savedProjects').doc(state.door.id).update({ 
          ...state.door,
          name: localName,
          updatedAt: timestamp()
          })
          console.log('project updated')
          commit('setDefaultDoor')
          commit('switchIsLoading', false)
          
          router.push({
            name: 'SavedProjects'
          })

          notify({
            text: 'Project updated',
            type: 'success'
          })
      } catch(error) {
        notify({
          text: "Error, try again later",
          type: "error"
        })
        console.log(error)
        commit('switchIsLoading', false)
      }
    },
    async saveProject ({commit, state, dispatch}, localName) {
      if (localName === state.door.name) {
        dispatch('saveProjectUpdate', localName)
      } else {
        try {
          await projectFirestore.collection('savedProjects').add({ 
            ...state.door,
            name: localName,
             updatedAt: timestamp()
            })
            console.log('project saved')
            commit('setDefaultDoor')
            commit('switchIsLoading', false)
            
            router.push({
              name: 'SavedProjects'
            })
  
            notify({
              text: 'Project saved',
              type: 'success'
            })
        } catch(error) {
          notify({
            text: "Error, try again later",
            type: "error"
          })
          console.log(error)
          commit('switchIsLoading', false)
        }
      }
    },
    async getProjects ({commit, state}) {
      try {
        const projects = await projectFirestore.collection('savedProjects').get()
        
        state.projects = projects.docs.map(doc => {
          return {...doc.data(), id: doc.id }
        })
        console.log('projects loaded')
        commit('switchIsLoading', false)
      } catch(error) {
        notify({
          text: "Error, try again later",
          type: "error"
        })
        console.log(error)
        commit('switchIsLoading', false)
      }
    },
    async deleteProject ({dispatch}, id) {
      try {
        await projectFirestore.collection('savedProjects').doc(id).delete()
        console.log('project deleted')
        dispatch('getProjects')
        notify({
          text: "Project deleted",
          type: "success"
        })
      } catch(error) {
        notify({
          text: "Error, try again later",
          type: "error"
        })
        console.log(error)
      }
    },
    async loadProject ({commit }, id) {
      try {
        const door = await projectFirestore.collection('savedProjects').doc(id).get()
        if (!door.data()) {
          throw Error('wrong project id')
        }
        commit('setDoor', { ...door.data(), id })
        commit('switchIsLoading', false)
        notify({
          text: "Project loaded",
          type: "success"
        })
      } catch(error) {
        notify({
          text: "Error, try again later, or load different project",
          type: "error"
        })
        router.push({
          name: 'SavedProjects'
        })
        commit('setDefaultDoor')
        commit('switchIsLoading', false)
      }
    },
    createDefaultProject({commit}) {
      commit('setDefaultDoor')
    },
    switchIsLoading({commit}, payload) {
      commit('switchIsLoading', payload)
    }
  },
  modules: {
  }
})

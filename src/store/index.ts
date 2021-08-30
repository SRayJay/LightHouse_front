
// import getters from './getters'
import { createStore } from 'vuex'
import user from './modules/user.js'
const store = createStore({
    modules: {
        user
    },
    // getters
})

export default store

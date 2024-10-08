import {
    getStyle, setStyle
} from '../../utils/auth'

const style = {
    state: {
        style: getStyle()
    },

    mutations: {
        SET_STYLE: (state, style) => {
            state.style = style
        }
    },

    actions: {
        setStyle({commit}, style) {
            console.log('====setStyle>', style)
            commit('SET_STYLE', style)
            setStyle(style)
        }
    }
}

export default style

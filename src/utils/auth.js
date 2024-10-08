import {
    getToken,
    setToken,
    removeToken,
    getCurrentRole,
    setCurrentRole,
    removeCurrentRole,
    getTheme,
    setTheme,
    removeTheme,
    isSSORequest,
    isSSOLogin
} from '@eladmin/utils/auth'
import Cookies from "js-cookie";
import Config from "@public/config/settings";

export {
    getToken,
    setToken,
    removeToken,
    getCurrentRole,
    setCurrentRole,
    removeCurrentRole,
    getTheme,
    setTheme,
    removeTheme
}

export function getStyle() {
    const theme = Cookies.get('_current.style')
    if (theme && typeof theme === 'string') {
        return JSON.parse(theme)
    }
    return Config.defaultTheme
}

export function setStyle(theme) {
    //console.debug('======set theme=======', theme)
    if (theme) {
        return Cookies.set('_current.style', JSON.stringify(theme))
    }
}

export function removeStyle() {
    return Cookies.remove('_current.style')
}


/**
 * 查询我的相关任务
 * @param param
 */
export function todoCount() {
    return new Promise({
            url: urls + '/tasks/todo/count',
            method: 'get'
        }
    )
}

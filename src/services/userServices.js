import {httpAxios} from '@/db/httpHelper'

export const SignUp = async (user) => {
    try {
        const result = await httpAxios.post('/api/users',user)
        return result;
    } catch (error) {
        return error;
    }
}

export const login = async (user) => {
    try {
        const result = await httpAxios.post('/api/login',user)
        return result;
    } catch (error) {
        return error;
    }
}

export const logout = async () => {
    try {
        const result = await httpAxios.post('/api/logout')
        return result;
    } catch (error) {
        return error;
    }
}
interface LoginRequest {
  email: string
  password: string
}

const authentificationStore = useAuthentificationStore()

export const useApiAuthentification = () => ({
  login(data: LoginRequest): Promise<any> {
    return new Promise((resolve, reject) => {
      useAxios().post('/auth', data).then((response) => {
        // const cookie = useCookie('auth._token.local')
        // cookie.value = response.data.token
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  logout(): Promise<any> {
    return new Promise((resolve, reject) => {
      useAxios().post('/logout').then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      }).finally(() => {
        authentificationStore.removeUser()
        const cookie = useCookie('auth._token.local')
        cookie.value = null
        navigateTo('/')
      })
    })
  },

  getUser(): Promise<any> {
    return new Promise((resolve, reject) => {
      useAxios().get('/me').then((response) => {
        authentificationStore.setUser(response.data)
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  }
})

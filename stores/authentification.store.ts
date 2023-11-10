interface User {
    id: number,
    name: string
}

export const useAuthentificationStore = defineStore('authentification', {
    state: () => ({
        loggedIn: false as boolean,
        user: null as User | null,
        showLoginDialog: false as boolean
    }),
    getters: {
        displayName(): string {
            return this.user?.name
        }
    },
    actions: {
        setUser(user: User): void {
            this.user = user
            this.loggedIn = true
        },
        removeUser(): void {
            this.user = null
            this.loggedIn = false
        },
        openLoginDialog(): void {
            this.showLoginDialog = true
        },
        closeLoginDialog(): void {
            this.showLoginDialog = false
        }
    }
})

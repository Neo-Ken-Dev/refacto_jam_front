export const useApiProduct = () => ({
  index(): Promise<any> {
    return new Promise((resolve, reject) => {
      useAxios().get('api/products').then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  }
})
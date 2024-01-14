export const useApiCategory = () => ({
  index(): Promise<any> {
    return new Promise((resolve, reject) => {
      useAxios().get('api/categories').then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  }
});

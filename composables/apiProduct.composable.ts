export const useApiProduct = () => ({
  index(): Promise<any> {
    return new Promise((resolve, reject) => {
      useAxios().get('api/products').then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  },

  search(params): Promise<any> {
    const query = new URLSearchParams(params).toString();
    return useAxios().get(`api/products?${query}`);
  }
})
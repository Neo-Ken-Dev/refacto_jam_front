export const useApiCart = () => ({
  addToCart(productId: number, quantity: any): Promise<any> {
    return new Promise((resolve, reject) => {
      useAxios().post(`/addCart/${productId}`, quantity).then((response) => {
        resolve(response)
      }).catch((error) => {
        reject(error)
      })
    })
  }
})
import axios from "axios";

const instance = axios.create({
  baseURL: 'https://test.v5.pryaniky.com',
})


export const api = {
  getJWT(username: string, password: string, callback: Function) {
    instance.post('/ru/data/v3/testmethods/docs/login', {username, password})
      .then((jwt) => {
        sessionStorage.setItem('x-auth', jwt.data.data.token)
        callback()
      })
      .catch(err => {
        console.log(err)
      })
  },
  autoSignIn(callback: Function) {
    const jwt = sessionStorage.getItem('x-auth')
    if (!jwt) {
      callback('/')
    } else {
      callback('table')
    }
  },
  getTable() {
    return instance.get('/ru/data/v3/testmethods/docs/userdocs/get', {
      headers: {
        'x-auth': sessionStorage.getItem('x-auth')
      }
    })
  },
  addData(obj: any) {
    return instance.post('/ru/data/v3/testmethods/docs/userdocs/create', obj,{
      headers: {
        'x-auth': sessionStorage.getItem('x-auth')
      }
    })
  },
  deleteData(id: string) {
    return instance.post(`/ru/data/v3/testmethods/docs/userdocs/delete/${id}`,{
      headers: {
        'x-auth': sessionStorage.getItem('x-auth')
      }
    })
  },
  changeData(id: string, obj: any) {
    return instance.post(`/ru/data/v3/testmethods/docs/userdocs/set/${id}`, obj,{
      headers: {
        'x-auth': sessionStorage.getItem('x-auth')
      }
    })
  }
}
// import type { AxiosProgressEvent, GenericAbortSignal } from 'axios'

// export function loginAPI<T = any>() {
//   return post<T>({
//     url: '/config',
//   })
// }

// import axios from '@/utils/request'
import { post } from '@/utils/request'
export const loginApi = (data: any) => {
  return post({
    url: '/login',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data,
  })
}

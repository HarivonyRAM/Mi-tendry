import { apiUrl } from '../../../app/config'
import authService from '../../auth/services/auth.service'

export const getTemplateListRequest = async (): Promise<any> => {

  const response = await fetch(`${apiUrl}/template/list`, {
    method: 'GET',
    headers: {
      'authorization': `Bearer ${authService.getToken()}`,
    }
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Get template list failed')
  }

  return response.json()
}

export const playNewRequest = async (file: File, type: string): Promise<any> => {
  const response = await fetch(`${apiUrl}/play/new`, {
    method: "POST",
    headers: {
      'authorization': `Bearer ${authService.getToken()}`,
      // 'Content-Type': 'multipart/form-data',
    },
    body: (() => {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("type", type)

      return formData
    })()
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Get template list failed')
  }

  return response.json()
}

export const playRequest = async (id: string, type: string): Promise<any> => {
  const response = await fetch(`${apiUrl}/play`, {
    method: "POST",
    headers: {
      'authorization': `Bearer ${authService.getToken()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, type })
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Get template list failed')
  }

  return response.json()
}
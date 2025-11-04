import { apiUrl } from '../../../app/config'

export const getTemplateListRequest = async (): Promise<any> => {

  const response = await fetch(`${apiUrl}/template/list`, {
    method: 'GET'
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'Get template list failed')
  }

  return response.json()
}
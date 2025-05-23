import axios from "axios";
import { BACKEND_API_BASE_URL } from "../config";
import { validateImageFetch } from "../schema/image";


export async function getAllImages() {
    const resp = await axios.get(`${BACKEND_API_BASE_URL}/api/image`,
        {
            withCredentials: true
        }
    )
    const parsedResp = validateImageFetch.safeParse(resp.data)
    if(!parsedResp.success) {
        return [];
    }

    return parsedResp.data
}

export async function getImage(id: string) {

    const resp = await axios.get(BACKEND_API_BASE_URL + `/api/image/${id}`,
        {
            withCredentials: true,
            responseType: "blob"
        }
    )
    return URL.createObjectURL(resp.data);

} 

export function uploadImage(
    file: File,
) {
    const formData = new FormData();
    formData.append("image", file);
    return axios.post(BACKEND_API_BASE_URL + "/api/image", formData,
    {
        withCredentials: true,
    });
}

export function deleteImage(id: string) {
  return axios.delete(BACKEND_API_BASE_URL + `/api/image/${id}`, {
    withCredentials: true,
  });
}
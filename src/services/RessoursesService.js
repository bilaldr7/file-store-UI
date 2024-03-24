import axios from 'axios';
import axiosInstance from '../utils/AxiosInstance'
const LoadData = () => {
    return axiosInstance.get('http://localhost:3000/api/nodes/root/content')
      .then(response => response.data?.values)
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
        throw error; // Pour propager l'erreur
      });
  };
  const AddFolder = (id,data) =>{
    return axios.post(`http://localhost:3000/api/nodes/${id}`,data);
  }
  const AddFile = (id,data) =>{
    return axios.post(`http://localhost:3000/api/nodes/${id}`,data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }
  const LoadFolderContent = (id) => {
    return axiosInstance.get(`http://localhost:3000/api/nodes/${id}/content`)
      .then(response => response.data?.values)
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
        throw error; // Pour propager l'erreur
      });
  };
  const LoadFileContent = (id) => {
    return axiosInstance.get(`http://localhost:3000/api/nodes/${id}/content`)
      .then(response => response.data)
      .catch(error => {
        console.error('Erreur lors de la récupération des données:', error);
        throw error; // Pour propager l'erreur
      });
  };
  const DownloadFile = (id) => {
    return axiosInstance.get(`http://localhost:3000/api/nodes/${id}/content?download=true`)
      .then(response => response.data)
      .catch(error => {
        console.error('Erreur lors téléchargement du fichier:', error);
        throw error; // Pour propager l'erreur
      });
  };

  const LoadMetrics = () =>{
    return axiosInstance.get(`http://localhost:3000/api/status`)
      .then(response => response.data)
      .catch(error => {
        console.error('Erreur lors de récupération des stats:', error);
        throw error; // Pour propager l'erreur
      });
  }
  const LoadNeighbours = () =>{
    return axiosInstance.get(`http://localhost:3000/api/network`);
  }


  export const RessourceService = {
    LoadData,
    LoadFolderContent,
    LoadFileContent,
    AddFolder,
    AddFile,
    DownloadFile,
    LoadMetrics,
    LoadNeighbours
  };

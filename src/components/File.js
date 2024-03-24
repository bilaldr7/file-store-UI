import React from 'react'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { RessourceService } from '../services/RessoursesService'

export default function File() {
  const [data, setData] = useState([]);
  let { fileId } = useParams();
  let history = useHistory();

  useEffect(() => {
    LoadData(fileId);
  }, [fileId]);

  async function LoadData(id) {
    try {
      const response = await RessourceService.LoadFileContent(id);
      console.log(response)
      setData(response);
    } catch (error) {
      if (error.response.status === 404) {
        history.push("/notfound");
      } else {
        console.error('Erreur lors de la récupération des données dans le composant:', error);
      }
    }
  }
  return (
    <div className='file-display'>{data ? data : "fichier vide"}</div>
  )
}

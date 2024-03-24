import React from 'react'
import { useState, useEffect } from 'react'
import Table from './Table'
import AddFile from './AddFile'
import AddFolder from './AddFolder'
import { RessourceService } from '../services/RessoursesService'
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import Loader from './Loader'
import { notification } from '../utils/Alert'

export default function FilesList() {
  const [data, setData] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  let { dossierId } = useParams();
  let history = useHistory();

  useEffect(() => {
    LoadData();
  }, [dossierId]);

  async function LoadData() {
    try {
      const response = await RessourceService.LoadFolderContent(dossierId);
      setData(response);
      setisLoading(false);
    } catch (error) {
      console.log(error.response)
      if (error.response.status === 404) {
        history.push("/notfound");
      } else {
        notification("error", "", "Erreur lors de la récupération des données");
        console.error('Erreur lors de la récupération des données dans le composant:', error);
      }
      setisLoading(false);
    }
  }

  return (
    <div className=''>
      <div className='row px-3 mb-3'>
        <div className='col-auto'>
          <AddFolder loadData={LoadData} />
        </div>
        <div className='col-auto'>
          <AddFile loadData={LoadData}/>
        </div>
      </div>
      <div className={isLoading ? 'row px-3 justify-content-center' : 'row px-3'}>

        {isLoading ? <div className='col-auto'><Loader /></div> : <Table rows={data} />}
      </div>
    </div>
  )
}

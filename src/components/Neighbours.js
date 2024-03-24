import React, { useState, useEffect } from 'react'
import { RessourceService } from '../services/RessoursesService';
import Loader from './Loader';
import { notification } from '../utils/Alert';

export default function Neighbours() {
    const [networks, setnetworks] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    useEffect(() => {
        LoadData();
    }, []);
    async function LoadData() {
        await RessourceService.LoadNeighbours().then(response => {
            setnetworks(response.data);
            setisLoading(false);
        })
            .catch(error => {
                notification("error", "Erreur", error.response.data);
                setisLoading(false);
                console.error('Erreur lors de récupération des stats:', error);
            });
    }
    return (
        <div className={isLoading ? 'row justify-content-center' : 'row'}>
            {isLoading ? <div className='col-auto'><Loader /></div> : networks.length>0 ? networks.map((item, key) => {
                return (
                    <div className="col-xl-3 col-sm-6 col-12 mb-2">
                        <div className="card">
                            <div className="card-content">
                                <div className="card-body">
                                    <div className="row">
                                        <div className='col-4 d-flex justify-content-center align-items-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-user"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" /><path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" /></svg>
                                        </div>
                                        <div className='col-8'>
                                            <div className="media-body text-right">
                                                <p className='mb-1 fs-18 fw-600'>{item?.name}</p>
                                                <p>{item?.address}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }):<div>no data avaible</div>}

        </div>
    )
}

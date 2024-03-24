import React, { useEffect, useState } from 'react'
import { RessourceService } from '../services/RessoursesService';
import Loader from './Loader';
export default function Metrics() {
    const [metrics, setMetrics] = useState([]);
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, [])

    async function loadData() {
        await RessourceService.LoadMetrics().then((response) => {
            setMetrics(response);
            setisLoading(false);
        })
    }
    function sizeToBytes(bytes, si = false) {
        const unit = si ? 1000 : 1024;
        if (bytes < unit) return bytes + " B";
        const exp = Math.floor(Math.log(bytes) / Math.log(unit));
        const pre = (si ? "kMGTPE" : "KMGTPE")[exp - 1] + (si ? "" : "i");
        return `${(bytes / Math.pow(unit, exp)).toFixed(1)} ${pre}B`;
    }

    return (
        <div className={isLoading ? 'row justify-content-center' : 'row'}>
            {isLoading ? <div className='col-auto'><Loader /></div> : <><div className="col-md-4 col-xl-3">
                <div className="card bg-c-blue order-card">
                    <div className="card-block">
                        <h6 className="m-b-20">Downloads</h6>
                        <h2 className="text-right"><span>{metrics?.metrics?.download || 0}</span></h2>
                        <p className="m-b-0">Download Files</p>
                    </div>
                </div>
            </div>

                <div className="col-md-4 col-xl-3">
                    <div className="card bg-c-green order-card">
                        <div className="card-block">
                            <h6 className="m-b-20">Uploads</h6>
                            <h2 className="text-right"><span>{metrics?.metrics?.upload || 0}</span></h2>
                            <p className="m-b-0">Uploaded Files</p>
                        </div>
                    </div>
                </div>

                <div className="col-md-4 col-xl-4 col-xxl-3">
                    <div className="card bg-c-yellow order-card">
                        <div className="card-block">
                            <h6 className="m-b-20">Mémoire</h6>
                            <h2 className="text-right"><span>{sizeToBytes(metrics.availableMemory)}/{sizeToBytes(metrics.totalMemory)}</span></h2>
                            <p className="m-b-0">Used / Total</p>
                        </div>
                    </div>
                </div></>
            }
        </div>
    )
}

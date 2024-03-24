import * as React from 'react';
import FolderIcon from '@mui/icons-material/Folder';
import { RessourceService } from '../services/RessoursesService';
import DownloadIcon from '@mui/icons-material/Download';
import VisibilityIcon from '@mui/icons-material/Visibility'
import { Link } from 'react-router-dom/cjs/react-router-dom';

export default function Table({ rows }) {


  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };
  function sizeToBytes(bytes, si = false) {
    const unit = si ? 1000 : 1024;
    if (bytes < unit) return bytes + " B";
    const exp = Math.floor(Math.log(bytes) / Math.log(unit));
    const pre = (si ? "kMGTPE" : "KMGTPE")[exp - 1] + (si ? "" : "i");
    return `${(bytes / Math.pow(unit, exp)).toFixed(1)} ${pre}B`;
}
  return (
      <div className="col-12 w-100" >
        <div className='border overflow-auto'>
        <table className="table table-striped w-100" id="filestable">
          <thead>
            <tr>
              <th data-priority="1">Nom</th>
              <th>Taille</th>
              <th>Type</th>
              <th className="sort-numeric">Date de création</th>
              <th className="sort-numeric">Date de modification</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className='text-capitalize'>
                <Link to={`/dossiers/root`}><FolderIcon />&nbsp;...</Link>
              </td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
            {rows?.map((item, key) => {
              return (
                <tr key={key}>
                  <td className='text-capitalize'>
                    {item?.folder ? <Link to={`/dossiers/${item?.id}`} ><FolderIcon />&nbsp;{item?.name}</Link> : <Link to={`/files/${item?.id}`} target="_blank">{item?.name}</Link>}
                  </td>
                  <td>{item?.folder ? item?.size + " élément" : sizeToBytes(item?.size)}</td>
                  <td>{item?.mimetype}</td>
                  <td>{item?.creation && formatDate(item.creation)}</td>
                  <td>{item?.modification && formatDate(item.modification)}</td>
                  <td>
                  {!item?.folder && <Link to={`/files/${item?.id}`} target="_blank"><VisibilityIcon /></Link>}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        </div>
      </div>
  );
}
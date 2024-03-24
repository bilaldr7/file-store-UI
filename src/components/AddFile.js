import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { RessourceService } from '../services/RessoursesService';
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { notification } from '../utils/Alert';

export default function AddFile({loadData}) {
    const [show, setShow] = useState(false);
    const [file, setFile] = useState(null);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    let { dossierId } = useParams();

    const handleFileChange = (e) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };
    const handleUpload = async () => {
        if(!file){
            notification("error", "Erreur", "aucun fichier choisi");
        }else{
            var formData = new FormData();
            formData.append('name', file.name);
            formData.append('data', file);
            await RessourceService.AddFile(dossierId,formData).then((response)=>{
                loadData();
                notification("success", "Succès", "fichier importer avec succès");
            }).catch(error => {
                if(error.code = "ERR_NETWORK"){
                    loadData();
                    notification("success", "Succès", "fichier importer avec succès");
                }else{
                    notification("error", "Erreur", "Erreur lors de l'importation du fichier");
                }
                handleClose();
                console.error('Erreur lors de la création de dossier:', error);
            });
        }
      };
    return (
        <>
            <Button variant="primary" className='btn-sm' onClick={handleShow}>
                <FileUploadIcon />
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Importer votre fichier</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='w-100'>
                        <span className="file-input btn btn-primary btn-file w-100">
                            Choisir&hellip; <input type="file" onChange={handleFileChange} />
                        </span>
                    </div>
                    {file && (
                        <section className='mt-2'>
                            File details:
                            <ul>
                                <li>Name: {file.name}</li>
                                <li>Type: {file.type}</li>
                                <li>Size: {file.size} bytes</li>
                            </ul>
                        </section>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='btn-sm' onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button variant="primary" className='btn-sm' onClick={handleUpload}>
                        Ajouter
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

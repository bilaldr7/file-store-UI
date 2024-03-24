import React from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddIcon from '@mui/icons-material/Add';
import { RessourceService } from '../services/RessoursesService';
import { useParams } from 'react-router-dom/cjs/react-router-dom'
import { notification } from '../utils/Alert';

export default function AddFolder({loadData}) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [folderName, setFolderName] = useState("");
    let { dossierId } = useParams();

    async function addFolder() {
        if (folderName) {
            await RessourceService.AddFolder(dossierId, { name: folderName }).then((response) => {
                if (response.status === 201) {
                    notification("success", "Succès", "dossier créer avec succès")
                    handleClose();
                }
                loadData();
            }).catch(error => {
                notification("error", "Erreur", error.response.data.message);
                handleClose();
                console.error('Erreur lors de la création de dossier:', error);
            });
        } else {
            notification("error", "Erreur", "le nom du dossier est obligatoire")
        }
    }

    return (
        <>
            <Button variant="primary" className='btn btn-sm' onClick={handleShow}>
                <AddIcon />
            </Button>

            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title className='fs-18 fw-600'>Ajouter un nouveau dossier</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='w-100'>
                        <label className='fs-small mb-2'>Nom du dossier</label>
                        <input className='form-control' type='text' placeholder='nouveau dossier' required onChange={(e) => {
                            setFolderName(e.target.value);
                        }} />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className='btn-sm' onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button variant="primary" className='btn-sm' onClick={(e) => { addFolder() }}>
                        Ajouter
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

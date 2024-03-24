import React from 'react'
import { Link } from 'react-router-dom/cjs/react-router-dom'

export default function NotFound() {
  return (
    <div className='container h-100'>
      <div className='row h-100 align-items-center'>
        <div class="col-md-12 text-center">
          <h1>404</h1>
          <h2>Page Not Found</h2>
          <p>
            Sorry, the page you are looking
            for does not exist.
          </p>
          <Link to="/dossiers/root" className="btn btn-primary text-white">Accueil</Link>
        </div>
      </div>
    </div>
  )
}

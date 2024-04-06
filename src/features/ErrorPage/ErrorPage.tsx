import React from 'react'
import './ErrorPage.css'
import superhero from '../../assets/superhero.png'

export const ErrorPage = () => {
  return (
    <div className='error-page_wrapper'>
        <p>Oooops! Our bad</p>
        <p>We are already fixing it</p>
       <div className='image_container'>
       <img src={superhero} alt="Superhero" />
       </div>
    </div>
  )
}
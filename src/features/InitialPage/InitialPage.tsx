
import React, { useEffect, useState } from 'react'
import './InitialPage.css'
import { useNavigate } from 'react-router'
import { Button } from '../Button/Button'

export const InitialPage = () => {

    const [redirect, setRedirect] = useState(false)
    const navigate = useNavigate()

    // redirect after 5 seconds if nothing happend
    useEffect(() => {
        setTimeout(() => {
            setRedirect(true)
        }, 5000)
    }, [])

    const handleSkip = () => {
        setRedirect(true)
    }

    //if intro skipped, automatically redirect on the solving page

    useEffect(() => {
        if (redirect) {
          navigate('/solve')
        }
      },
      [redirect, navigate]
    )

  return (
    <div className='initial-page_wrapper'>
        <div className='text_container'>
            <h3> We are happy to see you at Rapidata, our quiz-solving platform</h3>
            <p>  In each quiz, you'll see pictures and your job is to draw boxes over the objects that you see.</p>
            <p>The more puzzles you solve, the better you will, so don't worry if it seems hard at first.</p>
            <p>We'll provide you with instructions.</p>
            <p> Good luck!</p>
        </div>
        <Button className='skip_button' onClick={handleSkip}>Skip</Button>
    </div>
  )
}

import React from 'react'
import { useDocumentTitle } from 'usehooks-ts'
import { MARIO_GAME_ANIMATION_404_ERROR_PAGE_V3 } from '../constants'
const pageNotFound = ():React.ReactNode => {
  useDocumentTitle("Page Not Found!")
  return (
    <div className='flex justify-center items-center content-center'>
      <img src={MARIO_GAME_ANIMATION_404_ERROR_PAGE_V3} className='w-full' alt="Page Not Found" />
    </div>
  )
}

export default pageNotFound

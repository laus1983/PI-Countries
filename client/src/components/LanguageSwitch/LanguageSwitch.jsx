import React from 'react'
import { useDispatch, /*useSelector*/ } from 'react-redux'
import { useEffect, /*useState*/ } from 'react'
import { switchLanguage } from '../../actions/index'
// import './LanguageSwitch.css'

export default function LanguageSwitch() {
    const dispatch = useDispatch()
    // const language = useSelector((state) => state.language)
    
    useEffect(() => {
        dispatch(switchLanguage())
    }
    , [dispatch])

    function handleClick(e) {
        e.preventDefault()
        dispatch(switchLanguage(e.target.value))
    }

  return (
    <div className="switch-button">
      <button name='english' value={"en"} onClick={(e) => handleClick(e)}>EN</button>
      <button name='spanish' value={"es"} onClick={(e) => handleClick(e)}>ES</button>
    </div>
  )
}

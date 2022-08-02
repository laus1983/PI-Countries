import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, /*useState*/ } from 'react'
import { switchLanguage } from '../../actions/index'
import './LanguageSwitch.css'

export default function LanguageSwitch() {
    const dispatch = useDispatch()
    const language = useSelector((state) => state.language);
    
    useEffect(() => {
        dispatch(switchLanguage())
    }
    , [dispatch])

    function handleClick(event) {
      event.preventDefault()
        dispatch(switchLanguage(event.target.value))
    }

  return (
    <div className="switch-language">
      {/* <button name='english' value={"en"} onClick={(e) => handleClick(e)}>EN</button>
      <button name='spanish' value={"es"} onClick={(e) => handleClick(e)}>ES</button> */}
      <label className="switch-language-label">{language ? "Idioma: " : "Language: "}</label>
      <select className="switch-language-select" name='language' onChange={(event) => handleClick(event)}>
      {/* {language ? <option>Cambiar el idioma</option> : <option>Change language</option>} */}
        <option className="switch-language-option" value="es">ES</option>
        <option className="switch-language-option" value="en">EN</option>
      </select>
    </div>
  )
}

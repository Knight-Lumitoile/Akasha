import React, { StrictMode } from 'react'
import Akasha from './app/Akasha'
import { createRoot } from 'react-dom/client'
import "./app/font/Font.css"

createRoot(document.getElementById('Akasha'))
    .render(
        <StrictMode>
            <Akasha />
        </StrictMode>
    )


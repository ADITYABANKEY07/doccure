
import React, { createContext, useState } from 'react'

export const CustomCursor = createContext()

const CursorContext = ({ children }) => {
    let [cursor, setCursor] = useState({active: false})
  return (
    <div>
    <CustomCursor.Provider value={[cursor, setCursor]}>
        {children}
    </CustomCursor.Provider>
    </div>
  )
}

export default CursorContext
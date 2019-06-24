import React from 'react'

export default React.createContext({
  notes: [],
  folders: [],
  // hasError: () => {},
  addFolder: () => {},
  addNote: () => {},
  deleteNote: () => {},
})

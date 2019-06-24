import React, { Component } from 'react'
import NotefulForm from '../NotefulForm/NotefulForm'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddNote.css'
import ErrorBoundary from '../ErrorBoundaries/ErrorBoundary';

export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.noteName = React.createRef();
    this.noteContent = React.createRef();
    this.noteFolderID = React.createRef();
  }

  static contextType = ApiContext;

  handleSubmit = e => {
    e.preventDefault()
    const newNote = {
      name: this.noteName.current.value,
      content: this.noteContent.current.value,
      folderId: this.noteFolderID.current.value,
    }
    fetch(`${config.API_ENDPOINT}/notes`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newNote),
    })
      .then(res => {
        if (!res.ok)
          throw new Error('Something went wrong')
        return res.json()
      })
      .then(note => {
        this.context.addNote(note)
        this.props.history.push(`/folder/${note.folderId}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    const { folders=[] } = this.context
    return (
      <section className='NoteAddition'>
        <ErrorBoundary>
          <h2>Create a note</h2>
          <form onSubmit={this.handleSubmit}>
            <div className='field'>
              <label htmlFor='note-name-input'>
                Name
              </label>
              <input type='text' id='note-name-input' ref={this.noteName} />
            </div>
            <div className='field'>
              <label htmlFor='note-content-input'>
                Content
              </label>
              <textarea id='note-content-input' ref={this.noteContent} />
            </div>
            <div className='field'>
              <label htmlFor='note-folder-select'>
                Folder
              </label>
              <select id='note-folder-select' ref={this.noteFolderID}>
                <option value={null}>... </option>
                {folders.map(folder =>
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                )}
              </select>
            </div>
            <div className='buttons'>
              <button type='submit'>
                Add note
              </button>
            </div>
          </form>
        </ErrorBoundary>
      </section>
    )
  }
}

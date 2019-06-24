import React, { Component } from 'react'
import ApiContext from '../ApiContext'
import config from '../config'
import './AddFolder.css'
import ErrorBoundary from '../ErrorBoundaries/ErrorBoundary';

export default class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.folderName = React.createRef();
  }
  
  static contextType = ApiContext;

  handleSubmit = e => {
    e.preventDefault()
    const folder = {
      name: this.folderName.current.value
    }
    fetch(`${config.API_ENDPOINT}/folders`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(folder),
    })
      .then(res => {
        if (!res.ok)
          throw new Error('Something went wrong');
        return res.json()
      })
      .then(folder => {
        this.context.addFolder(folder)
        this.props.history.push(`/folder/${folder.id}`)
      })
      .catch(error => {
        console.error({ error })
      })
  }

  render() {
    return (
      <section className='FolderAddition'>
        <ErrorBoundary>
          <h2>Create a folder</h2>
            <form onSubmit={this.handleSubmit}>
              <div className='field'>
                <label htmlFor='folder-name-input'>
                  Name
                </label>
                <input type='text' id='folder-name-input' ref={this.folderName} />
              </div>
              <div className='buttons'>
                <button type='submit'>
                  Add folder
                </button>
              </div>
            </form>
        </ErrorBoundary>
      </section>
    )
  }
}

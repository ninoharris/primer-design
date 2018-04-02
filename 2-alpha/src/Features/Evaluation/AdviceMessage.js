import React from 'react'
import { SUCCESS, ERROR, INFO } from '../../selectors/evaluator-messages'

const Message = (msg, i) => {
  const { ID, title, additional, url } = msg
  const className = 'evaluation-item ' + (msg.type === SUCCESS ? 'success' : 'info')
  return (
    <li
      className={className}
      key={ID}
    // onMouseEnter={() => this.doActions(details.actions)}
    // onMouseLeave={() => this.doActions(details.actions)}
    // style={{ transitionDelay: `${100 * (5-i)}ms`}}
    >
      <div className="d-flex">
        <h6>{title}</h6><br />
        {url ? <a target="_blank" className="btn btn-outline-light btn-sm mt-2" href={`/tutorials${url}`}>See related tutorial </a> : ''}
      </div>
      {additional ? <p className="additional">{additional}</p> : ''}
    </li>
  )
}

export default Message
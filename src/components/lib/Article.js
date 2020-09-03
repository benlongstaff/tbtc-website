import React, { useEffect } from 'react'
import classNames from 'classnames'
import Prism from 'prismjs'

const Article = ({ title, date, body, className }) => {
  useEffect(() => {
    Prism.highlightAll() // Enable syntax highlighting for code blocks
  })

  return (
    <div
      className={classNames('article', className)}
    >
      <div className="container">
        <div className="row justify-content-center no-gutters">
          <div className="col-sm-12 col-md-12 col-lg-10">
            <header>
              <h1>{title}</h1>
            </header>
            <div className="content">
              <div className="date"><span>{date}</span></div>
              <div className="body" dangerouslySetInnerHTML={{ __html: body }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Article


import { Editor } from 'slate-react'
import { Block, State } from 'slate'

import React from 'react'
import initialState from './state.json'

/**
 * The Forced Layout example.
 *
 * @type {Component}
 */

class ForcedLayout extends React.Component {

  /**
   * Deserialize the initial editor state.
   *
   * @type {Object}
   */

  state = {
    state: State.fromJSON(initialState),
    schema: {
      nodes: {
        title: props => <h2 {...props.attrs}>{props.children}</h2>,
        paragraph: props => <p {...props.attrs}>{props.children}</p>,
      },
      rules: [
        /* Rule that always makes the first block a title, normalizes by inserting one if no children, or setting the top to be a title */

        {
          match: (object) => {
            return object.kind == 'document'
          },
          validate: (document) => {
            return !document.nodes.size || document.nodes.first().type != 'title' ? document.nodes : null
          },
          normalize: (change, document, nodes) => {
            if (!nodes.size) {
              const title = Block.create({ type: 'title', data: {}})
              change.insertNodeByKey(document.key, 0, title)
              return
            }

            change.setNodeByKey(nodes.first().key, 'title')
          }
        },

        /* Rule that only allows for one title, normalizes by making titles paragraphs */

        {
          match: (object) => {
            return object.kind == 'document'
          },
          validate: (document) => {
            const invalidChildren = document.nodes.filter((child, index) => child.type == 'title' && index != 0)
            return invalidChildren.size ? invalidChildren : null
          },
          normalize: (change, document, invalidChildren) => {
            invalidChildren.forEach((child) => {
              change.setNodeByKey(child.key, 'paragraph')
            })
          }
        },

        /* Rule that forces at least one paragraph, normalizes by inserting an empty paragraph */

        {
          match: (object) => {
            return object.kind == 'document'
          },
          validate: (document) => {
            return document.nodes.size < 2 ? true : null
          },
          normalize: (change, document) => {
            const paragraph = Block.create({ type: 'paragraph', data: {}})
            change.insertNodeByKey(document.key, 1, paragraph)
          }
        }
      ]
    }
  }

  /**
   * On change.
   *
   * @param {Change} change
   */

  onChange = ({ state }) => {
    this.setState({ state })
  }

  /**
   * Render the editor.
   *
   * @return {Component} component
   */

  render() {
    return (
      <Editor
        placeholder="Enter a title..."
        state={this.state.state}
        schema={this.state.schema}
        onChange={this.onChange}
      />
    )
  }

}

/**
 * Export.
 */

export default ForcedLayout

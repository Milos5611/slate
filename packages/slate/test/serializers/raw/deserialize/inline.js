/** @jsx h */

import h from '../../../helpers/h'

export const input = {
  kind: 'state',
  document: {
    kind: 'document',
    data: {},
    nodes: [
      {
        kind: 'block',
        type: 'paragraph',
        isVoid: false,
        data: {},
        nodes: [
          {
            kind: 'text',
            leaves: [
              {
                kind: 'leaf',
                text: '',
                marks: [],
              }
            ]
          },
          {
            kind: 'inline',
            type: 'link',
            isVoid: false,
            data: {},
            nodes: [
              {
                kind: 'text',
                leaves: [
                  {
                    kind: 'leaf',
                    text: 'one',
                    marks: [],
                  }
                ]
              }
            ]
          },
          {
            kind: 'text',
            leaves: [
              {
                kind: 'leaf',
                text: '',
                marks: [],
              }
            ]
          },
        ]
      }
    ]
  }
}

export const output = (
  <state>
    <document>
      <paragraph>
        <link>
          one
        </link>
      </paragraph>
    </document>
  </state>
)

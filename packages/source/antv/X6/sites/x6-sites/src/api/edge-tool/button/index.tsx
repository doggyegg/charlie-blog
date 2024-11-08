import React from 'react'
import { Graph, EdgeView } from '@antv/x6'
import './index.less'

export default class Example extends React.Component {
  private container: HTMLDivElement

  componentDidMount() {
    const graph = new Graph({
      container: this.container,
      background: {
        color: '#F2F7FA',
      },
    })

    graph.addEdge({
      source: { x: 40, y: 40 },
      target: { x: 380, y: 40 },
      vertices: [
        { x: 40, y: 80 },
        { x: 200, y: 80 },
        { x: 200, y: 40 },
      ],
      attrs: {
        line: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          targetMarker: 'classic',
        },
      },
      tools: [
        {
          name: 'button',
          args: {
            markup: [
              {
                tagName: 'circle',
                selector: 'button',
                attrs: {
                  r: 18,
                  stroke: '#fe854f',
                  strokeWidth: 2,
                  fill: 'white',
                  cursor: 'pointer',
                },
              },
              {
                tagName: 'text',
                textContent: 'Btn B',
                selector: 'icon',
                attrs: {
                  fill: '#fe854f',
                  fontSize: 10,
                  textAnchor: 'middle',
                  pointerEvents: 'none',
                  y: '0.3em',
                },
              },
            ],
            distance: -40,
            onClick({ view }: { view: EdgeView }) {
              const edge = view.cell
              const source = edge.getSource()
              const target = edge.getTarget()
              edge.setSource(target)
              edge.setTarget(source)
            },
          },
        },
      ],
    })

    graph.addEdge({
      source: { x: 40, y: 160 },
      target: { x: 380, y: 160 },
      vertices: [
        { x: 40, y: 200 },
        { x: 200, y: 200 },
        { x: 200, y: 160 },
      ],
      attrs: {
        line: {
          stroke: '#8f8f8f',
          strokeWidth: 1,
          targetMarker: 'classic',
        },
      },
      connector: 'smooth',
      tools: {
        name: 'button',
        args: {
          markup: [
            {
              tagName: 'circle',
              selector: 'button',
              attrs: {
                r: 18,
                stroke: '#fe854f',
                strokeWidth: 2,
                fill: 'white',
                cursor: 'pointer',
              },
            },
            {
              tagName: 'text',
              textContent: 'Btn A',
              selector: 'icon',
              attrs: {
                fill: '#fe854f',
                fontSize: 10,
                textAnchor: 'middle',
                pointerEvents: 'none',
                y: '0.3em',
              },
            },
          ],
          distance: -100,
          offset: { x: 0, y: 0 },
          onClick({ view }: { view: EdgeView }) {
            const edge = view.cell
            const offset = parseInt(
              edge.attr('line/strokeDashoffset') || '0',
              10,
            )
            edge.attr({
              line: {
                strokeDasharray: '5, 10',
                strokeDashoffset: offset + 20,
              },
            })
          },
        },
      },
    })

    graph.centerContent()
  }

  refContainer = (container: HTMLDivElement) => {
    this.container = container
  }

  render() {
    return (
      <div className="edge-tool-button-app ">
        <div className="app-content" ref={this.refContainer} />
      </div>
    )
  }
}

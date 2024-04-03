"use client"

import React from 'react'
import { useState, useEffect } from 'react';
import { useDraw } from '@/hooks/useDraw';
import { ChromePicker } from 'react-color'

import { io } from 'socket.io-client'
import { drawLine } from '@/utils/drawLine'

const socket = io('http://localhost:3001')

interface MyComponent {

  hostIdentity: string;
  viewerIdentity: string;

}

type DrawLineProps = {
  prevPoint: Point | null
  currentPoint: Point
  color: string
}


export const Whiteboard = ({
  hostIdentity,
  viewerIdentity,
}: MyComponent) => {

  const hostAsViewer = `host-${hostIdentity}`;

  const isHost = viewerIdentity === hostAsViewer;


  const [color, setColor] = useState<string>('#000')
  const { canvasRef, onMouseDown, clear } = useDraw(createLine)

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d')

    socket.emit('client-ready')

    socket.on('get-canvas-state', () => {
      if (!canvasRef.current?.toDataURL()) return
      console.log('sending canvas state')
      socket.emit('canvas-state', canvasRef.current.toDataURL())

    })



    socket.on('canvas-state-from-server', (state: string) => {
      console.log('I received the state')
      const img = new Image()
      img.src = state
      img.onload = () => {
        ctx?.drawImage(img, 0, 0)
      }
    })

    socket.on('draw-line', ({ prevPoint, currentPoint, color }: DrawLineProps) => {
      if (!ctx) return console.log('no ctx here')
      drawLine({ prevPoint, currentPoint, ctx, color })
    })

    socket.on('clear', clear)

    return () => {
      socket.off('draw-line')
      socket.off('get-canvas-state')
      socket.off('canvas-state-from-server')
      socket.off('clear')
    }
  }, [canvasRef])

  function createLine({ prevPoint, currentPoint, ctx }: Draw) {
    socket.emit('draw-line', { prevPoint, currentPoint, color })
    drawLine({ prevPoint, currentPoint, ctx, color })
  }

  if (!isHost) {
    return (
      <div>
        <canvas
          ref={canvasRef}
          height={280}
          width={800}
          className='round-md border ml-2'
        />
      </div>
    )
  }

  return (

    <div className='flex'>
      <div>
        <ChromePicker className='ml-1' color={color} onChange={(e) => setColor(e.hex)} />
        <button type='button' className='mt-1 ml-1 p-2 rounded-md border ' onClick={() => socket.emit('clear')}>
          Clear
        </button>
      </div>
      <canvas
        onMouseDown={onMouseDown}
        ref={canvasRef}
        height={280}
        width={800}
        className='round-md border ml-2'
      />
    </div>

  )
}


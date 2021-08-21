import React, {useEffect, useRef} from "react";

const getPixelRatio = context => {
    let backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    context.backingStorePixelRatio ||
    1;

    return (window.devicePixelRatio || 1) / backingStore;
};



export default function TicTacToe() {

    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    function getDims() {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        let ratio = getPixelRatio(context);
        let width = getComputedStyle(canvas)
            .getPropertyValue('width')
            .slice(0, -2);
        let height = getComputedStyle(canvas)
            .getPropertyValue('height')
            .slice(0, -2);
        return {ratio, width, height}
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        contextRef.current = context;

        const {ratio, width, height} = getDims();

        canvas.width = width * ratio;
        canvas.height = height * ratio;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        context.fillStyle = '#c8c8c8'
        context.fillRect(0, 0, width, height)

        drawLine(width/3, 0, width/3, height);
        drawLine(2*width/3, 0, 2*width/3, height);
        drawLine(0, height/3, width, height/3);
        drawLine(0, 2*height/3, width, 2*height/3);

    })

    function drawLine(x1, y1, x2, y2) {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
    }

    function drawX(row, col) {
        const {width, height} = getDims();
        const cellWidth = width/3;
        const cellHeight = height/3;
        drawLine(row*cellWidth, col*cellHeight, (row+1)*cellWidth, (col+1)*cellHeight)
        drawLine(row*cellWidth, (col+1)*cellHeight, (row+1)*cellWidth, col*cellHeight)
    }

    function placePiece(event) {
        const {x, y} = getMousePos(event);
        const {width, height} = getDims();

        const row = Math.floor(x/width*3);
        const col = Math.floor(y/height*3);
        console.log(row, col)
        drawX(row, col)
    }

    function getMousePos(evt) {
        const canvas = canvasRef.current;
        let rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }

    return <div>
        <h2>TicTacToe</h2>
        <canvas
            ref={canvasRef}
            style={{ width: '300px', height: '300px' }}
            // onMouseDown={placePiece}>
            // onMouseUp={placePiece}>
            onClick={placePiece}
        >
        </canvas>
    </div>
}
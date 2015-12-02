/* INFO **
** INFO */

/* Get or set globals */
var g = g || {};

/*----------------------------------------------------------------------------*/
(function ()
{
    'use strict';

    /* Temporary variables */
    var unit = 1/1.4;

    /* Constants based on: https://en.wikipedia.org/wiki/Go_equipment#Board */
    var SMALL          = 9,
        MEDIUM         = 13,
        HISTORIC       = 17,
        NORMAL         = 19,
        BOARD_WIDTH    = unit*1.4,
        BOARD_HEIGHT   = unit*1.5,
        GRID_WIDTH     = unit*0.0726,
        GRID_HEIGHT    = unit*0.0782,
        LINE_THICKNESS = unit*0.003,
        DOT_DIAMETER   = unit*0.012,
        STONE_DIAMETER = unit*0.075;


    /*------------------------------------------------------------------------*/
    function Goban(canvas,
                   size,
                   grid)
    {
        canvas.width  = size*BOARD_WIDTH;
        canvas.height = size*BOARD_HEIGHT;
        this._canvas  = canvas;
        this._context = canvas.getContext('2d');

        switch (grid)
        {
            case SMALL:
            case MEDIUM:
            case HISTORIC:
            case NORMAL:
                this._grid = grid;
                break;

            default:
                this._grid = NORMAL;
                break;
        }
    }


    /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    Goban.prototype.draw = function ()
    {
        var width        = this._canvas.width,
            height       = this._canvas.height,
            gridStepX    = width*GRID_WIDTH,
            gridStepY    = width*GRID_HEIGHT,
            gridWidth    = (this._grid - 1)*gridStepX,
            gridHeight   = (this._grid - 1)*gridStepY,
            gridPaddingX = (width - gridWidth)/2,
            gridPaddingY = (height - gridHeight)/2,
            context      = this._context;

        /* Draw background */
        context.fillStyle = '#FFC129';
        context.fillRect(0, 0, width, height);

        /* Draw grid */
        context.font         = '10px Source Sans Pro';
        context.fillStyle    =
        context.strokeStyle  = '#000000';
        context.textAlign    = 'center';
        context.textBaseline = 'middle';
        context.lineWidth    = width*LINE_THICKNESS;
        context.beginPath();
        var i,
            x,
            y,
            num,
            char,
            shift=10,
            ascii='A'.charCodeAt() - 1;

        for (i=1, x=gridPaddingX, y=gridPaddingY;
             x<width;
             i++, x+=gridStepX, y+=gridStepY)
        {
            context.moveTo(x, gridPaddingY);
            context.lineTo(x, gridHeight + gridPaddingY);
            context.moveTo(gridPaddingX, y);
            context.lineTo(gridWidth + gridPaddingX, y);

            num  = i.toString();
            char = String.fromCharCode(ascii + i);
            context.fillText(num, x, gridPaddingY - shift);
            context.fillText(num, x, gridHeight + gridPaddingY + shift);
            context.fillText(char, gridPaddingX - shift, y);
            context.fillText(char, gridWidth + gridPaddingX + shift, y);
        }
        context.closePath();

        /* Render board on the screen */
        context.fill();
        context.stroke();
    };



    /*------------------------------------------------------------------------*/
    /* Export objects and values */
    g.goban =
    {
        Goban    : Goban,
        SMALL    : SMALL,
        MEDIUM   : MEDIUM,
        HISTORIC : HISTORIC,
        NORMAL   : NORMAL,
    }
})();

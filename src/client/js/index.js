/* INFO **
** INFO */

/* Get or set globals */
var g = g || {};

/*----------------------------------------------------------------------------*/
function main()
{
    'use strict';

    /* Import guards */
    if (!g.goban)
        throw "Module 'goban' is missing";

    var canvas = document.getElementsByTagName('canvas')[0],
        goban  = new g.goban.Goban(canvas, 640, g.goban.NORMAL);

    goban.draw();
}

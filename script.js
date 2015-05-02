function main()
{
    var CANVAS = document.getElementById("your_canvas");

    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;

    var GL = new GLUtils(CANVAS, {antialias: true});
    GL.load('2d-vertex-shader', '2d-fragment-shader');
    GL.setProjection(-1, 1, -1, 1);
    GL.gl.viewport(0.0, 0.0, CANVAS.width, CANVAS.height);

    /*========================= THE TRIANGLE ========================= */

    var triangleVertex = [
        -1, -1, //first summit -> bottom left of the viewport
        1, -1, //bottom right of the viewport
        1, 1  //top right of the viewport
    ];

    var triangleVertexBuffer = GL.createBuffer(triangleVertex);

    var triangleVertex2 = [
        0.5, 1, //first summit -> bottom left of the viewport
        1, 0, //bottom right of the viewport
        0, 0  //top right of the viewport
    ];

    var triangleVertexBuffer2 = GL.createBuffer(triangleVertex2);

    /*========================= DRAWING ========================= */

    GL.gl.clearColor(0.0, 0.0, 0.0, 0.0); // rgba

    var animate = function ()
    {
        GL.gl.clear(GL.gl.COLOR_BUFFER_BIT);

        //---------------------

        GL.move(0, 0, 0, 1, 1);

        GL.gl.bindBuffer(GL.gl.ARRAY_BUFFER, triangleVertexBuffer);
        GL.gl.uniform4f(GL.colorHandler, 1, 0, 0, 1);
        GL.gl.vertexAttribPointer(GL.positionHandler, 2, GL.gl.FLOAT, false, 0, 0);
        GL.gl.drawArrays(GL.gl.TRIANGLES, 0, 3);

        //---------------------

        GL.move(0, 0, 0, 1, 1);

        GL.gl.bindBuffer(GL.gl.ARRAY_BUFFER, triangleVertexBuffer2);
        GL.gl.uniform4f(GL.colorHandler, 0, 1, 0, 1);
        GL.gl.vertexAttribPointer(GL.positionHandler, 2, GL.gl.FLOAT, false, 0, 0);
        GL.gl.drawArrays(GL.gl.TRIANGLES, 0, 3);

        //---------------------

        GL.gl.flush();

        window.requestAnimationFrame(animate);
    };

    animate();
}

    function GLUtils(canvas, options)
    {
        this.gl = GLUtils.getGL(canvas, options);
        this.positionHandler = null;
        this.colorHandler    = null;
        this.matrixLocation  = null;

        this.canvasWidth  = canvas.width;
        this.canvasHeight = canvas.height;

        this.projectionMatrix = null;

        this.load = function(vertexShader, fragmentShader)
        {
            var shaderVertex   = GLUtils.getShader(this.gl, vertexShader, this.gl.VERTEX_SHADER);
            var shaderFragment = GLUtils.getShader(this.gl, fragmentShader, this.gl.FRAGMENT_SHADER);

            var program = this.gl.createProgram();
            this.gl.attachShader(program, shaderVertex);
            this.gl.attachShader(program, shaderFragment);

            this.gl.linkProgram(program);

            this.colorHandler    = this.gl.getUniformLocation(program, "u_color");
            this.positionHandler = this.gl.getAttribLocation(program, "a_position");
            this.matrixLocation  = this.gl.getUniformLocation(program, "u_matrix");

            this.gl.enableVertexAttribArray(this.colorHandler);
            this.gl.enableVertexAttribArray(this.positionHandler);

            this.gl.useProgram(program);
        };

        this.setProjection = function(left, right, bottom, top)
        {
            var width  = right - left;
            var height = top   - bottom;

            var projection = [
                (2 / width), 0, 0,
                0, (2 / height), 0,
                -1, -1, 0
            ];

            var translationMatrix = makeTranslation(-left, -bottom);

            this.projectionMatrix = matrixMultiply(translationMatrix, projection);
        };

        this.createBuffer = function(vertices)
        {
            var buffer = this.gl.createBuffer();
            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer);
            this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(vertices), this.gl.STATIC_DRAW);

            return buffer;
        };

        this.move = function(x, y, angle, scaleX, scaleY)
        {
            var translationMatrix = makeTranslation(x, y);
            var rotationMatrix = makeRotation(angle);
            var scaleMatrix = makeScale(scaleX, scaleY);

            var matrix = matrixMultiply(scaleMatrix, rotationMatrix);
            matrix = matrixMultiply(matrix, translationMatrix);
            matrix = matrixMultiply(matrix, this.projectionMatrix);

            this.gl.uniformMatrix3fv(this.matrixLocation, false, matrix);
        }
    }

    GLUtils.getShader = function(GL, name, type)
    {
        var shader = GL.createShader(type);
        GL.shaderSource(shader, document.getElementById(name).innerText);
        GL.compileShader(shader);

        if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS))
        {
            alert("ERROR IN " + type + " SHADER : " + GL.getShaderInfoLog(shader));
            return false;
        }

        return shader;
    };

    GLUtils.getGL = function(canvas, options)
    {
        try
        {
            var names = ["webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
            var context = null;

            for (var i = 0; i < names.length; ++i)
            {
                try
                {
                    context = canvas.getContext(names[i], options);
                }
                catch(e)
                {
                }

                if (context)
                {
                    break;
                }
            }

            return context;
        }
        catch (e)
        {
            return false;
        }
    };

    function makeTranslation(tx, ty) {
        return [
            1, 0, 0,
            0, 1, 0,
            tx, ty, 1
        ];
    }

    function makeRotation(angleInRadians) {
        var c = Math.cos(angleInRadians);
        var s = Math.sin(angleInRadians);

        return [
            c,-s, 0,
            s, c, 0,
            0, 0, 1
        ];
    }

    function makeScale(sx, sy) {
        return [
            sx, 0, 0,
            0, sy, 0,
            0, 0, 1
        ];
    }

    function matrixMultiply(a, b) {
        var a00 = a[0*3+0];
        var a01 = a[0*3+1];
        var a02 = a[0*3+2];
        var a10 = a[1*3+0];
        var a11 = a[1*3+1];
        var a12 = a[1*3+2];
        var a20 = a[2*3+0];
        var a21 = a[2*3+1];
        var a22 = a[2*3+2];
        var b00 = b[0*3+0];
        var b01 = b[0*3+1];
        var b02 = b[0*3+2];
        var b10 = b[1*3+0];
        var b11 = b[1*3+1];
        var b12 = b[1*3+2];
        var b20 = b[2*3+0];
        var b21 = b[2*3+1];
        var b22 = b[2*3+2];

        return [a00 * b00 + a01 * b10 + a02 * b20,
                a00 * b01 + a01 * b11 + a02 * b21,
                a00 * b02 + a01 * b12 + a02 * b22,
                a10 * b00 + a11 * b10 + a12 * b20,
                a10 * b01 + a11 * b11 + a12 * b21,
                a10 * b02 + a11 * b12 + a12 * b22,
                a20 * b00 + a21 * b10 + a22 * b20,
                a20 * b01 + a21 * b11 + a22 * b21,
                a20 * b02 + a21 * b12 + a22 * b22];
    }

    function PolygonShape(vertices, color)
    {
        var graphics = new createjs.Graphics();
        graphics.beginFill(color);

        for (var i = 0; i < vertices.length; i++)
        {
            if (i == 0)
            {
                graphics.moveTo(vertices[i].x, vertices[i].y);
            }
            else
            {
                graphics.lineTo(vertices[i].x, vertices[i].y)
            }
        }

        graphics.closePath();

        this.data = new createjs.Shape(graphics);

        this.update = function(body)
        {
            this.data.x = body.GetPosition().x * SCALE;
            this.data.y = body.GetPosition().y * SCALE;
            this.data.rotation = body.GetAngle() * (180 / Math.PI);
        }
    }
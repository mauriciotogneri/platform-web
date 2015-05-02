
    function RectangleShape(width, height, color)
    {
        var graphics = new createjs.Graphics();
        graphics.beginFill(color);
        graphics.drawRect(-(width / 2), -(height / 2), width, height, color);

        this.data = new createjs.Shape(graphics);

        this.update = function(body)
        {
            this.data.x = body.GetPosition().x * SCALE;
            this.data.y = body.GetPosition().y * SCALE;
            this.data.rotation = body.GetAngle() * (180 / Math.PI);
        }
    }
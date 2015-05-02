
    function CircleShape(radius, color)
    {
        var graphics = new createjs.Graphics();
        graphics.beginFill(color);
        graphics.drawCircle(0, 0, radius);

        this.data = new createjs.Shape(graphics);

        this.update = function(body)
        {
            this.data.x = body.GetPosition().x * SCALE;
            this.data.y = body.GetPosition().y * SCALE;
            this.data.rotation = body.GetAngle() * (180 / Math.PI);
        }
    }

    function PolygonObject(x, y, vertices, color, dynamic)
    {
        this.shape = new PolygonShape(vertices, color);
        this.body  = new PolygonBody(x, y, vertices, dynamic);

        this.getView = function()
        {
            return this.shape.data;
        }

        this.update = function()
        {
            this.shape.update(this.body.data);
        }
    }
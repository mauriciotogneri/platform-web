
    function RectangleObject(x, y, width, height, color, dynamic)
    {
        this.shape = new RectangleShape(width, height, color);
        this.body  = new RectangleBody(x, y, width, height, dynamic);

        this.getView = function()
        {
            return this.shape.data;
        }

        this.update = function()
        {
            this.shape.update(this.body.data);
        }
    }
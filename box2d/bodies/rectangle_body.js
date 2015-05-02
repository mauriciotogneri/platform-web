
    function RectangleBody(x, y, width, height, dynamic)
    {
        var fixDef = new box2d.b2FixtureDef();
        fixDef.density     = 1;
        fixDef.friction    = 0.5;
        fixDef.restitution = 0;
        fixDef.shape = new box2d.b2PolygonShape();
        fixDef.shape.SetAsBox((width / 2) / SCALE, (height / 2) / SCALE);

        var bodyDef  = new box2d.b2BodyDef();
        bodyDef.type = dynamic ? box2d.b2Body.b2_dynamicBody : box2d.b2Body.b2_staticBody;
        bodyDef.position.x = (x + (width / 2)) / SCALE;
        bodyDef.position.y = (y - (height / 2)) / SCALE;

        this.data = world.CreateBody(bodyDef);
        this.data.CreateFixture(fixDef);
    }
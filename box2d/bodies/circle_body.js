
    function CircleBody(x, y, radius, dynamic)
    {
        var fixDef = new box2d.b2FixtureDef();
        fixDef.density     = 1;
        fixDef.friction    = 0.5;
        fixDef.restitution = 0;
        fixDef.shape = new box2d.b2CircleShape(radius / SCALE);

        var bodyDef  = new box2d.b2BodyDef();
        bodyDef.type = dynamic ? box2d.b2Body.b2_dynamicBody : box2d.b2Body.b2_staticBody;
        bodyDef.position.x = x / SCALE;
        bodyDef.position.y = y / SCALE;

        this.data = world.CreateBody(bodyDef);
        this.data.CreateFixture(fixDef);

        /*var fixDef2 = new box2d.b2FixtureDef();
        fixDef2.density     = 1;
        fixDef2.friction    = 0.5;
        fixDef2.restitution = 0;
        fixDef2.shape = new box2d.b2PolygonShape();
        fixDef2.shape.SetAsBox(40 / SCALE, 20 / SCALE);

        this.data.CreateFixture(fixDef2);*/
    }

    function PolygonBody(x, y, vertices, dynamic)
    {
        var points = [];

        for (var i = 0; i < vertices.length; i++)
        {
            points[i] = new box2d.b2Vec2(vertices[i].x / SCALE, vertices[i].y / SCALE);
        }

        var fixDef = new box2d.b2FixtureDef();
        fixDef.density     = 1;
        fixDef.friction    = 0.5;
        fixDef.restitution = 0.5;
        fixDef.shape = new box2d.b2PolygonShape();
        fixDef.shape.SetAsArray(points, points.length);

        var bodyDef  = new box2d.b2BodyDef();
        bodyDef.type = dynamic ? box2d.b2Body.b2_dynamicBody : box2d.b2Body.b2_staticBody;
        bodyDef.position.x = x / SCALE;
        bodyDef.position.y = y / SCALE;

        this.data = world.CreateBody(bodyDef);
        this.data.CreateFixture(fixDef);
        //this.view.data.SetUserData(this);
    }
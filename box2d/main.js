
    var box2d =
    {
        b2Vec2: Box2D.Common.Math.b2Vec2,
        b2BodyDef: Box2D.Dynamics.b2BodyDef,
        b2Body: Box2D.Dynamics.b2Body,
        b2FixtureDef: Box2D.Dynamics.b2FixtureDef,
        b2Fixture: Box2D.Dynamics.b2Fixture,
        b2World: Box2D.Dynamics.b2World,
        b2MassData: Box2D.Collision.Shapes.b2MassData,
        b2PolygonShape: Box2D.Collision.Shapes.b2PolygonShape,
        b2CircleShape: Box2D.Collision.Shapes.b2CircleShape,
        b2DebugDraw: Box2D.Dynamics.b2DebugDraw,
        b2JointDef: Box2D.Dynamics.Joints.b2DistanceJointDef()
    }

    var SCALE = 30;
    var stage = null;
    var debug = null;
    var world = null;
    var ball  = null;
    var triangle  = null;
    var rectangle = null;
    var floor1 = null;
    var floor2 = null;

    var jointA1 = null;
    var jointA2 = null;

    var jointB1 = null;
    var jointB2 = null;

    function init()
    {
        stage = new createjs.Stage(document.getElementById('canvas'));
        debug = document.getElementById('debug');

        setUpPhysics();

        createjs.Ticker.addEventListener("tick", tick);
        createjs.Ticker.setFPS(60);
        createjs.Ticker.useRAF = true;

        ball = new BallObject(400, 0, 30, '#0000FF');
        stage.addChild(ball.getView());

        var vertices = [{x: -20, y: 0}, {x: 20, y: -20}, {x: 20, y: 20}];
        triangle = new PolygonObject(500, 0, vertices, '#FF0000', true);
        stage.addChild(triangle.getView());

        rectangle = new RectangleObject(100, 0, 100, 50, '#FF0000', true);
        stage.addChild(rectangle.getView());

        floor1 = new RectangleObject(0, 600, 1400, 50, '#00FF00', false);
        stage.addChild(floor1.getView());

        floor2 = new RectangleObject(100, 400, 200, 50, '#00FF00', false);
        stage.addChild(floor2.getView());

        jointA1 = new RectangleObject(300, 200, 100, 50, '#FF0000', true);
        stage.addChild(jointA1.getView());

        jointA2 = new RectangleObject(500, 200, 100, 50, '#FF0000', false);
        stage.addChild(jointA2.getView());

        jointB1 = new RectangleObject(800, 200, 100, 50, '#FF0000', true);
        stage.addChild(jointB1.getView());

        jointB2 = new RectangleObject(1000, 200, 100, 50, '#FF0000', false);
        stage.addChild(jointB2.getView());

        var bodyA1 = jointA1.body.data;
        var bodyA2 = jointA2.body.data;

        var jointA = new Box2D.Dynamics.Joints.b2DistanceJointDef();
        jointA.Initialize(bodyA1, bodyA2, bodyA1.GetWorldCenter(), bodyA2.GetWorldCenter());
        world.CreateJoint(jointA);

        var bodyB1 = jointB1.body.data;
        var bodyB2 = jointB2.body.data;

        var jointB = new Box2D.Dynamics.Joints.b2RevoluteJointDef();
        jointB.Initialize(bodyB1, bodyB2, bodyB2.GetPosition());
        jointB.enableMotor    = true;
        jointB.maxMotorTorque = 100;
        jointB.motorSpeed     = 100;
        world.CreateJoint(jointB);
    }

    function setUpPhysics()
    {
        var gravity = new box2d.b2Vec2(0, 50);
        world = new box2d.b2World(gravity, true);

        var listener = new Box2D.Dynamics.b2ContactListener;

        listener.BeginContact = function(contact)
        {
            //console.log("BEGIN");
            //console.log(contact.GetFixtureA().GetBody().GetUserData());
            //console.log(contact.GetFixtureB().GetBody().GetUserData());
        }
        listener.EndContact = function(contact)
        {
            //console.log("END: " + contact);
        }

        world.SetContactListener(listener);

        setupDebug();
    }

    function setupDebug()
    {
        var debugDraw = new box2d.b2DebugDraw();
        debugDraw.SetSprite(debug.getContext('2d'));
        debugDraw.SetDrawScale(SCALE);
        debugDraw.SetFillAlpha(0.5);
        debugDraw.SetFlags(box2d.b2DebugDraw.e_shapeBit | box2d.b2DebugDraw.e_jointBit);
        world.SetDebugDraw(debugDraw);
    }

    function tick()
    {
        ball.update();
        triangle.update();
        rectangle.update();
        floor1.update();
        floor2.update();

        jointA1.update();
        jointA2.update();

        jointB1.update();
        jointB2.update();

        jointA1.body.data.SetAngularVelocity(0.1 * (180 / Math.PI));

        jointB1.body.data.SetAngularVelocity(0.1 * (180 / Math.PI));

        stage.update();

        world.DrawDebugData();
        world.Step(1/60, 8, 3);
        world.ClearForces();
    }
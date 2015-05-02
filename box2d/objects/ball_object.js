
    function BallObject(x, y, radius, color)
    {
        this.jumpForce = radius * 3;
        this.falling   = false;
        this.onGround  = false;

        this.shape = new CircleShape(radius, color);
        this.body  = new CircleBody(x, y, radius, true);

        this.getView = function()
        {
            return this.shape.data;
        }

        this.update = function()
        {
            var velocity = this.body.data.GetLinearVelocity();
            var finalVelocity = velocity.x;

            if (Input.isPressing(Input.RIGHT) && (velocity.x < this.MAX_SPEED))
            {
                finalVelocity += velocity.x > 0 ? 0.45 : 0.6;
            }
            else if (Input.isPressing(Input.LEFT) && (velocity.x > -this.MAX_SPEED))
            {
                finalVelocity -= velocity.x < 0 ? 0.45 : 0.6;
            }
            else if (Math.abs(velocity.x) > 0.015)
            {
                if (velocity.y != 0)
                {
                    finalVelocity *= 0.95;
                }
                else
                {
                    finalVelocity *= 0.90;
                }
            }
            else
            {
                finalVelocity = 0;
            }

            if ((!this.onGround) && (this.falling))
            {
                this.onGround = (velocity.y == 0);
            }

            if (!this.falling)
            {
                this.falling = (velocity.y > 0);
            }
            else
            {
                this.falling = !this.onGround;
            }

            if (Input.isPressing(Input.UP) && (velocity.y == 0) && (this.onGround))
            {
                this.onGround = false;
                this.falling  = false;
                var impulse = new box2d.b2Vec2(0, -this.jumpForce);
                this.body.data.ApplyImpulse(impulse, this.body.data.GetPosition());
            }

            var newVelocity = new box2d.b2Vec2(finalVelocity, velocity.y);
            this.body.data.SetLinearVelocity(newVelocity);

            this.shape.update(this.body.data);
        }
    }

    BallObject.prototype.MAX_SPEED = 15;
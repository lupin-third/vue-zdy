<template>
<!--            <div class="animated flash">-->
<!--                <UltramanHeader></UltramanHeader>-->
<!--            </div>-->
    <body>
    <div style="height: 100%;width: 100%"  @click="onClick">
        <i id="bubbleradius" class="bubbleradius"></i>
        <span v-for="(c, index) in circles" :style="style(c)" :key="c.key" :class="{ popped: c.popped }" class="spanboll"></span>
    </div>
    </body>



</template>
<script>
    var globalID = null;

    const rotate = (x, y, sin, cos, reverse) => {
        return reverse ? {
            x: cos*x + sin*y,
            y: cos*y - sin*x
        } : {
            x: cos*x - sin*y,
            y: cos*y + sin*x
        }
    };

    const flatten = arr => arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

    import UltramanHeader from "../../components/head/UltramanHeader";
    export default {
        name:'meme',
        data(){
            return{
                circles: [],
                lastExec: null,
                hue: 250,
                lastCollisions: [],
                hiddenProperty: null,
                visibilityChangeEvent: null,
                moving: true,
            }
        },

        components:{
            UltramanHeader
        },
        methods: {
            style (c) {
                return `top:${c.y}px;left:${c.x}px;box-shadow:0 0 2rem hsl(${c.hue}, 75%, 50%) inset`
            },
            update (tm) {
                if (!this.moving) {
                    return
                }
                if(this.lastExec && this.circles.length) {
                    var diff = (tm - this.lastExec)
                    // var huediff = (this.hue + diff/30) % 360
                    var box = this.$el.getBoundingClientRect()
                    var radius = this.$el.querySelector('#bubbleradius').getBoundingClientRect().width

                    var couples = []
                    this.circles.filter(cc => !cc.popped).forEach(c1 => {
                        this.circles.filter(cc => !cc.popped).forEach(c2 => {
                            if (c1 !== c2) {
                                couples.push([c1, c2])
                            }
                        })
                    })

                    var collisions = couples.filter(couple => {
                        var dist = Math.sqrt(Math.pow(couple[0].y - couple[1].y, 2) +
                            Math.pow(couple[0].x - couple[1].x, 2))
                        return dist < radius * 2
                    })

                    var newcollisions = collisions.filter(couple => {
                        var key = couple[0].key + couple[1].key
                        return this.lastCollisions.indexOf(key) < 0
                    })

                    newcollisions.forEach(couple => {
                        var a = couple[0]
                        var b = couple[1]

                        if (a.collisionFree && b.collisionFree) {
                            if (false) {
                                a.new_vx = (a.vx * (a.mass - b.mass) + (2 * b.mass * b.vx)) / (a.mass + b.mass)
                                a.new_vy = (a.vy * (a.mass - b.mass) + (2 * b.mass * b.vy)) / (a.mass + b.mass)
                            } else {
                                var dx = b.x - a.x
                                var dy = b.y - a.y
                                var collisionAngle = Math.atan2(dy, dx)
                                var sin = Math.sin(collisionAngle)
                                var cos = Math.cos(collisionAngle)
                                var pos_a = {x: 0, y: 0}
                                var pos_b = rotate(dx, dy, sin, cos, true)
                                var vel_a = rotate(a.vx, a.vy, sin, cos, true)
                                var vel_b = rotate(b.vx, b.vy, sin, cos, true)
                                var vxTotal = vel_a.x - vel_b.x
                                vel_a.x = ((a.mass - b.mass) * vel_a.x + 2 * b.mass * vel_b.x) / (a.mass + b.mass)
                                vel_b.x = vxTotal + vel_a.x
                                pos_a.x += vel_a.x
                                pos_b.x += vel_b.x

                                var pos_a_final = rotate(pos_a.x, pos_a.y, sin, cos, false)
                                var vel_a_final = rotate(vel_a.x, vel_a.y, sin, cos, false)
                                a.new_x = a.x + pos_a_final.x
                                a.new_y = a.y + pos_a_final.y;
                                a.new_vx = vel_a_final.x;
                                a.new_vy = vel_a_final.y;

                                // each collision shows up in array twice: a->b and b->a
                                // var pos_b_final = rotate(pos_b.x, pos_b.y, sin, cos, false)
                                // var vel_b_final = rotate(vel_b.x, vel_b.y, sin, cos, false)
                                // b.x = a.x + pos_b_final.x
                                // b.y = a.y + pos_b_final.y
                                // b.new_vx = vel_b_final.x;
                                // b.new_vy = vel_b_final.y;
                            }
                        }
                    })

                    newcollisions.forEach(couple => {
                        var a = couple[0]
                        var b = couple[1]
                        if (a.new_vy) {
                            a.vx = a.new_vx
                            a.vy = a.new_vy
                            a.x = a.new_x
                            a.y = a.new_y
                            a.hue += 20
                        }
                    })

                    this.lastCollisions = collisions.map(couple => {
                        return couple[0].key + couple[1].key
                    })

                    var collided = [...new Set(flatten(newcollisions))]
                    var collidedKeys = collided.map(c => c.key)


                    this.circles.forEach(c => {
                        c.collisionFree = c.collisionFree || (collidedKeys.indexOf(c.key) < 0)
                        if (c.y < 0) {
                            c.vy = Math.abs(c.vy)
                        } else if (c.y > box.height) {
                            c.vy = -Math.abs(c.vy)
                        }
                        if (c.x < 0) {
                            c.vx = Math.abs(c.vx)
                        } else if (c.x > box.width) {
                            c.vx = -Math.abs(c.vx)
                        }

                        c.y += c.vy * diff
                        c.x += c.vx * diff
                    })
                }
                this.lastExec = tm
                globalID = requestAnimationFrame(this.update)
            },
            handleVisibilityChange () {
                if(!document[this.hiddenProperty]) {
                    globalID = requestAnimationFrame(this.update)
                    this.moving = true
                } else {
                    cancelAnimationFrame(globalID)
                    this.moving = false
                }
            },
            onClick (evt) {
                let m = {
                    x: evt.pageX,
                    y: evt.pageY
                }
                let nearest = null
                let nearest_distsq = Infinity
                let dx, dy, distsq
                var radius = this.$el.querySelector('#bubbleradius').getBoundingClientRect().width
                this.circles.forEach(c => {
                    dx = m.x - c.x
                    dy = m.y - c.y
                    distsq = dx*dx + dy*dy
                    if (distsq < nearest_distsq && distsq < c.radius*c.radius) {
                        nearest = c
                        nearest_distsq = distsq
                    }
                })
                if (nearest) {
                    // let idx = this.circles.indexOf(nearest)
                    // this.circles.splice(idx, 1)
                    nearest.popped = true
                }
            }
        },
        mounted () {
            var box = this.$el.getBoundingClientRect()
            var radius = this.$el.querySelector('#bubbleradius').getBoundingClientRect().width
            var max = (box.width * box.height) / 300 / Math.pow(radius, 1.2)
            for (var i = 0; i < max; i++) {

                this.circles.push({
                    key: Math.random(),
                    y: Math.random() * box.height,
                    x: Math.random() * box.width,
                    vx: Math.random() / 5,
                    vy: Math.random() / 5,
                    hue: Math.random() * 360,
                    collisionFree: false,
                    mass: 1,
                    radius: radius,
                    popped: false
                });
            }
            globalID = requestAnimationFrame(this.update)

            var hidden, visibilityChange;
            if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
                hidden = "hidden";
                visibilityChange = "visibilitychange";
            } else if (typeof document.msHidden !== "undefined") {
                hidden = "msHidden";
                visibilityChange = "msvisibilitychange";
            } else if (typeof document.webkitHidden !== "undefined") {
                hidden = "webkitHidden";
                visibilityChange = "webkitvisibilitychange";
            }
            this.hiddenProperty = hidden
            this.visibilityChangeEvent = visibilityChange
            document.addEventListener(this.visibilityChangeEvent, this.handleVisibilityChange, false)
        }

    }
</script>
<style>
    @import "../../assets/css/zdyForm.css";
    @import "../../assets/css/zdySpan.css";
    .lx02{
        animation: my_02 2.5s ease infinite;
        animation-duration: 2.5s;
        animation-timing-function: ease;
        animation-delay: 0s;
        animation-iteration-count: infinite;
        animation-direction: normal;
        animation-fill-mode: none;
        animation-play-state: running;
        animation-name: my_02;
        right: 10px;
        top: -45px;
        position: absolute;
    }

</style>
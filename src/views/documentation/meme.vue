<template>
    <body>
    <div class="bubblebg" @click="onClick">
        <i id="bubbleradius" class="bubbleradius"></i>
        <span v-for="(c, index) in circles" :style="style(c)" :key="c.key" :class="{ popped: c.popped }"
              class="spanboll"></span>
    </div>
    </body>


</template>
<script>
    var globalID = null;

    const rotate = (x, y, sin, cos, reverse) => {
        return reverse ? {
            x: cos * x + sin * y,
            y: cos * y - sin * x
        } : {
            x: cos * x - sin * y,
            y: cos * y + sin * x
        }
    };

    const flatten = arr => arr.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

    import UltramanHeader from "../../components/head/UltramanHeader";

    export default {
        name: 'meme',
        data() {
            return {
                circles: [],
                lastExec: null,
                hue: 250,
                lastCollisions: [],
                hiddenProperty: null,
                visibilityChangeEvent: null,
                moving: true,
            }
        },

        components: {
            UltramanHeader
        },
        methods: {
            style(c) {
                return `top:${c.y}px;left:${c.x}px;box-shadow:0 0 2rem hsl(${c.hue}, 75%, 50%) inset`
            },
            update(tm) {
                if (!this.moving) {
                    return
                }
                if (this.lastExec && this.circles.length) {
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
            handleVisibilityChange() {
                if (!document[this.hiddenProperty]) {
                    globalID = requestAnimationFrame(this.update)
                    this.moving = true
                } else {
                    cancelAnimationFrame(globalID)
                    this.moving = false
                }
            },
            onClick(evt) {
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
                    distsq = dx * dx + dy * dy
                    if (distsq < nearest_distsq && distsq < c.radius * c.radius) {
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
        mounted() {
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
            if (typeof document.hidden !== "undefined") {
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

    };
    // function createFnInvoker (fns) {
    //     debugger;
    //     function invoker () {
    //         var arguments$1 = arguments;
    //
    //         var fns = invoker.fns;
    //         if (Array.isArray(fns)) {
    //             var cloned = fns.slice();
    //             for (var i = 0; i < cloned.length; i++) {
    //                 cloned[i].apply(null, arguments$1);
    //             }
    //         } else {
    //             // return handler return value for single handlers
    //             return fns.apply(null, arguments)
    //         }
    //     }
    //     invoker.fns = fns;
    //     return invoker
    // };
    // function bind (fn, ctx) {
    //     function boundFn (a) {
    //         var l = arguments.length;
    //         return l
    //             ? l > 1
    //                 ? fn.apply(ctx, arguments)
    //                 : fn.call(ctx, a)
    //             : fn.call(ctx)
    //     }
    //     // record original fn length
    //     boundFn._length = fn.length;
    //     return boundFn
    // };
    // var nextTick = (function () {
    //     var callbacks = [];
    //     var pending = false;
    //     var timerFunc;
    //
    //     function nextTickHandler () {
    //         pending = false;
    //         var copies = callbacks.slice(0);
    //         callbacks.length = 0;
    //         for (var i = 0; i < copies.length; i++) {
    //             copies[i]();
    //         }
    //     }
    //
    //     // An asynchronous deferring mechanism.
    //     // In pre 2.4, we used to use microtasks (Promise/MutationObserver)
    //     // but microtasks actually has too high a priority and fires in between
    //     // supposedly sequential events (e.g. #4521, #6690) or even between
    //     // bubbling of the same event (#6566). Technically setImmediate should be
    //     // the ideal choice, but it's not available everywhere; and the only polyfill
    //     // that consistently queues the callback after all DOM events triggered in the
    //     // same loop is by using MessageChannel.
    //     /* istanbul ignore if */
    //     if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    //         timerFunc = function () {
    //             setImmediate(nextTickHandler);
    //         };
    //     } else if (typeof MessageChannel !== 'undefined' && (
    //         isNative(MessageChannel) ||
    //         // PhantomJS
    //         MessageChannel.toString() === '[object MessageChannelConstructor]'
    //     )) {
    //         var channel = new MessageChannel();
    //         var port = channel.port2;
    //         channel.port1.onmessage = nextTickHandler;
    //         timerFunc = function () {
    //             port.postMessage(1);
    //         };
    //     } else
    //         /* istanbul ignore next */
    //     if (typeof Promise !== 'undefined' && isNative(Promise)) {
    //         // use microtask in non-DOM environments, e.g. Weex
    //         var p = Promise.resolve();
    //         timerFunc = function () {
    //             p.then(nextTickHandler);
    //         };
    //     } else {
    //         // fallback to setTimeout
    //         timerFunc = function () {
    //             setTimeout(nextTickHandler, 0);
    //         };
    //     }
    //
    //     return function queueNextTick (cb, ctx) {
    //         var _resolve;
    //         callbacks.push(function () {
    //             if (cb) {
    //                 try {
    //                     cb.call(ctx);
    //                 } catch (e) {
    //                     handleError(e, ctx, 'nextTick');
    //                 }
    //             } else if (_resolve) {
    //                 _resolve(ctx);
    //             }
    //         });
    //         if (!pending) {
    //             pending = true;
    //             timerFunc();
    //         }
    //         // $flow-disable-line
    //         if (!cb && typeof Promise !== 'undefined') {
    //             return new Promise(function (resolve, reject) {
    //                 _resolve = resolve;
    //             })
    //         }
    //     }
    // })();
    // function isNative (Ctor) {
    //     return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
    // };
    // function flushSchedulerQueue () {
    //     flushing = true;
    //     var watcher, id;
    //
    //     // Sort queue before flush.
    //     // This ensures that:
    //     // 1. Components are updated from parent to child. (because parent is always
    //     //    created before the child)
    //     // 2. A component's user watchers are run before its render watcher (because
    //     //    user watchers are created before the render watcher)
    //     // 3. If a component is destroyed during a parent component's watcher run,
    //     //    its watchers can be skipped.
    //     queue.sort(function (a, b) { return a.id - b.id; });
    //
    //     // do not cache length because more watchers might be pushed
    //     // as we run existing watchers
    //     for (index = 0; index < queue.length; index++) {
    //         watcher = queue[index];
    //         id = watcher.id;
    //         has[id] = null;
    //         watcher.run();
    //         // in dev build, check and stop circular updates.
    //         if ("development" !== 'production' && has[id] != null) {
    //             circular[id] = (circular[id] || 0) + 1;
    //             if (circular[id] > MAX_UPDATE_COUNT) {
    //                 warn(
    //                     'You may have an infinite update loop ' + (
    //                         watcher.user
    //                             ? ("in watcher with expression \"" + (watcher.expression) + "\"")
    //                             : "in a component render function."
    //                     ),
    //                     watcher.vm
    //                 );
    //                 break
    //             }
    //         }
    //     }
    //
    //     // keep copies of post queues before resetting state
    //     var activatedQueue = activatedChildren.slice();
    //     var updatedQueue = queue.slice();
    //
    //     resetSchedulerState();
    //
    //     // call component updated and activated hooks
    //     callActivatedHooks(activatedQueue);
    //     callUpdatedHooks(updatedQueue);
    //
    //     // devtool hook
    //     /* istanbul ignore if */
    //     if (devtools && config.devtools) {
    //         devtools.emit('flush');
    //     }
    // }


</script>
<style>
    @import "../../assets/css/zdyForm.css";
    @import "../../assets/css/zdySpan.css";


</style>
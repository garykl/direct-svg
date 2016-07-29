// dependency: direct-svg/svg.js

var TransitionFunctions = {
    quickToEnd: function (start, end, num) {
        return function (i) {
            return (start - end) / Math.sqrt(i)  + end;
        };
    },
    sin: function (minimum, maximum, period) {
        return function (i) {
            return (maximum - minimum) * (Math.sin(
                i / period) + 1) * 0.5 + minimum;
        };
    }
};


var transition = function (update, kind, num, fin) {
    var i = 0;
    var thread = undefined;

    var loop = function () {
        i = i + 1;
        update(kind(i));

        if (num !== undefined) {
            if (i > num) {
                clearInterval(thread);
                fin();
            }
        }
    };
    thread = setInterval(loop, 20);
};



var svgTransition = function (svgelement, parameter, kind, num, fin) {
    transition(
        function (i) {
            var prop = {};
            prop[parameter] = i;
            SVG.update(svgelement, prop);
        },
        kind, num, fin);
};


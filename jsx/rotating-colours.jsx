function RotatingColours() {
    var rotatingColours = [
        [255,255,0],
        [0,255,255],
        [255,0,255],
    ];
    var subtractMap = function(arr) {
        return arr.map(function(item) {
            if(item > 0)
                return item - 25;
            else
                return item;
        });
    };

    var colours = [];
    for(var i=0; i!=6; ++i) {
        rotatingColours.forEach(function(rgb, index) {
            colours.push(rotatingColours[index] = subtractMap(rgb));
        });
        rotatingColours.forEach(function(rgb, index) {
            rgb.some(function(c, i) {
                if(c == 0)  return false;

                var newRgb = rgb.slice();
                newRgb[i] -= 25;
                colours.push(newRgb);
                return true;
            });
        });
    }

    return colours;
}

module.exports = RotatingColours();

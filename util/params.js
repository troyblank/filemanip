exports.getAnyExtraParams = function(flag) {
    switch (flag) {
    case '-r':
        return '-f segment -segment_time 30';
    default:
        return '';
    }
}

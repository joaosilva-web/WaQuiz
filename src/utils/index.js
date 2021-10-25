const formatTime = time => {
    if(time < 60) {
        return time < 10 ? `0${time}` : `${time}`;
    } else {
        return Math.floor(time / 60) + 'm' + (time % 60) + 's';
    }
}

export {
    formatTime
}
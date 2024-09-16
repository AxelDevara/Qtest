export const getLocation = () => {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            return (position.coords.latitude, position.coords.longitude);
        });

    } else {
        return false;
    }

}
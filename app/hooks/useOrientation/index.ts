import { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

export function useOrientation() {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    const [orientation, setOrientation] = useState(windowWidth < windowHeight ? "PORTRAIT" : "LANDSCAPE");

    useEffect(() => {
        const subscription = Dimensions.addEventListener('change', ({ window: { width, height } }) => {
            if (width < height) {
                setOrientation("PORTRAIT")
            } else {
                setOrientation("LANDSCAPE")
            }
        })

        return () => subscription.remove();
    }, []);

    return orientation;
}
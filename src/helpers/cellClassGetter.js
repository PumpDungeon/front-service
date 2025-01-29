export const cellClassGetter = (value) => {
    switch (value) {
        case 1:
            return 'cell path';
        case 2:
            return 'cell wall';
        case 3:
            return 'cell start';
        case 4:
            return 'cell end';
        default:
            return 'cell';
    }
};

export const labels = ['Four Weeks', 'Six Months', 'All Time'];

export const timeRanges = {
    SHORT: 'SHORT',
    MEDIUM: 'MEDIUM',
    LONG: 'LONG'
};

/* for improved debugging with higher order components - 
gets the name of the component that is being wrapped */
export function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

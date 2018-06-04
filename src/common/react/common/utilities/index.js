export const labels = ['Four Weeks', 'Six Months', 'All Time'];

export const timeRanges = {
    SHORT: 'SHORT',
    MEDIUM: 'MEDIUM',
    LONG: 'LONG'
};

export function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export function capitalizeFirstLetter(name) {
    if (!name) return '';
    return name.charAt(0).toUpperCase() + name.slice(1);
}
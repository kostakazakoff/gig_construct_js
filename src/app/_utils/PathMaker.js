export default function PathMaker(pathHref, translatedName) {
    console.log('PathMaker received:', pathHref, translatedName);
    
    // Split the translated navigation name by "/" to create path segments
    const pathSegments = translatedName ? translatedName.split('/').filter(segment => segment.trim() !== '') : [];
    
    return {
        path: pathSegments,
        href: pathHref
    };
}
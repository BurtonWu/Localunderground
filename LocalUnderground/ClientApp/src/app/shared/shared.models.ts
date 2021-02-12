export function AngularDeepCopy(object: any): any {
    return JSON.parse(JSON.stringify(object));
}

export function attachDataImagePrefix(base64String: string) {
    return base64String != null ? 'data:image/png;base64,' + base64String : null;
}
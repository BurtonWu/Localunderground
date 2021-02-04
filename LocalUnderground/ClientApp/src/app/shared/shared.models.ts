export function AngularDeepCopy(object: any): any {
    return JSON.parse(JSON.stringify(object));
}


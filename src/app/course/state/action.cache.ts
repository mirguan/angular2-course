let actionCache: { [label: string]: boolean } = {};

export function action<T>(label: T | ''): T {
    if (actionCache[<string>label]) {
        throw new Error(`Action type "${label}" is not unique"`);
    }

    actionCache[<string>label] = true;

    return <T>label;
}

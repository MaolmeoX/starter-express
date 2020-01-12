/**
 * Prend une fonction en paramètre
 * et l'execute dans une promise
 * @param fn
 */
export const asyncHandler = (fn) =>
    function asyncHandlerWrap(...args) {
        const fnReturn = fn(...args);
        const next = args[args.length - 1];
        return Promise.resolve(fnReturn).catch(next);
    };

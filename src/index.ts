import format from 'format-util';
import {Options, Settings} from "./types";

const defaults: Settings = {
    console,
    methods: ['log', 'debug', 'info', 'warn', 'error'],
    disabled: false,
}

export const muteConsole = (excludePatterns: Array<string | RegExp | ((output: string) => boolean)>, options?: Options) => {
    const { console: consoleObject, methods, disabled }: Settings = {
        ...defaults,
        ...options,
    };

    const originalMethods = methods.map((method) => consoleObject[method]);

    const check = (string: any) => {
        for (const pattern of excludePatterns) {
            if (typeof pattern === 'string') {
                if (string.includes(pattern)) {
                    return true;
                }
            } else if (typeof pattern === 'function') {
                if (pattern(string)) {
                    return true;
                }
            } else if (pattern.test(string)) {
                return true;
            }
        }

        return false;
    };

    const printStartMessage = () => {
        if (process.env && process.env.NODE_ENV !== 'test') {
            const c = consoleObject;
            c.groupCollapsed('[MC] Console muting enabled.');
            c.log('Muting methods:', JSON.stringify(methods));
            c.log('For message patterns:');
            excludePatterns.forEach((p) => {
                c.log(JSON.stringify(p));
            });
            c.groupEnd();
        }
    };

    const start = (condition = true) => {
        if (condition && !disabled) {
            printStartMessage();

            for (const method of methods) {
                const originalMethod = consoleObject[method];

                consoleObject[method] = (...args) => {
                    if (check(format(...args))) {
                        return;
                    }

                    originalMethod(...args);
                };
            }
        }
    };

    const stop = (): Console => {
        methods.forEach((method, index) => {
            consoleObject[method] = originalMethods[index];
        });

        return consoleObject;
    };

    return {
        start,
        stop,
    };
};
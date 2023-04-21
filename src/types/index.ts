
export type ConsoleMethods = 'log' | 'debug' | 'info' | 'warn' | 'error';

export type Console = Record<ConsoleMethods, (message?: any, ...optionalParameters: any[]) => void> & typeof console;

export type Options = {
    /**
     Console methods to filter.
     @default ['log', 'debug', 'info', 'warn', 'error']
     */
    methods?: ConsoleMethods[];

    /**
     Use a custom `console` object. Can be useful for testing or mocking.
     @default console
     */
    console?: Console;
};

export type Settings = Required<Options>;
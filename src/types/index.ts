
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

    /**
     Flag to be passed to disable muting.
     @default false
     */
    disabled?: boolean;

    /**
     Flag to configure printing of a start message with contextual information.
     @default false for NODE_ENV test, true for the rest
     */
    logStart?: boolean;
};

export type Settings = Required<Options>;
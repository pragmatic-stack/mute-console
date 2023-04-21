import {muteConsole} from "../index";


it('should not invoke console methods when muteConsole is started', () => {
    const logSpy = jest.spyOn(console, 'log')
    const errorSpy = jest.spyOn(console, 'error')
    const warnSpy = jest.spyOn(console, 'warn')
    const infoSpy = jest.spyOn(console, 'info')
    const debugSpy = jest.spyOn(console, 'debug')

    muteConsole(['Hi', (m) => m.includes('Message'), /Message/i]).start();

    console.log('Message');
    console.warn('Message');
    console.error('Message');
    console.info('Message');
    console.debug('Message');

    expect(logSpy).not.toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
    expect(warnSpy).not.toHaveBeenCalled();
    expect(infoSpy).not.toHaveBeenCalled();
    expect(debugSpy).not.toHaveBeenCalled();
})

it('should error to console when muteConsole is started', () => {
    const consoleSpy = jest.spyOn(console, 'error')

    muteConsole(['Hi'],  { methods: ['log']}).start();

    console.error('Hi');

    expect(consoleSpy).toHaveBeenCalled();
})

it('should mute methods by a function', () => {
    const consoleSpy = jest.spyOn(console, 'log')
    const muteFn = (m: string) => m.includes('Hi')

    muteConsole([muteFn],  { methods: ['log']}).start();

    console.log('Hi');

    expect(consoleSpy).not.toHaveBeenCalled();
})

it('should mute methods by regular expressions', () => {
    const consoleSpy = jest.spyOn(console, 'log')
    const muteExpression = /Hi/i

    muteConsole([muteExpression],  { methods: ['log']}).start();

    console.log('Hi');

    expect(consoleSpy).not.toHaveBeenCalled();
})

it('should log to console when muteConsole is stopped', () => {
    const consoleSpy = jest.spyOn(console, 'log')

    muteConsole(['Hi']).stop();

    console.log('Hi');

    expect(consoleSpy).toHaveBeenCalledWith('Hi');
})

it('should log to console when pattern is not matched', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(jest.fn)

    muteConsole(['Hi']).start();

    console.log('Hi')
    console.log('Hello');

    expect(consoleSpy).toHaveBeenCalledWith('Hello');
    consoleSpy.mockRestore();
})

it('should log start message if not in test environment', () => {
    process.env.NODE_ENV = 'development';
    const consoleGroupSpy = jest.spyOn(console, 'groupCollapsed').mockImplementation(jest.fn)
    const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(jest.fn)

    muteConsole(['Hi']).start();

    expect(consoleGroupSpy).toHaveBeenCalledWith('[MC] Console muting enabled.')
    consoleGroupSpy.mockRestore();
    consoleLogSpy.mockRestore();
})

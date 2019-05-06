export class PromiseBreak {
    private promise: Promise<any>;
    private hasError: boolean = false;

    constructor(promise: Promise<any>) {
        this.promise =  promise;
    }

    done(callback: ((reason: any) => any)): PromiseBreak {
        this.promise = this.promise.then(
            (result) => {
                if(!this.hasError) {
                    return callback(result);
                }                
            }
        );
        return this
    }

    fail(callback: ((reason: any) => any)): PromiseBreak {
        this.promise = this.promise.catch(
            (reason) => {
                this.hasError = true;
                return callback(reason);
            }
        );
        return this
    }

    always(callback: (() => void)): PromiseBreak {
        this.promise = this.promise.finally(
            () => { callback() }
        );
        return this
    }
}
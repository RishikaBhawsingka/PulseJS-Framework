export function createApp(router) {
    return {
        mount(selector) {
            const container = document.querySelector(selector);

            if (!container) {
                throw new Error(`Container ${selector} not found`);
            }

            router.start();

            return this;
        }
    };
}
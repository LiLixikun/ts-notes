///<reference path="components.ts"/>

namespace Home {
    export namespace Aotu {
        export const teacher: Components.user = {
            name: 'aotu'
        }
    }

    export class Page {
        constructor() {
            new Components.Header()
            new Components.Content()
            new Components.Footer()
        }
    }
}
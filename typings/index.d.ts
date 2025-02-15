// Create type definitions that allow HTML, CSS, and SCSS files to be imported without causing errors in the TypeScript compiler.

declare module "*.scss" {
    const style: any;
    export default style;
}

declare module "*.css" {
    const style: any;
    export default style;
}

declare module "*.html" {
    const template: any;
    export default template;
}

declare module "*.json" {
    const data: any;
    export default data;
}
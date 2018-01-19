/** Global definitions for developement **/

// for style loader
declare module '*.css' {
  const styles: any;
  export = styles;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare var __DEV__: string;

declare var __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;

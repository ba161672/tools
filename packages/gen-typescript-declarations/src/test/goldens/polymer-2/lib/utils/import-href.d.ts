/**
 * DO NOT EDIT
 *
 * This file was automatically generated by
 *   https://github.com/Polymer/tools/tree/master/packages/gen-typescript-declarations
 *
 * To modify these typings, edit the source file(s):
 *   lib/utils/import-href.html
 */

/// <reference path="boot.d.ts" />

declare namespace Polymer {


  /**
   * Convenience method for importing an HTML document imperatively.
   *
   * This method creates a new `<link rel="import">` element with
   * the provided URL and appends it to the document to start loading.
   * In the `onload` callback, the `import` property of the `link`
   * element will contain the imported document contents.
   *
   * @returns The link element for the URL to be loaded.
   */
  function importHref(href: string, onload?: ((p0: Event) => void)|null, onerror?: ((p0: ErrorEvent) => void)|null, optAsync?: boolean): HTMLLinkElement;
}

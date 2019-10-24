(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/translation_files/translation_parsers/translation_parser", ["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb25fcGFyc2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbG9jYWxpemUvc3JjL3Rvb2xzL3NyYy90cmFuc2xhdGUvdHJhbnNsYXRpb25fZmlsZXMvdHJhbnNsYXRpb25fcGFyc2Vycy90cmFuc2xhdGlvbl9wYXJzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7VHJhbnNsYXRpb25CdW5kbGV9IGZyb20gJy4uLy4uL3RyYW5zbGF0b3InO1xuXG4vKipcbiAqIEltcGxlbWVudCB0aGlzIGludGVyZmFjZSB0byBwcm92aWRlIGEgY2xhc3MgdGhhdCBjYW4gcGFyc2UgdGhlIGNvbnRlbnRzIG9mIGEgdHJhbnNsYXRpb24gZmlsZS5cbiAqL1xuZXhwb3J0IGludGVyZmFjZSBUcmFuc2xhdGlvblBhcnNlciB7XG4gIC8qKlxuICAgKiBSZXR1cm5zIHRydWUgaWYgdGhpcyBwYXJzZXIgY2FuIHBhcnNlIHRoZSBnaXZlbiBmaWxlLlxuICAgKlxuICAgKiBAcGFyYW0gZmlsZVBhdGggVGhlIGFic29sdXRlIHBhdGggdG8gdGhlIHRyYW5zbGF0aW9uIGZpbGUuXG4gICAqIEBwYXJhbSBjb250ZW50cyBUaGUgY29udGVudHMgb2YgdGhlIHRyYW5zbGF0aW9uIGZpbGUuXG4gICAqL1xuICBjYW5QYXJzZShmaWxlUGF0aDogc3RyaW5nLCBjb250ZW50czogc3RyaW5nKTogYm9vbGVhbjtcblxuICAvKipcbiAgICogUGFyc2VzIHRoZSBnaXZlbiBmaWxlLCBleHRyYWN0aW5nIHRoZSB0YXJnZXQgbG9jYWxlIGFuZCB0cmFuc2xhdGlvbnMuXG4gICAqXG4gICAqIEBwYXJhbSBmaWxlUGF0aCBUaGUgYWJzb2x1dGUgcGF0aCB0byB0aGUgdHJhbnNsYXRpb24gZmlsZS5cbiAgICogQHBhcmFtIGNvbnRlbnRzIFRoZSBjb250ZW50cyBvZiB0aGUgdHJhbnNsYXRpb24gZmlsZS5cbiAgICovXG4gIHBhcnNlKGZpbGVQYXRoOiBzdHJpbmcsIGNvbnRlbnRzOiBzdHJpbmcpOiBUcmFuc2xhdGlvbkJ1bmRsZTtcbn1cbiJdfQ==
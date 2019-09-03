/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
const PLACEHOLDER_NAME_MARKER = ':';
/**
 * Tag a template literal string for localization.
 *
 * For example:
 *
 * ```ts
 * $localize `some string to localize`
 * ```
 *
 * **Naming placeholders**
 *
 * If the template literal string contains expressions then you can optionally name the placeholder
 * associated with each expression. Do this by providing the placeholder name wrapped in `:`
 * characters directly after the expression. These placeholder names are stripped out of the
 * rendered localized string.
 *
 * For example, to name the `item.length` expression placeholder `itemCount` you write:
 *
 * ```ts
 * $localize `There are ${item.length}:itemCount: items`;
 * ```
 *
 * If you need to use a `:` character directly an expression you must either provide a name or you
 * can escape the `:` by preceding it with a backslash:
 *
 * For example:
 *
 * ```ts
 * $localize `${label}:label:: ${}`
 * // or
 * $localize `${label}\: ${}`
 * ```
 *
 * **Processing localized strings:**
 *
 * There are three scenarios:
 *
 * * **compile-time inlining**: the `$localize` tag is transformed at compile time by a transpiler,
 * removing the tag and replacing the template literal string with a translated literal string
 * from a collection of translations provided to the transpilation tool.
 *
 * * **run-time evaluation**: the `$localize` tag is a run-time function that replaces and reorders
 * the parts (static strings and expressions) of the template literal string with strings from a
 * collection of translations loaded at run-time.
 *
 * * **pass-through evaluation**: the `$localize` tag is a run-time function that simply evaluates
 * the original template literal string without applying any translations to the parts. This version
 * is used during development or where there is no need to translate the localized template
 * literals.
 *
 * @param messageParts a collection of the static parts of the template string.
 * @param expressions a collection of the values of each placeholder in the template string.
 * @returns the translated string, with the `messageParts` and `expressions` interleaved together.
 */
export const $localize = function (messageParts, ...expressions) {
    if ($localize.translate) {
        // Don't use array expansion here to avoid the compiler adding `__read()` helper unnecessarily.
        const translation = $localize.translate(messageParts, expressions);
        messageParts = translation[0];
        expressions = translation[1];
    }
    let message = messageParts[0];
    for (let i = 1; i < messageParts.length; i++) {
        message += expressions[i - 1] + stripPlaceholderName(messageParts[i], messageParts.raw[i]);
    }
    return message;
};
/**
 * Strip the placeholder name from the start of the `messagePart`, if it is found.
 *
 * Placeholder marker characters (:) may appear after a substitution that does not provide an
 * explicit placeholder name. In this case the character must be escaped with a backslash, `\:`.
 * We can check for this by looking at the `raw` messagePart, which should still contain the
 * backslash.
 *
 * If the template literal was synthesized then its raw array will only contain empty strings.
 * This is because TS needs the original source code to find the raw text and in the case of
 * synthesize AST nodes, there is no source code.
 *
 * The workaround is to assume that the template literal did not contain an escaped placeholder
 * name, and fall back on checking the cooked array instead.
 *
 * This should be OK because synthesized nodes (from the Angular template compiler) will always
 * provide explicit placeholder names and so will never need to escape placeholder name markers.
 *
 * @param messagePart The cooked message part to process.
 * @param rawMessagePart The raw message part to check.
 * @returns the message part with the placeholder name stripped, if found.
 */
function stripPlaceholderName(messagePart, rawMessagePart) {
    return (rawMessagePart || messagePart).charAt(0) === PLACEHOLDER_NAME_MARKER ?
        messagePart.substring(messagePart.indexOf(PLACEHOLDER_NAME_MARKER, 1) + 1) :
        messagePart;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9sb2NhbGl6ZS9zcmMvbG9jYWxpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsTUFBTSx1QkFBdUIsR0FBRyxHQUFHLENBQUM7QUF1QnBDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFERztBQUNILE1BQU0sQ0FBQyxNQUFNLFNBQVMsR0FBZSxVQUNqQyxZQUFrQyxFQUFFLEdBQUcsV0FBMkI7SUFDcEUsSUFBSSxTQUFTLENBQUMsU0FBUyxFQUFFO1FBQ3ZCLCtGQUErRjtRQUMvRixNQUFNLFdBQVcsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsQ0FBQztRQUNuRSxZQUFZLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzlCLFdBQVcsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDOUI7SUFDRCxJQUFJLE9BQU8sR0FBRyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFlBQVksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDNUMsT0FBTyxJQUFJLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsb0JBQW9CLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM1RjtJQUNELE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUMsQ0FBQztBQUVGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FxQkc7QUFDSCxTQUFTLG9CQUFvQixDQUFDLFdBQW1CLEVBQUUsY0FBc0I7SUFDdkUsT0FBTyxDQUFDLGNBQWMsSUFBSSxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssdUJBQXVCLENBQUMsQ0FBQztRQUMxRSxXQUFXLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1RSxXQUFXLENBQUM7QUFDbEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cblxuY29uc3QgUExBQ0VIT0xERVJfTkFNRV9NQVJLRVIgPSAnOic7XG5cbmV4cG9ydCBpbnRlcmZhY2UgTG9jYWxpemVGbiB7XG4gIChtZXNzYWdlUGFydHM6IFRlbXBsYXRlU3RyaW5nc0FycmF5LCAuLi5leHByZXNzaW9uczogcmVhZG9ubHkgYW55W10pOiBzdHJpbmc7XG5cbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCBjb252ZXJ0cyBhbiBpbnB1dCBcIm1lc3NhZ2Ugd2l0aCBleHByZXNzaW9uc1wiIGludG8gYSB0cmFuc2xhdGVkIFwibWVzc2FnZSB3aXRoXG4gICAqIGV4cHJlc3Npb25zXCIuXG4gICAqXG4gICAqIFRoZSBjb252ZXJzaW9uIG1heSBiZSBkb25lIGluIHBsYWNlLCBtb2RpZnlpbmcgdGhlIGFycmF5IHBhc3NlZCB0byB0aGUgZnVuY3Rpb24sIHNvXG4gICAqIGRvbid0IGFzc3VtZSB0aGF0IHRoaXMgaGFzIG5vIHNpZGUtZWZmZWN0cy5cbiAgICpcbiAgICogVGhlIGV4cHJlc3Npb25zIG11c3QgYmUgcGFzc2VkIGluIHNpbmNlIGl0IG1pZ2h0IGJlIHRoZXkgbmVlZCB0byBiZSByZW9yZGVyZWQgZm9yXG4gICAqIGRpZmZlcmVudCB0cmFuc2xhdGlvbnMuXG4gICAqL1xuICB0cmFuc2xhdGU/OiBUcmFuc2xhdGVGbjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBUcmFuc2xhdGVGbiB7XG4gIChtZXNzYWdlUGFydHM6IFRlbXBsYXRlU3RyaW5nc0FycmF5LFxuICAgZXhwcmVzc2lvbnM6IHJlYWRvbmx5IGFueVtdKTogW1RlbXBsYXRlU3RyaW5nc0FycmF5LCByZWFkb25seSBhbnlbXV07XG59XG5cbi8qKlxuICogVGFnIGEgdGVtcGxhdGUgbGl0ZXJhbCBzdHJpbmcgZm9yIGxvY2FsaXphdGlvbi5cbiAqXG4gKiBGb3IgZXhhbXBsZTpcbiAqXG4gKiBgYGB0c1xuICogJGxvY2FsaXplIGBzb21lIHN0cmluZyB0byBsb2NhbGl6ZWBcbiAqIGBgYFxuICpcbiAqICoqTmFtaW5nIHBsYWNlaG9sZGVycyoqXG4gKlxuICogSWYgdGhlIHRlbXBsYXRlIGxpdGVyYWwgc3RyaW5nIGNvbnRhaW5zIGV4cHJlc3Npb25zIHRoZW4geW91IGNhbiBvcHRpb25hbGx5IG5hbWUgdGhlIHBsYWNlaG9sZGVyXG4gKiBhc3NvY2lhdGVkIHdpdGggZWFjaCBleHByZXNzaW9uLiBEbyB0aGlzIGJ5IHByb3ZpZGluZyB0aGUgcGxhY2Vob2xkZXIgbmFtZSB3cmFwcGVkIGluIGA6YFxuICogY2hhcmFjdGVycyBkaXJlY3RseSBhZnRlciB0aGUgZXhwcmVzc2lvbi4gVGhlc2UgcGxhY2Vob2xkZXIgbmFtZXMgYXJlIHN0cmlwcGVkIG91dCBvZiB0aGVcbiAqIHJlbmRlcmVkIGxvY2FsaXplZCBzdHJpbmcuXG4gKlxuICogRm9yIGV4YW1wbGUsIHRvIG5hbWUgdGhlIGBpdGVtLmxlbmd0aGAgZXhwcmVzc2lvbiBwbGFjZWhvbGRlciBgaXRlbUNvdW50YCB5b3Ugd3JpdGU6XG4gKlxuICogYGBgdHNcbiAqICRsb2NhbGl6ZSBgVGhlcmUgYXJlICR7aXRlbS5sZW5ndGh9Oml0ZW1Db3VudDogaXRlbXNgO1xuICogYGBgXG4gKlxuICogSWYgeW91IG5lZWQgdG8gdXNlIGEgYDpgIGNoYXJhY3RlciBkaXJlY3RseSBhbiBleHByZXNzaW9uIHlvdSBtdXN0IGVpdGhlciBwcm92aWRlIGEgbmFtZSBvciB5b3VcbiAqIGNhbiBlc2NhcGUgdGhlIGA6YCBieSBwcmVjZWRpbmcgaXQgd2l0aCBhIGJhY2tzbGFzaDpcbiAqXG4gKiBGb3IgZXhhbXBsZTpcbiAqXG4gKiBgYGB0c1xuICogJGxvY2FsaXplIGAke2xhYmVsfTpsYWJlbDo6ICR7fWBcbiAqIC8vIG9yXG4gKiAkbG9jYWxpemUgYCR7bGFiZWx9XFw6ICR7fWBcbiAqIGBgYFxuICpcbiAqICoqUHJvY2Vzc2luZyBsb2NhbGl6ZWQgc3RyaW5nczoqKlxuICpcbiAqIFRoZXJlIGFyZSB0aHJlZSBzY2VuYXJpb3M6XG4gKlxuICogKiAqKmNvbXBpbGUtdGltZSBpbmxpbmluZyoqOiB0aGUgYCRsb2NhbGl6ZWAgdGFnIGlzIHRyYW5zZm9ybWVkIGF0IGNvbXBpbGUgdGltZSBieSBhIHRyYW5zcGlsZXIsXG4gKiByZW1vdmluZyB0aGUgdGFnIGFuZCByZXBsYWNpbmcgdGhlIHRlbXBsYXRlIGxpdGVyYWwgc3RyaW5nIHdpdGggYSB0cmFuc2xhdGVkIGxpdGVyYWwgc3RyaW5nXG4gKiBmcm9tIGEgY29sbGVjdGlvbiBvZiB0cmFuc2xhdGlvbnMgcHJvdmlkZWQgdG8gdGhlIHRyYW5zcGlsYXRpb24gdG9vbC5cbiAqXG4gKiAqICoqcnVuLXRpbWUgZXZhbHVhdGlvbioqOiB0aGUgYCRsb2NhbGl6ZWAgdGFnIGlzIGEgcnVuLXRpbWUgZnVuY3Rpb24gdGhhdCByZXBsYWNlcyBhbmQgcmVvcmRlcnNcbiAqIHRoZSBwYXJ0cyAoc3RhdGljIHN0cmluZ3MgYW5kIGV4cHJlc3Npb25zKSBvZiB0aGUgdGVtcGxhdGUgbGl0ZXJhbCBzdHJpbmcgd2l0aCBzdHJpbmdzIGZyb20gYVxuICogY29sbGVjdGlvbiBvZiB0cmFuc2xhdGlvbnMgbG9hZGVkIGF0IHJ1bi10aW1lLlxuICpcbiAqICogKipwYXNzLXRocm91Z2ggZXZhbHVhdGlvbioqOiB0aGUgYCRsb2NhbGl6ZWAgdGFnIGlzIGEgcnVuLXRpbWUgZnVuY3Rpb24gdGhhdCBzaW1wbHkgZXZhbHVhdGVzXG4gKiB0aGUgb3JpZ2luYWwgdGVtcGxhdGUgbGl0ZXJhbCBzdHJpbmcgd2l0aG91dCBhcHBseWluZyBhbnkgdHJhbnNsYXRpb25zIHRvIHRoZSBwYXJ0cy4gVGhpcyB2ZXJzaW9uXG4gKiBpcyB1c2VkIGR1cmluZyBkZXZlbG9wbWVudCBvciB3aGVyZSB0aGVyZSBpcyBubyBuZWVkIHRvIHRyYW5zbGF0ZSB0aGUgbG9jYWxpemVkIHRlbXBsYXRlXG4gKiBsaXRlcmFscy5cbiAqXG4gKiBAcGFyYW0gbWVzc2FnZVBhcnRzIGEgY29sbGVjdGlvbiBvZiB0aGUgc3RhdGljIHBhcnRzIG9mIHRoZSB0ZW1wbGF0ZSBzdHJpbmcuXG4gKiBAcGFyYW0gZXhwcmVzc2lvbnMgYSBjb2xsZWN0aW9uIG9mIHRoZSB2YWx1ZXMgb2YgZWFjaCBwbGFjZWhvbGRlciBpbiB0aGUgdGVtcGxhdGUgc3RyaW5nLlxuICogQHJldHVybnMgdGhlIHRyYW5zbGF0ZWQgc3RyaW5nLCB3aXRoIHRoZSBgbWVzc2FnZVBhcnRzYCBhbmQgYGV4cHJlc3Npb25zYCBpbnRlcmxlYXZlZCB0b2dldGhlci5cbiAqL1xuZXhwb3J0IGNvbnN0ICRsb2NhbGl6ZTogTG9jYWxpemVGbiA9IGZ1bmN0aW9uKFxuICAgIG1lc3NhZ2VQYXJ0czogVGVtcGxhdGVTdHJpbmdzQXJyYXksIC4uLmV4cHJlc3Npb25zOiByZWFkb25seSBhbnlbXSkge1xuICBpZiAoJGxvY2FsaXplLnRyYW5zbGF0ZSkge1xuICAgIC8vIERvbid0IHVzZSBhcnJheSBleHBhbnNpb24gaGVyZSB0byBhdm9pZCB0aGUgY29tcGlsZXIgYWRkaW5nIGBfX3JlYWQoKWAgaGVscGVyIHVubmVjZXNzYXJpbHkuXG4gICAgY29uc3QgdHJhbnNsYXRpb24gPSAkbG9jYWxpemUudHJhbnNsYXRlKG1lc3NhZ2VQYXJ0cywgZXhwcmVzc2lvbnMpO1xuICAgIG1lc3NhZ2VQYXJ0cyA9IHRyYW5zbGF0aW9uWzBdO1xuICAgIGV4cHJlc3Npb25zID0gdHJhbnNsYXRpb25bMV07XG4gIH1cbiAgbGV0IG1lc3NhZ2UgPSBtZXNzYWdlUGFydHNbMF07XG4gIGZvciAobGV0IGkgPSAxOyBpIDwgbWVzc2FnZVBhcnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgbWVzc2FnZSArPSBleHByZXNzaW9uc1tpIC0gMV0gKyBzdHJpcFBsYWNlaG9sZGVyTmFtZShtZXNzYWdlUGFydHNbaV0sIG1lc3NhZ2VQYXJ0cy5yYXdbaV0pO1xuICB9XG4gIHJldHVybiBtZXNzYWdlO1xufTtcblxuLyoqXG4gKiBTdHJpcCB0aGUgcGxhY2Vob2xkZXIgbmFtZSBmcm9tIHRoZSBzdGFydCBvZiB0aGUgYG1lc3NhZ2VQYXJ0YCwgaWYgaXQgaXMgZm91bmQuXG4gKlxuICogUGxhY2Vob2xkZXIgbWFya2VyIGNoYXJhY3RlcnMgKDopIG1heSBhcHBlYXIgYWZ0ZXIgYSBzdWJzdGl0dXRpb24gdGhhdCBkb2VzIG5vdCBwcm92aWRlIGFuXG4gKiBleHBsaWNpdCBwbGFjZWhvbGRlciBuYW1lLiBJbiB0aGlzIGNhc2UgdGhlIGNoYXJhY3RlciBtdXN0IGJlIGVzY2FwZWQgd2l0aCBhIGJhY2tzbGFzaCwgYFxcOmAuXG4gKiBXZSBjYW4gY2hlY2sgZm9yIHRoaXMgYnkgbG9va2luZyBhdCB0aGUgYHJhd2AgbWVzc2FnZVBhcnQsIHdoaWNoIHNob3VsZCBzdGlsbCBjb250YWluIHRoZVxuICogYmFja3NsYXNoLlxuICpcbiAqIElmIHRoZSB0ZW1wbGF0ZSBsaXRlcmFsIHdhcyBzeW50aGVzaXplZCB0aGVuIGl0cyByYXcgYXJyYXkgd2lsbCBvbmx5IGNvbnRhaW4gZW1wdHkgc3RyaW5ncy5cbiAqIFRoaXMgaXMgYmVjYXVzZSBUUyBuZWVkcyB0aGUgb3JpZ2luYWwgc291cmNlIGNvZGUgdG8gZmluZCB0aGUgcmF3IHRleHQgYW5kIGluIHRoZSBjYXNlIG9mXG4gKiBzeW50aGVzaXplIEFTVCBub2RlcywgdGhlcmUgaXMgbm8gc291cmNlIGNvZGUuXG4gKlxuICogVGhlIHdvcmthcm91bmQgaXMgdG8gYXNzdW1lIHRoYXQgdGhlIHRlbXBsYXRlIGxpdGVyYWwgZGlkIG5vdCBjb250YWluIGFuIGVzY2FwZWQgcGxhY2Vob2xkZXJcbiAqIG5hbWUsIGFuZCBmYWxsIGJhY2sgb24gY2hlY2tpbmcgdGhlIGNvb2tlZCBhcnJheSBpbnN0ZWFkLlxuICpcbiAqIFRoaXMgc2hvdWxkIGJlIE9LIGJlY2F1c2Ugc3ludGhlc2l6ZWQgbm9kZXMgKGZyb20gdGhlIEFuZ3VsYXIgdGVtcGxhdGUgY29tcGlsZXIpIHdpbGwgYWx3YXlzXG4gKiBwcm92aWRlIGV4cGxpY2l0IHBsYWNlaG9sZGVyIG5hbWVzIGFuZCBzbyB3aWxsIG5ldmVyIG5lZWQgdG8gZXNjYXBlIHBsYWNlaG9sZGVyIG5hbWUgbWFya2Vycy5cbiAqXG4gKiBAcGFyYW0gbWVzc2FnZVBhcnQgVGhlIGNvb2tlZCBtZXNzYWdlIHBhcnQgdG8gcHJvY2Vzcy5cbiAqIEBwYXJhbSByYXdNZXNzYWdlUGFydCBUaGUgcmF3IG1lc3NhZ2UgcGFydCB0byBjaGVjay5cbiAqIEByZXR1cm5zIHRoZSBtZXNzYWdlIHBhcnQgd2l0aCB0aGUgcGxhY2Vob2xkZXIgbmFtZSBzdHJpcHBlZCwgaWYgZm91bmQuXG4gKi9cbmZ1bmN0aW9uIHN0cmlwUGxhY2Vob2xkZXJOYW1lKG1lc3NhZ2VQYXJ0OiBzdHJpbmcsIHJhd01lc3NhZ2VQYXJ0OiBzdHJpbmcpIHtcbiAgcmV0dXJuIChyYXdNZXNzYWdlUGFydCB8fCBtZXNzYWdlUGFydCkuY2hhckF0KDApID09PSBQTEFDRUhPTERFUl9OQU1FX01BUktFUiA/XG4gICAgICBtZXNzYWdlUGFydC5zdWJzdHJpbmcobWVzc2FnZVBhcnQuaW5kZXhPZihQTEFDRUhPTERFUl9OQU1FX01BUktFUiwgMSkgKyAxKSA6XG4gICAgICBtZXNzYWdlUGFydDtcbn1cbiJdfQ==
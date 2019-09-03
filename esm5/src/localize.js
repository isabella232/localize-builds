/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
var PLACEHOLDER_NAME_MARKER = ':';
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
export var $localize = function (messageParts) {
    var expressions = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        expressions[_i - 1] = arguments[_i];
    }
    if ($localize.translate) {
        // Don't use array expansion here to avoid the compiler adding `__read()` helper unnecessarily.
        var translation = $localize.translate(messageParts, expressions);
        messageParts = translation[0];
        expressions = translation[1];
    }
    var message = messageParts[0];
    for (var i = 1; i < messageParts.length; i++) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9sb2NhbGl6ZS9zcmMvbG9jYWxpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsSUFBTSx1QkFBdUIsR0FBRyxHQUFHLENBQUM7QUF1QnBDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFERztBQUNILE1BQU0sQ0FBQyxJQUFNLFNBQVMsR0FBZSxVQUNqQyxZQUFrQztJQUFFLHFCQUE4QjtTQUE5QixVQUE4QixFQUE5QixxQkFBOEIsRUFBOUIsSUFBOEI7UUFBOUIsb0NBQThCOztJQUNwRSxJQUFJLFNBQVMsQ0FBQyxTQUFTLEVBQUU7UUFDdkIsK0ZBQStGO1FBQy9GLElBQU0sV0FBVyxHQUFHLFNBQVMsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBQ25FLFlBQVksR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDOUIsV0FBVyxHQUFHLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM5QjtJQUNELElBQUksT0FBTyxHQUFHLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUM1QyxPQUFPLElBQUksV0FBVyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxvQkFBb0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQUUsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzVGO0lBQ0QsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQyxDQUFDO0FBRUY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXFCRztBQUNILFNBQVMsb0JBQW9CLENBQUMsV0FBbUIsRUFBRSxjQUFzQjtJQUN2RSxPQUFPLENBQUMsY0FBYyxJQUFJLFdBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyx1QkFBdUIsQ0FBQyxDQUFDO1FBQzFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyx1QkFBdUIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzVFLFdBQVcsQ0FBQztBQUNsQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBJbmMuIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5jb25zdCBQTEFDRUhPTERFUl9OQU1FX01BUktFUiA9ICc6JztcblxuZXhwb3J0IGludGVyZmFjZSBMb2NhbGl6ZUZuIHtcbiAgKG1lc3NhZ2VQYXJ0czogVGVtcGxhdGVTdHJpbmdzQXJyYXksIC4uLmV4cHJlc3Npb25zOiByZWFkb25seSBhbnlbXSk6IHN0cmluZztcblxuICAvKipcbiAgICogQSBmdW5jdGlvbiB0aGF0IGNvbnZlcnRzIGFuIGlucHV0IFwibWVzc2FnZSB3aXRoIGV4cHJlc3Npb25zXCIgaW50byBhIHRyYW5zbGF0ZWQgXCJtZXNzYWdlIHdpdGhcbiAgICogZXhwcmVzc2lvbnNcIi5cbiAgICpcbiAgICogVGhlIGNvbnZlcnNpb24gbWF5IGJlIGRvbmUgaW4gcGxhY2UsIG1vZGlmeWluZyB0aGUgYXJyYXkgcGFzc2VkIHRvIHRoZSBmdW5jdGlvbiwgc29cbiAgICogZG9uJ3QgYXNzdW1lIHRoYXQgdGhpcyBoYXMgbm8gc2lkZS1lZmZlY3RzLlxuICAgKlxuICAgKiBUaGUgZXhwcmVzc2lvbnMgbXVzdCBiZSBwYXNzZWQgaW4gc2luY2UgaXQgbWlnaHQgYmUgdGhleSBuZWVkIHRvIGJlIHJlb3JkZXJlZCBmb3JcbiAgICogZGlmZmVyZW50IHRyYW5zbGF0aW9ucy5cbiAgICovXG4gIHRyYW5zbGF0ZT86IFRyYW5zbGF0ZUZuO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIFRyYW5zbGF0ZUZuIHtcbiAgKG1lc3NhZ2VQYXJ0czogVGVtcGxhdGVTdHJpbmdzQXJyYXksXG4gICBleHByZXNzaW9uczogcmVhZG9ubHkgYW55W10pOiBbVGVtcGxhdGVTdHJpbmdzQXJyYXksIHJlYWRvbmx5IGFueVtdXTtcbn1cblxuLyoqXG4gKiBUYWcgYSB0ZW1wbGF0ZSBsaXRlcmFsIHN0cmluZyBmb3IgbG9jYWxpemF0aW9uLlxuICpcbiAqIEZvciBleGFtcGxlOlxuICpcbiAqIGBgYHRzXG4gKiAkbG9jYWxpemUgYHNvbWUgc3RyaW5nIHRvIGxvY2FsaXplYFxuICogYGBgXG4gKlxuICogKipOYW1pbmcgcGxhY2Vob2xkZXJzKipcbiAqXG4gKiBJZiB0aGUgdGVtcGxhdGUgbGl0ZXJhbCBzdHJpbmcgY29udGFpbnMgZXhwcmVzc2lvbnMgdGhlbiB5b3UgY2FuIG9wdGlvbmFsbHkgbmFtZSB0aGUgcGxhY2Vob2xkZXJcbiAqIGFzc29jaWF0ZWQgd2l0aCBlYWNoIGV4cHJlc3Npb24uIERvIHRoaXMgYnkgcHJvdmlkaW5nIHRoZSBwbGFjZWhvbGRlciBuYW1lIHdyYXBwZWQgaW4gYDpgXG4gKiBjaGFyYWN0ZXJzIGRpcmVjdGx5IGFmdGVyIHRoZSBleHByZXNzaW9uLiBUaGVzZSBwbGFjZWhvbGRlciBuYW1lcyBhcmUgc3RyaXBwZWQgb3V0IG9mIHRoZVxuICogcmVuZGVyZWQgbG9jYWxpemVkIHN0cmluZy5cbiAqXG4gKiBGb3IgZXhhbXBsZSwgdG8gbmFtZSB0aGUgYGl0ZW0ubGVuZ3RoYCBleHByZXNzaW9uIHBsYWNlaG9sZGVyIGBpdGVtQ291bnRgIHlvdSB3cml0ZTpcbiAqXG4gKiBgYGB0c1xuICogJGxvY2FsaXplIGBUaGVyZSBhcmUgJHtpdGVtLmxlbmd0aH06aXRlbUNvdW50OiBpdGVtc2A7XG4gKiBgYGBcbiAqXG4gKiBJZiB5b3UgbmVlZCB0byB1c2UgYSBgOmAgY2hhcmFjdGVyIGRpcmVjdGx5IGFuIGV4cHJlc3Npb24geW91IG11c3QgZWl0aGVyIHByb3ZpZGUgYSBuYW1lIG9yIHlvdVxuICogY2FuIGVzY2FwZSB0aGUgYDpgIGJ5IHByZWNlZGluZyBpdCB3aXRoIGEgYmFja3NsYXNoOlxuICpcbiAqIEZvciBleGFtcGxlOlxuICpcbiAqIGBgYHRzXG4gKiAkbG9jYWxpemUgYCR7bGFiZWx9OmxhYmVsOjogJHt9YFxuICogLy8gb3JcbiAqICRsb2NhbGl6ZSBgJHtsYWJlbH1cXDogJHt9YFxuICogYGBgXG4gKlxuICogKipQcm9jZXNzaW5nIGxvY2FsaXplZCBzdHJpbmdzOioqXG4gKlxuICogVGhlcmUgYXJlIHRocmVlIHNjZW5hcmlvczpcbiAqXG4gKiAqICoqY29tcGlsZS10aW1lIGlubGluaW5nKio6IHRoZSBgJGxvY2FsaXplYCB0YWcgaXMgdHJhbnNmb3JtZWQgYXQgY29tcGlsZSB0aW1lIGJ5IGEgdHJhbnNwaWxlcixcbiAqIHJlbW92aW5nIHRoZSB0YWcgYW5kIHJlcGxhY2luZyB0aGUgdGVtcGxhdGUgbGl0ZXJhbCBzdHJpbmcgd2l0aCBhIHRyYW5zbGF0ZWQgbGl0ZXJhbCBzdHJpbmdcbiAqIGZyb20gYSBjb2xsZWN0aW9uIG9mIHRyYW5zbGF0aW9ucyBwcm92aWRlZCB0byB0aGUgdHJhbnNwaWxhdGlvbiB0b29sLlxuICpcbiAqICogKipydW4tdGltZSBldmFsdWF0aW9uKio6IHRoZSBgJGxvY2FsaXplYCB0YWcgaXMgYSBydW4tdGltZSBmdW5jdGlvbiB0aGF0IHJlcGxhY2VzIGFuZCByZW9yZGVyc1xuICogdGhlIHBhcnRzIChzdGF0aWMgc3RyaW5ncyBhbmQgZXhwcmVzc2lvbnMpIG9mIHRoZSB0ZW1wbGF0ZSBsaXRlcmFsIHN0cmluZyB3aXRoIHN0cmluZ3MgZnJvbSBhXG4gKiBjb2xsZWN0aW9uIG9mIHRyYW5zbGF0aW9ucyBsb2FkZWQgYXQgcnVuLXRpbWUuXG4gKlxuICogKiAqKnBhc3MtdGhyb3VnaCBldmFsdWF0aW9uKio6IHRoZSBgJGxvY2FsaXplYCB0YWcgaXMgYSBydW4tdGltZSBmdW5jdGlvbiB0aGF0IHNpbXBseSBldmFsdWF0ZXNcbiAqIHRoZSBvcmlnaW5hbCB0ZW1wbGF0ZSBsaXRlcmFsIHN0cmluZyB3aXRob3V0IGFwcGx5aW5nIGFueSB0cmFuc2xhdGlvbnMgdG8gdGhlIHBhcnRzLiBUaGlzIHZlcnNpb25cbiAqIGlzIHVzZWQgZHVyaW5nIGRldmVsb3BtZW50IG9yIHdoZXJlIHRoZXJlIGlzIG5vIG5lZWQgdG8gdHJhbnNsYXRlIHRoZSBsb2NhbGl6ZWQgdGVtcGxhdGVcbiAqIGxpdGVyYWxzLlxuICpcbiAqIEBwYXJhbSBtZXNzYWdlUGFydHMgYSBjb2xsZWN0aW9uIG9mIHRoZSBzdGF0aWMgcGFydHMgb2YgdGhlIHRlbXBsYXRlIHN0cmluZy5cbiAqIEBwYXJhbSBleHByZXNzaW9ucyBhIGNvbGxlY3Rpb24gb2YgdGhlIHZhbHVlcyBvZiBlYWNoIHBsYWNlaG9sZGVyIGluIHRoZSB0ZW1wbGF0ZSBzdHJpbmcuXG4gKiBAcmV0dXJucyB0aGUgdHJhbnNsYXRlZCBzdHJpbmcsIHdpdGggdGhlIGBtZXNzYWdlUGFydHNgIGFuZCBgZXhwcmVzc2lvbnNgIGludGVybGVhdmVkIHRvZ2V0aGVyLlxuICovXG5leHBvcnQgY29uc3QgJGxvY2FsaXplOiBMb2NhbGl6ZUZuID0gZnVuY3Rpb24oXG4gICAgbWVzc2FnZVBhcnRzOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSwgLi4uZXhwcmVzc2lvbnM6IHJlYWRvbmx5IGFueVtdKSB7XG4gIGlmICgkbG9jYWxpemUudHJhbnNsYXRlKSB7XG4gICAgLy8gRG9uJ3QgdXNlIGFycmF5IGV4cGFuc2lvbiBoZXJlIHRvIGF2b2lkIHRoZSBjb21waWxlciBhZGRpbmcgYF9fcmVhZCgpYCBoZWxwZXIgdW5uZWNlc3NhcmlseS5cbiAgICBjb25zdCB0cmFuc2xhdGlvbiA9ICRsb2NhbGl6ZS50cmFuc2xhdGUobWVzc2FnZVBhcnRzLCBleHByZXNzaW9ucyk7XG4gICAgbWVzc2FnZVBhcnRzID0gdHJhbnNsYXRpb25bMF07XG4gICAgZXhwcmVzc2lvbnMgPSB0cmFuc2xhdGlvblsxXTtcbiAgfVxuICBsZXQgbWVzc2FnZSA9IG1lc3NhZ2VQYXJ0c1swXTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBtZXNzYWdlUGFydHMubGVuZ3RoOyBpKyspIHtcbiAgICBtZXNzYWdlICs9IGV4cHJlc3Npb25zW2kgLSAxXSArIHN0cmlwUGxhY2Vob2xkZXJOYW1lKG1lc3NhZ2VQYXJ0c1tpXSwgbWVzc2FnZVBhcnRzLnJhd1tpXSk7XG4gIH1cbiAgcmV0dXJuIG1lc3NhZ2U7XG59O1xuXG4vKipcbiAqIFN0cmlwIHRoZSBwbGFjZWhvbGRlciBuYW1lIGZyb20gdGhlIHN0YXJ0IG9mIHRoZSBgbWVzc2FnZVBhcnRgLCBpZiBpdCBpcyBmb3VuZC5cbiAqXG4gKiBQbGFjZWhvbGRlciBtYXJrZXIgY2hhcmFjdGVycyAoOikgbWF5IGFwcGVhciBhZnRlciBhIHN1YnN0aXR1dGlvbiB0aGF0IGRvZXMgbm90IHByb3ZpZGUgYW5cbiAqIGV4cGxpY2l0IHBsYWNlaG9sZGVyIG5hbWUuIEluIHRoaXMgY2FzZSB0aGUgY2hhcmFjdGVyIG11c3QgYmUgZXNjYXBlZCB3aXRoIGEgYmFja3NsYXNoLCBgXFw6YC5cbiAqIFdlIGNhbiBjaGVjayBmb3IgdGhpcyBieSBsb29raW5nIGF0IHRoZSBgcmF3YCBtZXNzYWdlUGFydCwgd2hpY2ggc2hvdWxkIHN0aWxsIGNvbnRhaW4gdGhlXG4gKiBiYWNrc2xhc2guXG4gKlxuICogSWYgdGhlIHRlbXBsYXRlIGxpdGVyYWwgd2FzIHN5bnRoZXNpemVkIHRoZW4gaXRzIHJhdyBhcnJheSB3aWxsIG9ubHkgY29udGFpbiBlbXB0eSBzdHJpbmdzLlxuICogVGhpcyBpcyBiZWNhdXNlIFRTIG5lZWRzIHRoZSBvcmlnaW5hbCBzb3VyY2UgY29kZSB0byBmaW5kIHRoZSByYXcgdGV4dCBhbmQgaW4gdGhlIGNhc2Ugb2ZcbiAqIHN5bnRoZXNpemUgQVNUIG5vZGVzLCB0aGVyZSBpcyBubyBzb3VyY2UgY29kZS5cbiAqXG4gKiBUaGUgd29ya2Fyb3VuZCBpcyB0byBhc3N1bWUgdGhhdCB0aGUgdGVtcGxhdGUgbGl0ZXJhbCBkaWQgbm90IGNvbnRhaW4gYW4gZXNjYXBlZCBwbGFjZWhvbGRlclxuICogbmFtZSwgYW5kIGZhbGwgYmFjayBvbiBjaGVja2luZyB0aGUgY29va2VkIGFycmF5IGluc3RlYWQuXG4gKlxuICogVGhpcyBzaG91bGQgYmUgT0sgYmVjYXVzZSBzeW50aGVzaXplZCBub2RlcyAoZnJvbSB0aGUgQW5ndWxhciB0ZW1wbGF0ZSBjb21waWxlcikgd2lsbCBhbHdheXNcbiAqIHByb3ZpZGUgZXhwbGljaXQgcGxhY2Vob2xkZXIgbmFtZXMgYW5kIHNvIHdpbGwgbmV2ZXIgbmVlZCB0byBlc2NhcGUgcGxhY2Vob2xkZXIgbmFtZSBtYXJrZXJzLlxuICpcbiAqIEBwYXJhbSBtZXNzYWdlUGFydCBUaGUgY29va2VkIG1lc3NhZ2UgcGFydCB0byBwcm9jZXNzLlxuICogQHBhcmFtIHJhd01lc3NhZ2VQYXJ0IFRoZSByYXcgbWVzc2FnZSBwYXJ0IHRvIGNoZWNrLlxuICogQHJldHVybnMgdGhlIG1lc3NhZ2UgcGFydCB3aXRoIHRoZSBwbGFjZWhvbGRlciBuYW1lIHN0cmlwcGVkLCBpZiBmb3VuZC5cbiAqL1xuZnVuY3Rpb24gc3RyaXBQbGFjZWhvbGRlck5hbWUobWVzc2FnZVBhcnQ6IHN0cmluZywgcmF3TWVzc2FnZVBhcnQ6IHN0cmluZykge1xuICByZXR1cm4gKHJhd01lc3NhZ2VQYXJ0IHx8IG1lc3NhZ2VQYXJ0KS5jaGFyQXQoMCkgPT09IFBMQUNFSE9MREVSX05BTUVfTUFSS0VSID9cbiAgICAgIG1lc3NhZ2VQYXJ0LnN1YnN0cmluZyhtZXNzYWdlUGFydC5pbmRleE9mKFBMQUNFSE9MREVSX05BTUVfTUFSS0VSLCAxKSArIDEpIDpcbiAgICAgIG1lc3NhZ2VQYXJ0O1xufVxuIl19
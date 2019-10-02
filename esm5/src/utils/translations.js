/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { BLOCK_MARKER } from './constants';
import { parseMessage } from './messages';
/**
 * Translate the text of the `$localize` tagged-string (i.e. `messageParts` and
 * `substitutions`) using the given `translations`.
 *
 * The tagged-string is parsed to extract its `messageId` which is used to find an appropriate
 * `ParsedTranslation`.
 *
 * If one is found then it is used to translate the message into a new set of `messageParts` and
 * `substitutions`.
 * The translation may reorder (or remove) substitutions as appropriate.
 *
 * If there is no translation with a matching message id then an error is thrown.
 * If a translation contains a placeholder that is not found in the message being translated then an
 * error is thrown.
 */
export function translate(translations, messageParts, substitutions) {
    var message = parseMessage(messageParts, substitutions);
    var translation = translations[message.messageId];
    if (translation !== undefined) {
        return [
            translation.messageParts, translation.placeholderNames.map(function (placeholder) {
                if (message.substitutions.hasOwnProperty(placeholder)) {
                    return message.substitutions[placeholder];
                }
                else {
                    throw new Error("No placeholder found with name " + placeholder + " in message " + describeMessage(message) + ".");
                }
            })
        ];
    }
    else {
        throw new Error("No translation found for " + describeMessage(message) + ".");
    }
}
/**
 * Parse the `messageParts` and `placeholderNames` out of a target `message`.
 *
 * Used by `loadTranslations()` to convert target message strings into a structure that is more
 * appropriate for doing translation.
 *
 * @param message the message to be parsed.
 */
export function parseTranslation(message) {
    var parts = message.split(/{\$([^}]*)}/);
    var messageParts = [parts[0]];
    var placeholderNames = [];
    for (var i = 1; i < parts.length - 1; i += 2) {
        placeholderNames.push(parts[i]);
        messageParts.push("" + parts[i + 1]);
    }
    var rawMessageParts = messageParts.map(function (part) { return part.charAt(0) === BLOCK_MARKER ? '\\' + part : part; });
    return { messageParts: makeTemplateObject(messageParts, rawMessageParts), placeholderNames: placeholderNames };
}
/**
 * Create the specialized array that is passed to tagged-string tag functions.
 *
 * @param cooked The message parts with their escape codes processed.
 * @param raw The message parts with their escaped codes as-is.
 */
export function makeTemplateObject(cooked, raw) {
    Object.defineProperty(cooked, 'raw', { value: raw });
    return cooked;
}
function describeMessage(message) {
    var meaningString = message.meaning && " - \"" + message.meaning + "\"";
    return "\"" + message.messageId + "\" (\"" + message.messageString + "\"" + meaningString + ")";
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsYXRpb25zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvbG9jYWxpemUvc3JjL3V0aWxzL3RyYW5zbGF0aW9ucy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFDSCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBMEMsWUFBWSxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBaUJqRjs7Ozs7Ozs7Ozs7Ozs7R0FjRztBQUNILE1BQU0sVUFBVSxTQUFTLENBQ3JCLFlBQStDLEVBQUUsWUFBa0MsRUFDbkYsYUFBNkI7SUFDL0IsSUFBTSxPQUFPLEdBQUcsWUFBWSxDQUFDLFlBQVksRUFBRSxhQUFhLENBQUMsQ0FBQztJQUMxRCxJQUFNLFdBQVcsR0FBRyxZQUFZLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3BELElBQUksV0FBVyxLQUFLLFNBQVMsRUFBRTtRQUM3QixPQUFPO1lBQ0wsV0FBVyxDQUFDLFlBQVksRUFBRSxXQUFXLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLFVBQUEsV0FBVztnQkFDcEUsSUFBSSxPQUFPLENBQUMsYUFBYSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsRUFBRTtvQkFDckQsT0FBTyxPQUFPLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUMzQztxQkFBTTtvQkFDTCxNQUFNLElBQUksS0FBSyxDQUNYLG9DQUFrQyxXQUFXLG9CQUFlLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBRyxDQUFDLENBQUM7aUJBQzlGO1lBQ0gsQ0FBQyxDQUFDO1NBQ0gsQ0FBQztLQUNIO1NBQU07UUFDTCxNQUFNLElBQUksS0FBSyxDQUFDLDhCQUE0QixlQUFlLENBQUMsT0FBTyxDQUFDLE1BQUcsQ0FBQyxDQUFDO0tBQzFFO0FBQ0gsQ0FBQztBQUVEOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLFVBQVUsZ0JBQWdCLENBQUMsT0FBc0I7SUFDckQsSUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUMzQyxJQUFNLFlBQVksR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2hDLElBQU0sZ0JBQWdCLEdBQWEsRUFBRSxDQUFDO0lBQ3RDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzVDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUcsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUcsQ0FBQyxDQUFDO0tBQ3RDO0lBQ0QsSUFBTSxlQUFlLEdBQ2pCLFlBQVksQ0FBQyxHQUFHLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLFlBQVksQ0FBQyxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFwRCxDQUFvRCxDQUFDLENBQUM7SUFDbkYsT0FBTyxFQUFDLFlBQVksRUFBRSxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsZUFBZSxDQUFDLEVBQUUsZ0JBQWdCLGtCQUFBLEVBQUMsQ0FBQztBQUM3RixDQUFDO0FBRUQ7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsa0JBQWtCLENBQUMsTUFBZ0IsRUFBRSxHQUFhO0lBQ2hFLE1BQU0sQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUMsQ0FBQyxDQUFDO0lBQ25ELE9BQU8sTUFBYSxDQUFDO0FBQ3ZCLENBQUM7QUFHRCxTQUFTLGVBQWUsQ0FBQyxPQUFzQjtJQUM3QyxJQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsT0FBTyxJQUFJLFVBQU8sT0FBTyxDQUFDLE9BQU8sT0FBRyxDQUFDO0lBQ25FLE9BQU8sT0FBSSxPQUFPLENBQUMsU0FBUyxjQUFPLE9BQU8sQ0FBQyxhQUFhLFVBQUksYUFBYSxNQUFHLENBQUM7QUFDL0UsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgSW5jLiBBbGwgUmlnaHRzIFJlc2VydmVkLlxuICpcbiAqIFVzZSBvZiB0aGlzIHNvdXJjZSBjb2RlIGlzIGdvdmVybmVkIGJ5IGFuIE1JVC1zdHlsZSBsaWNlbnNlIHRoYXQgY2FuIGJlXG4gKiBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGF0IGh0dHBzOi8vYW5ndWxhci5pby9saWNlbnNlXG4gKi9cbmltcG9ydCB7QkxPQ0tfTUFSS0VSfSBmcm9tICcuL2NvbnN0YW50cyc7XG5pbXBvcnQge01lc3NhZ2VJZCwgUGFyc2VkTWVzc2FnZSwgVGFyZ2V0TWVzc2FnZSwgcGFyc2VNZXNzYWdlfSBmcm9tICcuL21lc3NhZ2VzJztcblxuXG4vKipcbiAqIEEgdHJhbnNsYXRpb24gbWVzc2FnZSB0aGF0IGhhcyBiZWVuIHByb2Nlc3NlZCB0byBleHRyYWN0IHRoZSBtZXNzYWdlIHBhcnRzIGFuZCBwbGFjZWhvbGRlcnMuXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGFyc2VkVHJhbnNsYXRpb24ge1xuICBtZXNzYWdlUGFydHM6IFRlbXBsYXRlU3RyaW5nc0FycmF5O1xuICBwbGFjZWhvbGRlck5hbWVzOiBzdHJpbmdbXTtcbn1cblxuLyoqXG4gKiBUaGUgaW50ZXJuYWwgc3RydWN0dXJlIHVzZWQgYnkgdGhlIHJ1bnRpbWUgbG9jYWxpemF0aW9uIHRvIHRyYW5zbGF0ZSBtZXNzYWdlcy5cbiAqL1xuZXhwb3J0IHR5cGUgUGFyc2VkVHJhbnNsYXRpb25zID0gUmVjb3JkPE1lc3NhZ2VJZCwgUGFyc2VkVHJhbnNsYXRpb24+O1xuXG5cbi8qKlxuICogVHJhbnNsYXRlIHRoZSB0ZXh0IG9mIHRoZSBgJGxvY2FsaXplYCB0YWdnZWQtc3RyaW5nIChpLmUuIGBtZXNzYWdlUGFydHNgIGFuZFxuICogYHN1YnN0aXR1dGlvbnNgKSB1c2luZyB0aGUgZ2l2ZW4gYHRyYW5zbGF0aW9uc2AuXG4gKlxuICogVGhlIHRhZ2dlZC1zdHJpbmcgaXMgcGFyc2VkIHRvIGV4dHJhY3QgaXRzIGBtZXNzYWdlSWRgIHdoaWNoIGlzIHVzZWQgdG8gZmluZCBhbiBhcHByb3ByaWF0ZVxuICogYFBhcnNlZFRyYW5zbGF0aW9uYC5cbiAqXG4gKiBJZiBvbmUgaXMgZm91bmQgdGhlbiBpdCBpcyB1c2VkIHRvIHRyYW5zbGF0ZSB0aGUgbWVzc2FnZSBpbnRvIGEgbmV3IHNldCBvZiBgbWVzc2FnZVBhcnRzYCBhbmRcbiAqIGBzdWJzdGl0dXRpb25zYC5cbiAqIFRoZSB0cmFuc2xhdGlvbiBtYXkgcmVvcmRlciAob3IgcmVtb3ZlKSBzdWJzdGl0dXRpb25zIGFzIGFwcHJvcHJpYXRlLlxuICpcbiAqIElmIHRoZXJlIGlzIG5vIHRyYW5zbGF0aW9uIHdpdGggYSBtYXRjaGluZyBtZXNzYWdlIGlkIHRoZW4gYW4gZXJyb3IgaXMgdGhyb3duLlxuICogSWYgYSB0cmFuc2xhdGlvbiBjb250YWlucyBhIHBsYWNlaG9sZGVyIHRoYXQgaXMgbm90IGZvdW5kIGluIHRoZSBtZXNzYWdlIGJlaW5nIHRyYW5zbGF0ZWQgdGhlbiBhblxuICogZXJyb3IgaXMgdGhyb3duLlxuICovXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNsYXRlKFxuICAgIHRyYW5zbGF0aW9uczogUmVjb3JkPHN0cmluZywgUGFyc2VkVHJhbnNsYXRpb24+LCBtZXNzYWdlUGFydHM6IFRlbXBsYXRlU3RyaW5nc0FycmF5LFxuICAgIHN1YnN0aXR1dGlvbnM6IHJlYWRvbmx5IGFueVtdKTogW1RlbXBsYXRlU3RyaW5nc0FycmF5LCByZWFkb25seSBhbnlbXV0ge1xuICBjb25zdCBtZXNzYWdlID0gcGFyc2VNZXNzYWdlKG1lc3NhZ2VQYXJ0cywgc3Vic3RpdHV0aW9ucyk7XG4gIGNvbnN0IHRyYW5zbGF0aW9uID0gdHJhbnNsYXRpb25zW21lc3NhZ2UubWVzc2FnZUlkXTtcbiAgaWYgKHRyYW5zbGF0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gW1xuICAgICAgdHJhbnNsYXRpb24ubWVzc2FnZVBhcnRzLCB0cmFuc2xhdGlvbi5wbGFjZWhvbGRlck5hbWVzLm1hcChwbGFjZWhvbGRlciA9PiB7XG4gICAgICAgIGlmIChtZXNzYWdlLnN1YnN0aXR1dGlvbnMuaGFzT3duUHJvcGVydHkocGxhY2Vob2xkZXIpKSB7XG4gICAgICAgICAgcmV0dXJuIG1lc3NhZ2Uuc3Vic3RpdHV0aW9uc1twbGFjZWhvbGRlcl07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBgTm8gcGxhY2Vob2xkZXIgZm91bmQgd2l0aCBuYW1lICR7cGxhY2Vob2xkZXJ9IGluIG1lc3NhZ2UgJHtkZXNjcmliZU1lc3NhZ2UobWVzc2FnZSl9LmApO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgIF07XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBObyB0cmFuc2xhdGlvbiBmb3VuZCBmb3IgJHtkZXNjcmliZU1lc3NhZ2UobWVzc2FnZSl9LmApO1xuICB9XG59XG5cbi8qKlxuICogUGFyc2UgdGhlIGBtZXNzYWdlUGFydHNgIGFuZCBgcGxhY2Vob2xkZXJOYW1lc2Agb3V0IG9mIGEgdGFyZ2V0IGBtZXNzYWdlYC5cbiAqXG4gKiBVc2VkIGJ5IGBsb2FkVHJhbnNsYXRpb25zKClgIHRvIGNvbnZlcnQgdGFyZ2V0IG1lc3NhZ2Ugc3RyaW5ncyBpbnRvIGEgc3RydWN0dXJlIHRoYXQgaXMgbW9yZVxuICogYXBwcm9wcmlhdGUgZm9yIGRvaW5nIHRyYW5zbGF0aW9uLlxuICpcbiAqIEBwYXJhbSBtZXNzYWdlIHRoZSBtZXNzYWdlIHRvIGJlIHBhcnNlZC5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlVHJhbnNsYXRpb24obWVzc2FnZTogVGFyZ2V0TWVzc2FnZSk6IFBhcnNlZFRyYW5zbGF0aW9uIHtcbiAgY29uc3QgcGFydHMgPSBtZXNzYWdlLnNwbGl0KC97XFwkKFtefV0qKX0vKTtcbiAgY29uc3QgbWVzc2FnZVBhcnRzID0gW3BhcnRzWzBdXTtcbiAgY29uc3QgcGxhY2Vob2xkZXJOYW1lczogc3RyaW5nW10gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBwYXJ0cy5sZW5ndGggLSAxOyBpICs9IDIpIHtcbiAgICBwbGFjZWhvbGRlck5hbWVzLnB1c2gocGFydHNbaV0pO1xuICAgIG1lc3NhZ2VQYXJ0cy5wdXNoKGAke3BhcnRzW2kgKyAxXX1gKTtcbiAgfVxuICBjb25zdCByYXdNZXNzYWdlUGFydHMgPVxuICAgICAgbWVzc2FnZVBhcnRzLm1hcChwYXJ0ID0+IHBhcnQuY2hhckF0KDApID09PSBCTE9DS19NQVJLRVIgPyAnXFxcXCcgKyBwYXJ0IDogcGFydCk7XG4gIHJldHVybiB7bWVzc2FnZVBhcnRzOiBtYWtlVGVtcGxhdGVPYmplY3QobWVzc2FnZVBhcnRzLCByYXdNZXNzYWdlUGFydHMpLCBwbGFjZWhvbGRlck5hbWVzfTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgdGhlIHNwZWNpYWxpemVkIGFycmF5IHRoYXQgaXMgcGFzc2VkIHRvIHRhZ2dlZC1zdHJpbmcgdGFnIGZ1bmN0aW9ucy5cbiAqXG4gKiBAcGFyYW0gY29va2VkIFRoZSBtZXNzYWdlIHBhcnRzIHdpdGggdGhlaXIgZXNjYXBlIGNvZGVzIHByb2Nlc3NlZC5cbiAqIEBwYXJhbSByYXcgVGhlIG1lc3NhZ2UgcGFydHMgd2l0aCB0aGVpciBlc2NhcGVkIGNvZGVzIGFzLWlzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbWFrZVRlbXBsYXRlT2JqZWN0KGNvb2tlZDogc3RyaW5nW10sIHJhdzogc3RyaW5nW10pOiBUZW1wbGF0ZVN0cmluZ3NBcnJheSB7XG4gIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShjb29rZWQsICdyYXcnLCB7dmFsdWU6IHJhd30pO1xuICByZXR1cm4gY29va2VkIGFzIGFueTtcbn1cblxuXG5mdW5jdGlvbiBkZXNjcmliZU1lc3NhZ2UobWVzc2FnZTogUGFyc2VkTWVzc2FnZSk6IHN0cmluZyB7XG4gIGNvbnN0IG1lYW5pbmdTdHJpbmcgPSBtZXNzYWdlLm1lYW5pbmcgJiYgYCAtIFwiJHttZXNzYWdlLm1lYW5pbmd9XCJgO1xuICByZXR1cm4gYFwiJHttZXNzYWdlLm1lc3NhZ2VJZH1cIiAoXCIke21lc3NhZ2UubWVzc2FnZVN0cmluZ31cIiR7bWVhbmluZ1N0cmluZ30pYDtcbn0iXX0=
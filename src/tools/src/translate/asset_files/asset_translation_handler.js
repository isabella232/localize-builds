(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define("@angular/localize/src/tools/src/translate/asset_files/asset_translation_handler", ["require", "exports", "tslib", "@angular/compiler-cli/src/ngtsc/file_system"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = require("tslib");
    /**
     * @license
     * Copyright Google Inc. All Rights Reserved.
     *
     * Use of this source code is governed by an MIT-style license that can be
     * found in the LICENSE file at https://angular.io/license
     */
    var file_system_1 = require("@angular/compiler-cli/src/ngtsc/file_system");
    /**
     * Translate an asset file by simply copying it to the appropriate translation output paths.
     */
    var AssetTranslationHandler = /** @class */ (function () {
        function AssetTranslationHandler(fs) {
            this.fs = fs;
        }
        AssetTranslationHandler.prototype.canTranslate = function (_relativeFilePath, _contents) {
            return true;
        };
        AssetTranslationHandler.prototype.translate = function (diagnostics, _sourceRoot, relativeFilePath, contents, outputPathFn, translations, sourceLocale) {
            var e_1, _a;
            try {
                for (var translations_1 = tslib_1.__values(translations), translations_1_1 = translations_1.next(); !translations_1_1.done; translations_1_1 = translations_1.next()) {
                    var translation = translations_1_1.value;
                    this.writeAssetFile(diagnostics, outputPathFn, translation.locale, relativeFilePath, contents);
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (translations_1_1 && !translations_1_1.done && (_a = translations_1.return)) _a.call(translations_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (sourceLocale !== undefined) {
                this.writeAssetFile(diagnostics, outputPathFn, sourceLocale, relativeFilePath, contents);
            }
        };
        AssetTranslationHandler.prototype.writeAssetFile = function (diagnostics, outputPathFn, locale, relativeFilePath, contents) {
            try {
                var outputPath = file_system_1.absoluteFrom(outputPathFn(locale, relativeFilePath));
                this.fs.ensureDir(this.fs.dirname(outputPath));
                this.fs.writeFile(outputPath, contents);
            }
            catch (e) {
                diagnostics.error(e.message);
            }
        };
        return AssetTranslationHandler;
    }());
    exports.AssetTranslationHandler = AssetTranslationHandler;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXNzZXRfdHJhbnNsYXRpb25faGFuZGxlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2xvY2FsaXplL3NyYy90b29scy9zcmMvdHJhbnNsYXRlL2Fzc2V0X2ZpbGVzL2Fzc2V0X3RyYW5zbGF0aW9uX2hhbmRsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0lBQUE7Ozs7OztPQU1HO0lBQ0gsMkVBQWtIO0lBTWxIOztPQUVHO0lBQ0g7UUFDRSxpQ0FBb0IsRUFBYztZQUFkLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBRyxDQUFDO1FBRXRDLDhDQUFZLEdBQVosVUFBYSxpQkFBOEIsRUFBRSxTQUFpQjtZQUM1RCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7UUFFRCwyQ0FBUyxHQUFULFVBQ0ksV0FBd0IsRUFBRSxXQUEyQixFQUFFLGdCQUE2QixFQUNwRixRQUFnQixFQUFFLFlBQTBCLEVBQUUsWUFBaUMsRUFDL0UsWUFBcUI7OztnQkFDdkIsS0FBMEIsSUFBQSxpQkFBQSxpQkFBQSxZQUFZLENBQUEsMENBQUEsb0VBQUU7b0JBQW5DLElBQU0sV0FBVyx5QkFBQTtvQkFDcEIsSUFBSSxDQUFDLGNBQWMsQ0FDZixXQUFXLEVBQUUsWUFBWSxFQUFFLFdBQVcsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLENBQUM7aUJBQ2hGOzs7Ozs7Ozs7WUFDRCxJQUFJLFlBQVksS0FBSyxTQUFTLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxDQUFDLENBQUM7YUFDMUY7UUFDSCxDQUFDO1FBRU8sZ0RBQWMsR0FBdEIsVUFDSSxXQUF3QixFQUFFLFlBQTBCLEVBQUUsTUFBYyxFQUNwRSxnQkFBNkIsRUFBRSxRQUFnQjtZQUNqRCxJQUFJO2dCQUNGLElBQU0sVUFBVSxHQUFHLDBCQUFZLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hFLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQzthQUN6QztZQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNWLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2FBQzlCO1FBQ0gsQ0FBQztRQUNILDhCQUFDO0lBQUQsQ0FBQyxBQS9CRCxJQStCQztJQS9CWSwwREFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgR29vZ2xlIEluYy4gQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5pbXBvcnQge2Fic29sdXRlRnJvbSwgQWJzb2x1dGVGc1BhdGgsIEZpbGVTeXN0ZW0sIFBhdGhTZWdtZW50fSBmcm9tICdAYW5ndWxhci9jb21waWxlci1jbGkvc3JjL25ndHNjL2ZpbGVfc3lzdGVtJztcblxuaW1wb3J0IHtEaWFnbm9zdGljc30gZnJvbSAnLi4vLi4vZGlhZ25vc3RpY3MnO1xuaW1wb3J0IHtPdXRwdXRQYXRoRm59IGZyb20gJy4uL291dHB1dF9wYXRoJztcbmltcG9ydCB7VHJhbnNsYXRpb25CdW5kbGUsIFRyYW5zbGF0aW9uSGFuZGxlcn0gZnJvbSAnLi4vdHJhbnNsYXRvcic7XG5cbi8qKlxuICogVHJhbnNsYXRlIGFuIGFzc2V0IGZpbGUgYnkgc2ltcGx5IGNvcHlpbmcgaXQgdG8gdGhlIGFwcHJvcHJpYXRlIHRyYW5zbGF0aW9uIG91dHB1dCBwYXRocy5cbiAqL1xuZXhwb3J0IGNsYXNzIEFzc2V0VHJhbnNsYXRpb25IYW5kbGVyIGltcGxlbWVudHMgVHJhbnNsYXRpb25IYW5kbGVyIHtcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBmczogRmlsZVN5c3RlbSkge31cblxuICBjYW5UcmFuc2xhdGUoX3JlbGF0aXZlRmlsZVBhdGg6IFBhdGhTZWdtZW50LCBfY29udGVudHM6IEJ1ZmZlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgdHJhbnNsYXRlKFxuICAgICAgZGlhZ25vc3RpY3M6IERpYWdub3N0aWNzLCBfc291cmNlUm9vdDogQWJzb2x1dGVGc1BhdGgsIHJlbGF0aXZlRmlsZVBhdGg6IFBhdGhTZWdtZW50LFxuICAgICAgY29udGVudHM6IEJ1ZmZlciwgb3V0cHV0UGF0aEZuOiBPdXRwdXRQYXRoRm4sIHRyYW5zbGF0aW9uczogVHJhbnNsYXRpb25CdW5kbGVbXSxcbiAgICAgIHNvdXJjZUxvY2FsZT86IHN0cmluZyk6IHZvaWQge1xuICAgIGZvciAoY29uc3QgdHJhbnNsYXRpb24gb2YgdHJhbnNsYXRpb25zKSB7XG4gICAgICB0aGlzLndyaXRlQXNzZXRGaWxlKFxuICAgICAgICAgIGRpYWdub3N0aWNzLCBvdXRwdXRQYXRoRm4sIHRyYW5zbGF0aW9uLmxvY2FsZSwgcmVsYXRpdmVGaWxlUGF0aCwgY29udGVudHMpO1xuICAgIH1cbiAgICBpZiAoc291cmNlTG9jYWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMud3JpdGVBc3NldEZpbGUoZGlhZ25vc3RpY3MsIG91dHB1dFBhdGhGbiwgc291cmNlTG9jYWxlLCByZWxhdGl2ZUZpbGVQYXRoLCBjb250ZW50cyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB3cml0ZUFzc2V0RmlsZShcbiAgICAgIGRpYWdub3N0aWNzOiBEaWFnbm9zdGljcywgb3V0cHV0UGF0aEZuOiBPdXRwdXRQYXRoRm4sIGxvY2FsZTogc3RyaW5nLFxuICAgICAgcmVsYXRpdmVGaWxlUGF0aDogUGF0aFNlZ21lbnQsIGNvbnRlbnRzOiBCdWZmZXIpOiB2b2lkIHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgb3V0cHV0UGF0aCA9IGFic29sdXRlRnJvbShvdXRwdXRQYXRoRm4obG9jYWxlLCByZWxhdGl2ZUZpbGVQYXRoKSk7XG4gICAgICB0aGlzLmZzLmVuc3VyZURpcih0aGlzLmZzLmRpcm5hbWUob3V0cHV0UGF0aCkpO1xuICAgICAgdGhpcy5mcy53cml0ZUZpbGUob3V0cHV0UGF0aCwgY29udGVudHMpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGRpYWdub3N0aWNzLmVycm9yKGUubWVzc2FnZSk7XG4gICAgfVxuICB9XG59XG4iXX0=
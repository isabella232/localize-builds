/// <amd-module name="@angular/localize/src/tools/src/extract/translation_files/xliff1_translation_serializer" />
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AbsoluteFsPath } from '@angular/compiler-cli/src/ngtsc/file_system';
import { ɵParsedMessage } from '@angular/localize';
import { TranslationSerializer } from './translation_serializer';
/**
 * A translation serializer that can write XLIFF 1.2 formatted files.
 *
 * http://docs.oasis-open.org/xliff/v1.2/os/xliff-core.html
 * http://docs.oasis-open.org/xliff/v1.2/xliff-profile-html/xliff-profile-html-1.2.html
 *
 * @see Xliff1TranslationParser
 */
export declare class Xliff1TranslationSerializer implements TranslationSerializer {
    private sourceLocale;
    private basePath;
    private useLegacyIds;
    constructor(sourceLocale: string, basePath: AbsoluteFsPath, useLegacyIds: boolean);
    serialize(messages: ɵParsedMessage[]): string;
    private serializeMessage;
    private serializeTextPart;
    private serializeNote;
    private serializeLocation;
    private renderContext;
    /**
     * Get the id for the given `message`.
     *
     * If we have requested legacy message ids, then try to return the appropriate id
     * from the list of legacy ids that were extracted.
     *
     * Otherwise return the canonical message id.
     *
     * An Xliff 1.2 legacy message id is a hex encoded SHA-1 string, which is 40 characters long. See
     * https://csrc.nist.gov/csrc/media/publications/fips/180/4/final/documents/fips180-4-draft-aug2014.pdf
     */
    private getMessageId;
}

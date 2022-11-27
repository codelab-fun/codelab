"use strict";
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultSanitizerTable = void 0;
var sanitizer_table_1 = require("./sanitizer_table");
/**
 * GENERATED CODE, DO NOT MODIFY
 * This SanitizerTable was generated from the checked in html contract:
 *  webutil/html/types/codegen/html5_contract.textpb
 *
 * You can regenerate this file with:
 * webutil/html/types/codegen/update_generated_source_files.sh
 */
exports.defaultSanitizerTable = new sanitizer_table_1.SanitizerTable(new Set([
    'ARTICLE', 'SECTION', 'NAV', 'ASIDE', 'H1', 'H2',
    'H3', 'H4', 'H5', 'H6', 'HEADER', 'FOOTER',
    'ADDRESS', 'P', 'HR', 'PRE', 'BLOCKQUOTE', 'OL',
    'UL', 'LH', 'LI', 'DL', 'DT', 'DD',
    'FIGURE', 'FIGCAPTION', 'MAIN', 'DIV', 'EM', 'STRONG',
    'SMALL', 'S', 'CITE', 'Q', 'DFN', 'ABBR',
    'RUBY', 'RB', 'RT', 'RTC', 'RP', 'DATA',
    'TIME', 'CODE', 'VAR', 'SAMP', 'KBD', 'SUB',
    'SUP', 'I', 'B', 'U', 'MARK', 'BDI',
    'BDO', 'SPAN', 'BR', 'WBR', 'INS', 'DEL',
    'PICTURE', 'PARAM', 'TRACK', 'MAP', 'TABLE', 'CAPTION',
    'COLGROUP', 'COL', 'TBODY', 'THEAD', 'TFOOT', 'TR',
    'TD', 'TH', 'SELECT', 'DATALIST', 'OPTGROUP', 'OPTION',
    'OUTPUT', 'PROGRESS', 'METER', 'FIELDSET', 'LEGEND', 'DETAILS',
    'SUMMARY', 'MENU', 'DIALOG', 'SLOT', 'CANVAS', 'FONT',
    'CENTER',
]), new Map([
    [
        'A', new Map([
            ['href', { policyAction: sanitizer_table_1.AttributePolicyAction.KEEP_AND_SANITIZE_URL }],
        ])
    ],
    [
        'AREA', new Map([
            ['href', { policyAction: sanitizer_table_1.AttributePolicyAction.KEEP_AND_SANITIZE_URL }],
        ])
    ],
    [
        'LINK', new Map([
            [
                'href', {
                    policyAction: sanitizer_table_1.AttributePolicyAction.KEEP_AND_SANITIZE_URL,
                    conditions: new Map([[
                            'rel', new Set([
                                'alternate',
                                'author',
                                'bookmark',
                                'canonical',
                                'cite',
                                'help',
                                'icon',
                                'license',
                                'next',
                                'prefetch',
                                'dns-prefetch',
                                'prerender',
                                'preconnect',
                                'preload',
                                'prev',
                                'search',
                                'subresource',
                            ])
                        ]])
                }
            ],
        ])
    ],
    [
        'SOURCE', new Map([
            ['src', { policyAction: sanitizer_table_1.AttributePolicyAction.KEEP_AND_SANITIZE_URL }],
        ])
    ],
    [
        'IMG', new Map([
            ['src', { policyAction: sanitizer_table_1.AttributePolicyAction.KEEP_AND_SANITIZE_URL }],
        ])
    ],
    [
        'VIDEO', new Map([
            ['src', { policyAction: sanitizer_table_1.AttributePolicyAction.KEEP_AND_SANITIZE_URL }],
        ])
    ],
    [
        'AUDIO', new Map([
            ['src', { policyAction: sanitizer_table_1.AttributePolicyAction.KEEP_AND_SANITIZE_URL }],
        ])
    ],
]), new Set([
    'title',
    'aria-atomic',
    'aria-autocomplete',
    'aria-busy',
    'aria-checked',
    'aria-current',
    'aria-disabled',
    'aria-dropeffect',
    'aria-expanded',
    'aria-haspopup',
    'aria-hidden',
    'aria-invalid',
    'aria-label',
    'aria-level',
    'aria-live',
    'aria-multiline',
    'aria-multiselectable',
    'aria-orientation',
    'aria-posinset',
    'aria-pressed',
    'aria-readonly',
    'aria-relevant',
    'aria-required',
    'aria-selected',
    'aria-setsize',
    'aria-sort',
    'aria-valuemax',
    'aria-valuemin',
    'aria-valuenow',
    'aria-valuetext',
    'alt',
    'align',
    'autocapitalize',
    'autocomplete',
    'autocorrect',
    'autofocus',
    'autoplay',
    'bgcolor',
    'border',
    'cellpadding',
    'cellspacing',
    'checked',
    'color',
    'cols',
    'colspan',
    'controls',
    'datetime',
    'disabled',
    'download',
    'draggable',
    'enctype',
    'face',
    'formenctype',
    'frameborder',
    'height',
    'hreflang',
    'hidden',
    'ismap',
    'label',
    'lang',
    'loop',
    'max',
    'maxlength',
    'media',
    'minlength',
    'min',
    'multiple',
    'muted',
    'nonce',
    'open',
    'placeholder',
    'preload',
    'rel',
    'required',
    'reversed',
    'role',
    'rows',
    'rowspan',
    'selected',
    'shape',
    'size',
    'sizes',
    'slot',
    'span',
    'spellcheck',
    'start',
    'step',
    'summary',
    'translate',
    'type',
    'valign',
    'value',
    'width',
    'wrap',
    'itemscope',
    'itemtype',
    'itemid',
    'itemprop',
    'itemref',
]), new Map([
    [
        'dir', {
            policyAction: sanitizer_table_1.AttributePolicyAction.KEEP_AND_NORMALIZE,
            conditions: new Map([[
                    'dir', new Set([
                        'auto',
                        'ltr',
                        'rtl',
                    ])
                ]])
        }
    ],
    [
        'async', {
            policyAction: sanitizer_table_1.AttributePolicyAction.KEEP_AND_NORMALIZE,
            conditions: new Map([[
                    'async', new Set([
                        'async',
                    ])
                ]])
        }
    ],
    ['cite', { policyAction: sanitizer_table_1.AttributePolicyAction.KEEP_AND_SANITIZE_URL }],
    [
        'loading', {
            policyAction: sanitizer_table_1.AttributePolicyAction.KEEP_AND_NORMALIZE,
            conditions: new Map([[
                    'loading', new Set([
                        'eager',
                        'lazy',
                    ])
                ]])
        }
    ],
    ['poster', { policyAction: sanitizer_table_1.AttributePolicyAction.KEEP_AND_SANITIZE_URL }],
    [
        'target', {
            policyAction: sanitizer_table_1.AttributePolicyAction.KEEP_AND_NORMALIZE,
            conditions: new Map([[
                    'target', new Set([
                        '_self',
                        '_blank',
                    ])
                ]])
        }
    ],
]));

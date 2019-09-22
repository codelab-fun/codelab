import { BinaryParser } from '../parser/binary-parser';
import { lzw } from './gif';

export function gifParser(t: { [key: string]: string }) {
  const header = new BinaryParser()
    .string('headerConst', { length: 3, description: t.headerConst })
    .string('version', { length: 3, description: t.version })
    .uInt16('width', { description: t.width })
    .uInt16('height', { description: t.height })
    .boolean('globalPalette', { description: t.globalPalette })
    .bit3('resolution', { type: 'number', description: t.resolution })
    .boolean('isPaletteSorted', { description: t.isPaletteSorted })
    .bit3('paletteSize', { type: 'number', description: t.paletteSize })
    .uInt8('background', { description: t.background })
    .uInt8('Ratio', { description: t.ratio });

  const commentParser = new BinaryParser()
    .string('comment', { readUntil: '00000000' })
    .hex('end', { length: 2 });

  const palette = new BinaryParser().array('palette', {
    parser: new BinaryParser().hex('color', {
      length: 6,
      type: 'color'
    }),
    length(data) {
      const paletteSize = data
        .find(d => d.name === '_parent')
        .value.find(d => d.name === 'header')
        .value.find(d => d.name === 'paletteSize').value;
      const size = parseInt(paletteSize, 2);
      return 2 ** (size + 1);
    }
  });

  const netscapeParser = new BinaryParser()
    .uInt8('extensionSize', { description: t.extensionSize })
    .constBits('00000001', { description: t.netscapeLoopingExtensionId })
    .uInt16('loops', { description: t.loops })
    .constBits('00000000', { description: '' });

  const xmpParser = new BinaryParser()
    .string('data', {
      readUntil: '00000000'
    })
    .hex('end', { length: 4 });

  const extensionParser = new BinaryParser()
    .hex('0b', { length: 2 })
    .string('type', { length: 8 })
    .string('code', { length: 3 })
    .choice('data', {
      key: 'type',
      values: {
        NETSCAPE: netscapeParser,
        'XMP Data': xmpParser
      }
    });

  const graphicControlParser = new BinaryParser()
    .hex('const', { length: 2 })
    .constBits('000', { description: t.reservedBits })
    .bit3('disposalMethod', { type: 'enums', description: t.disposalMethod })
    .boolean('UI', { description: t.UI })
    .boolean('isTransparent', { description: t.isTransparent })
    .uInt16('delay', { description: t.delay })
    .uInt8('transparentColor', { description: t.transparentColor })
    .constBits('00000000');

  const exclamationMarkParser = new BinaryParser()
    .hex('subtype', { length: 2 })
    .choice('extension', {
      key: 'subtype',
      values: {
        f9: graphicControlParser,
        ff: extensionParser,
        fe: commentParser
      }
    });

  const imageDescriptorParser = new BinaryParser()
    .uInt16('left', { description: t.left })
    .uInt16('top', { description: t.top })
    .uInt16('imageWidth', { description: t.imageWidth })
    .uInt16('imageHeight', { description: t.imageHeight })
    .boolean('localPalette', { description: t.localPalette })
    .boolean('isImageInterlacingEnabld', {
      description: t.isImageInterlacingEnabld
    })
    .boolean('isLocalPaletteSorted', { description: t.isLocalPaletteSorted })
    .constBits('00', { description: t.reservedBits })
    .bit3('localPaletteSize', {
      type: 'enums',
      description: t.localPaletteSize
    })
    .uInt8('colorDepth')
    .uInt8('blockSize')
    .bit('graphicBlock', {
      description: t.graphicBlock,
      length: fields => {
        return (
          (Object as any).values(fields).find(a => a.name === 'blockSize')
            .value * 8
        );
      },
      converter(bits) {
        return lzw(2, bits.match(/.{8}/g).map(a => parseInt(a, 2)), 4);
      }
    })
    .constBits('00000000');

  const body = new BinaryParser()
    .string('marker', { length: 1 })
    .choice('extension', {
      key: 'marker',
      values: {
        '!': exclamationMarkParser,
        ';': new BinaryParser(),
        ',': imageDescriptorParser
      }
    });

  return new BinaryParser()
    .block('header', header)
    .block('palette', palette)
    .array('extensions', { parser: body, length: 200 });
}

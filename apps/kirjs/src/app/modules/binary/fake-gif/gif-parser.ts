import { BinaryParser } from '../parser/binary-parser';
import { lzw } from './gif';


const header = new BinaryParser()
  .string('headerConst', {length: 3, description: 'this is always "GIF"'})
  .string('version', {length: 3, description: 'this is either 87a or 89a'})
  .uInt16('width', {description: 'Width of the image'})
  .uInt16('height', {description: 'Height of the image'})
  .boolean('globalPallette', {description: 'Whether global palette is present'})
  .bit3('resolution', {type: 'number', description: 'Number of bits per primary color available'})
  .boolean('palette-sorted', {description: 'Whether the palette is sorted'})
  .bit3('palette-size', {type: 'number', description: `Specifies number of colors in the palette proportional a power of two. e.g.`})
  .uInt8('background', {description: 'If present specifies index of a color in the global color table that would be transparent'})
  .uInt8('Ratio');


const commentParser = new BinaryParser()
  .string('comment', {readUntil: '00000000'})
  .hex('end', {length: 2});

const palette = new BinaryParser()
  .array('palette', {
    parser: new BinaryParser().hex('color', {
      length: 6,
      type: 'color',
    }),
    length(data) {
      const paletteSize = data._parent[0].value.find(a => a.name === 'palette-size').value;
      const size = parseInt(paletteSize, 2);
      return (2 ** (size + 1));
    }
  });

const netscapeParser = new BinaryParser()
  .uInt8('length')
  .uInt8('TBD')
  .uInt16('loops')
  .uInt8('zero');

const xmpParser = new BinaryParser()
  .string('data', {
    readUntil: '00000000'
  })
  .hex('end', {length: 4});


const extensionParser = new BinaryParser()
  .hex('0b', {length: 2})
  .string('type', {length: 8})
  .string('code', {length: 3})
  .choice('data', {
    key: 'type',
    values: {
      'NETSCAPE': netscapeParser,
      'XMP Data': xmpParser
    }
  });


const graphicControlParser = new BinaryParser()
  .hex('const', {length: 2})
  .constBits('000')
  .bit3('display', {type: 'enums', description: 'Action after displaying the frame'})
  .boolean('UI')
  .boolean('isTransparent', {description: 'Whether the frame should have a transparent color'})
  .uInt16('delay')
  .uInt8('transparentColor', {description: 'Optional transparent color index'})
  .constBits('00000000');

const exclamationMarkParser = new BinaryParser()
  .hex('subtype', {length: 2})
  .choice('extension', {
    key: 'subtype',
    values: {
      'f9': graphicControlParser,
      'ff': extensionParser,
      'fe': commentParser
    }
  });

const imageDescriptorParser = new BinaryParser()
  .uInt16('left', {description: 'Horizontal shift in pixels'})
  .uInt16('top', {description: 'Vertical shift in pixels'})
  .uInt16('width', {description: 'Width of the image'})
  .uInt16('height', {description: 'Height of the image'})
  .boolean('localPalette', {description: 'Whether the image has local palette'})
  .boolean('Interlacing', {description: 'Indicates if the image is interlaced.'})
  .boolean('localPaletteSorted', {description: 'Whether local palette is sorted'})
  .constBits('00', {description: 'This is reserved'})
  .bit3('localPaletteSize', {type: 'enums', description: 'Bucket of sizes of local palette.'})
  .uInt8('colorDepth')
  .uInt8('blockSize')
  .bit('graphicBlock', {
    description: 'This is the actual image encoded with LZW',
    length: (fields) => {
      return (Object as any).values(fields).find(a => a.name === 'blockSize').value * 8;
    },
    converter(bits) {
      return lzw(2, bits.match(/.{8}/g).map(a => parseInt(a, 2)), 4);
    }
  })
  .constBits('00000000');

const body = new BinaryParser()
  .string('marker', {length: 1})
  .choice('extension', {
    key: 'marker',
    values: {
      '!': exclamationMarkParser,
      ';': new BinaryParser(),
      ',': imageDescriptorParser
    }
  });


export const gifParser = new BinaryParser()
  .block('header', header)
  .block('palette', palette)
  .array('extensions', {parser: body, length: 200});

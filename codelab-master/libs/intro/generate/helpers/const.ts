import { resolve } from 'path';

export const CODELAB_PRESENTATION_ID =
  '1ecaXVe5qRS3YcphrTK9JVAaD1qNhLDkLhwgZIZTfNzw';
export const SCOPE = ['https://www.googleapis.com/auth/presentations.readonly'];
export const CREDENTIALS_PATH = resolve(__dirname, '../credentials.json');
export const TOKEN_PATH = resolve(__dirname, '../token.json');
export const SLIDES_METADATA_PATH = resolve(__dirname, '../slides.json');
export const ASSETS_SLIDES_PATH = resolve(__dirname, '../../assets/slides');

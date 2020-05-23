# Angular Intro Presentation

This module contains scripts that convert existing Google Slides [presentation](https://docs.google.com/presentation/d/1ecaXVe5qRS3YcphrTK9JVAaD1qNhLDkLhwgZIZTfNzw/edit) into an Angular based presentation.

The primary purpose is to conditionally display subset of slides based on the requirements.

The result is available at https:// TDO

## How it works

1. Using Google Slides API fetches list of slides from a presentation with ID 1ecaXVe5qRS3YcphrTK9JVAaD1qNhLDkLhwgZIZTfNzw
1. Authorization done as described in https://developers.google.com/drive/api/v3/quickstart/nodejs, tokens stored in TODO
1. Generates JSON slides metadata and thumbnails in /assets/slides

## Running the script

npm run build:intro

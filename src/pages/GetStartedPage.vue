<template>
  <div>
    <section>
      <v-layout
        column
        align-center
        justify-center
      >
        <v-flex xs12 sm8 class="my-3">
          <div id="styled" v-html="md_text"></div>
        </v-flex>
      </v-layout>
    </section>
  </div>
</template>

<script>
  import marked from 'marked'
  const URL_README = 'https://raw.githubusercontent.com/ArthurManz/crypto-lions/master/docs/ICO_README.md?token=AL4c4auI7nS4sXY5Rl91LmfJhRsbY8-Xks5azgq-wA%3D%3D'

  export default {
    name: 'GetStartedPage',
    data () {
      return {
        md_text: ''
      }
    },
    async created () {
      fetch(URL_README)
        .then(async (res) => {
          this.md_text = marked(await res.text(), { sanitize: true })
        })
        .catch(console.log)
    }
  }
</script>

<style>

  div>#styled *:not('#mkdbuttons') {
    margin: 0;
    padding: 0; }

  div>#styled #wrapper {
    font: 15px "Frutiger", Helvetica, sans-serif;

    -webkit-font-smoothing: antialiased;
    line-height: 1.7;
    padding: 3px;
    background: #fff;
    border-radius: 3px;
    -moz-border-radius: 3px;
    -webkit-border-radius: 3px;
  }

  div>#styled p {
    margin: 1em 0;
  }

  div>#styled a {
    color: #4183c4;
    text-decoration: none; }

  div>#styled #wrapper {
    background-color: #fff;
    padding: 30px;
    margin: 15px;
    font-size: 15px;
    line-height: 1.6; }
  div>#styled #wrapper > *:first-child {
    margin-top: 0 !important; }
  div>#styled #wrapper > *:last-child {
    margin-bottom: 0 !important; }

  @media screen {
    div > #styled #wrapper {
      box-shadow: 0 0 0 1px #cacaca, 0 0 0 4px #eee;
    }

    div > #styled h1, h2, h3, h4, h5, h6 {
      font-weight: 700;
      line-height: 1.0;
      cursor: text;
      position: relative;
      margin: 1em 0 15px;
      padding: 0;
    }

    div > #styled h1 {
      font-size: 2.5em;
      border-bottom: 1px solid #ddd;
    }

    div > #styled h2 {
      font-size: 2em;
      border-bottom: 1px solid #eee;
      color: #00f;
    }

    div > #styled h3 {
      font-size: 1.5em;
    }

    div > #styled h4 {
      font-size: 1.2em;
    }

    div > #styled h5 {
      font-size: 1em;
    }

    div > #styled h6 {
      color: #777;
      font-size: 1em;
    }

    div > #styled p, blockquote, table, pre {
      margin: 3px 0;
    }

    div > #styled ul {
      padding-left: 30px;
    }

    div > #styled ol {
      padding-left: 30px;
    }

    div > #styled ol li ul:first-of-type {
      margin-top: 0px;
    }

    div > #styled hr {
      background: transparent url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAYAAAAECAYAAACtBE5DAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OENDRjNBN0E2NTZBMTFFMEI3QjRBODM4NzJDMjlGNDgiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OENDRjNBN0I2NTZBMTFFMEI3QjRBODM4NzJDMjlGNDgiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo4Q0NGM0E3ODY1NkExMUUwQjdCNEE4Mzg3MkMyOUY0OCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo4Q0NGM0E3OTY1NkExMUUwQjdCNEE4Mzg3MkMyOUY0OCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqqezsUAAAAfSURBVHjaYmRABcYwBiM2QSA4y4hNEKYDQxAEAAIMAHNGAzhkPOlYAAAAAElFTkSuQmCC) repeat-x 0 0;
      border: 0 none;
      color: #ccc;
      height: 4px;
      margin: 15px 0;
      padding: 0;
    }

    div > #styled #wrapper > h2:first-child {
      margin-top: 0;
      padding-top: 0;
    }

    div > #styled #wrapper > h1:first-child {
      margin-top: 0;
      padding-top: 0;
    }

    div > #styled #wrapper > h1:first-child + h2 {
      margin-top: 0;
      padding-top: 0;
    }

    div > #styled #wrapper > h3:first-child, #wrapper > h4:first-child, #wrapper > h5:first-child, #wrapper > h6:first-child {
      margin-top: 0;
      padding-top: 0;
    }

    div > #styled a:first-child h1, a:first-child h2, a:first-child h3, a:first-child h4, a:first-child h5, a:first-child h6 {
      margin-top: 0;
      padding-top: 0;
    }

    div > #styled h1 + p, h2 + p, h3 + p, h4 + p, h5 + p, h6 + p, ul li > :first-child, ol li > :first-child {
      margin-top: 0;
    }

    div > #styled dl {
      padding: 0;
    }

    div > #styled dl dt {
      font-size: 14px;
      font-weight: bold;
      font-style: italic;
      padding: 0;
      margin: 15px 0 5px;
    }

    div > #styled dl dt:first-child {
      padding: 0;
    }

    div > #styled dl dt > :first-child {
      margin-top: 0;
    }

    div > #styled dl dt > :last-child {
      margin-bottom: 0;
    }

    div > #styled dl dd {
      margin: 0 0 15px;
      padding: 0 15px;
    }

    div > #styled dl dd > :first-child {
      margin-top: 0;
    }

    div > #styled dl dd > :last-child {
      margin-bottom: 0;
    }

    div > #styled blockquote {
      border-left: 4px solid #DDD;
      padding: 0 15px;
      color: #777;
    }

    div > #styled blockquote > :first-child {
      margin-top: 0;
    }

    div > #styled blockquote > :last-child {
      margin-bottom: 10px;
    }

    div > #styled em {
      font-style: normal;
      border: 1px solid #f00;
      border-radius: 3px;
      background-color: #efefef;
      padding-left: 3px;
      padding-right: 3px;
      margin-left: 1px;
      margin-right: 1px;

    }

    div > #styled table {
      border-collapse: collapse;
      border-spacing: 0;
      font-size: 100%;
    }

    div > #styled table th {
      font-weight: bold;
      border: 1px solid #ccc;
      padding: 6px 13px;
    }

    div > #styled table td {
      border: 1px solid #ccc;
      padding: 6px 13px;
    }

    div > #styled table tr {
      border-top: 1px solid #ccc;
      background-color: #fff;
    }

    div > #styled table tr:nth-child(2n) {
      background-color: #f8f8f8;
    }

    div > #styled img {
      max-width: 100%;
    }

    div > #styled code, tt {
      margin: 0 2px;
      padding: 0 5px;
      white-space: nowrap;
      border: 1px solid #eaeaea;
      background-color: #f8f8f8;
      border-radius: 3px;
      font-family: "Source Code Pro", Consolas, Courier, monospace;
      font-size: 80%;
      color: #333333;
    }

    div > #styled pre > code {
      margin: 0;
      padding: 0;
      white-space: pre;
      border: none;
      background: transparent;
    }

    div > #styled .highlight pre {
      background-color: #f8f8f8;
      border: 1px solid #ccc;
      font-size: 80%;
      line-height: 19px;
      overflow: auto;
      padding: 6px 10px;
      border-radius: 3px;
    }

    div > #styled pre {
      background-color: #f8f8f8;
      border: 1px solid #ccc;
      font-size: 110%;
      line-height: 19px;
      overflow: auto;
      padding: 6px 10px;
      border-radius: 3px;
      margin: 26px 0;
    }

    div > #styled pre code, pre tt {
      background-color: transparent;
      border: none;
    }

    div > #styled .poetry pre {
      font-family: Garamond, Georgia, serif !important;
      font-style: italic;
      font-size: 110% !important;
      line-height: 1.6em;
      display: block;
      margin-left: 1em;
    }

    div > #styled .poetry pre code {
      font-family: Garamond, Georgia, serif !important;
      word-break: break-all;
      /* Non standard for webkit */
      -webkit-hyphens: auto;
      -moz-hyphens: auto;
      hyphens: auto;
      white-space: pre-wrap;
    }

    div > #styled sup, sub, a.footnote {
      font-size: 1.4ex;
      height: 0;
      line-height: 1;
      vertical-align: super;
      position: relative;
    }

    div > #styled sub {
      vertical-align: sub;
      top: -1px;
    }

    @media screen {
      div > #styled  body.inverted {
        color: #eee !important;
        border-color: #555;
        box-shadow: none;
      }

      div > #styled .inverted #wrapper, .inverted hr, .inverted p, .inverted td, .inverted li, .inverted h1, .inverted h2, .inverted h3, .inverted h4, .inverted h5, .inverted h6, .inverted th, .inverted .math, .inverted caption, .inverted dd, .inverted dt, .inverted blockquote {
        color: #eee !important;
        border-color: #555;
        box-shadow: none;
      }

      div > #styled .inverted td, .inverted th {
        background: #333;
      }

      div > #styled .inverted pre, .inverted code, .inverted tt {
        background: #eeeeee !important;
        color: #111;
      }

      div > #styled .inverted h2 {
        border-color: #555555;
      }

      div > #styled .inverted hr {
        border-color: #777;
        border-width: 1px !important;
      }

      div > #styled ::selection {
        background: rgba(157, 193, 200, 0.5);
      }

      div > #styled h1::selection {
        background-color: rgba(45, 156, 208, 0.3);
      }

      div > #styled h2::selection {
        background-color: rgba(90, 182, 224, 0.3);
      }

      div > #styled h3::selection, h4::selection, h5::selection, h6::selection, li::selection, ol::selection {
        background-color: rgba(133, 201, 232, 0.3);
      }

      div > #styled code::selection {
        background-color: rgba(0, 0, 0, 0.7);
        color: #eeeeee;
      }

      div > #styled code span::selection {
        background-color: rgba(0, 0, 0, 0.7) !important;
        color: #eeeeee !important;
      }

      div > #styled a::selection {
        background-color: rgba(255, 230, 102, 0.2);
      }

      .inverted a::selection {
        background-color: rgba(255, 230, 102, 0.6);
      }

      div > #styled td::selection, th::selection, caption::selection {
        background-color: rgba(180, 237, 95, 0.5);
      }

      div > #styled .inverted {
        background: #0b2531;
        background: #252a2a;
      }

      div > #styled .inverted #wrapper {
        background: #252a2a;
      }

      .inverted a {
        color: #acd1d5;
      }
    }
  }
</style>

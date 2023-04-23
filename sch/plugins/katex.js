export default (api)=>{
  api.addHTMLHeadScripts(() => {
    return [
      {
        content: 'defer',
        type:"text/javascript",
        defer: "defer",
        // src: 'https://cdn.jsdelivr.net/npm/katex@0.10.1/dist/katex.min.js',
        src: 'https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/KaTeX/0.10.1/katex.min.js',
      },
    ];
  });
  api.addHTMLLinks(() => {
    return [
      {
        rel: 'stylesheet',
        type: 'text/css',
        // href: "https://cdn.jsdelivr.net/npm/katex@0.10.1/dist/katex.min.css",
        href: "https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/KaTeX/0.10.1/katex.min.css",
      },
    ];
  });
}

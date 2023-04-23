export default (api) => {
  api.addHTMLHeadScripts(() => {
    return [
      {
        content: 'text/javascript',
        type: 'text/javascript',
        src: 'http://webapi.amap.com/maps?v=1.4.15&key=146f6dba88e9d662d6ab1e5fe3665521&plugin=AMap.StationSearch,AMap.PolyEditor,AMap.ToolBar,AMap.MouseTool,AMap.CircleEditor,AMap.Driving',
      },
      {
        content: 'text/javascript',
        type: 'text/javascript',
        src: '//webapi.amap.com/ui/1.1/main.js?v=1.1.1',
      },
    ];
  });
};

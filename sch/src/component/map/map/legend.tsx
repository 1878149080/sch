// import React, { FC, useState } from 'react';
// // import { Switch } from 'antd';


// // type legendType = {
// //   LC: ConfigType;
// //   updateUI: () => void;
// //   refresh: any,
// // };

// function Legend(props: any) {
//   const { LC, updateUI, refresh } = props;
//   const [expand, setExpand] = useState<boolean>(true);
//   const { station, lineTrack, selectedTrack } = LC?.children || {};

//   // 展示切换
//   const onTrigger = (config: any) => {
//     config.exist = !config.exist;
//     console.log(config.exist);
    
//     updateUI();
//   };

//   const onClick = () => {
//     setExpand(!expand);
//   };
//   const onClickRoot = () => {
//     // LC.show = !LC.show
//     LC.exist = !LC.exist
//     updateUI();
//   }

//   return (
//     <div
//       className="legend"
//       style={
//         expand
//           ? {
//             width: '260px',
//             // height: '180px',
//           }
//           : {
//             width: '67px',
//             height: '30px',
//           }
//       }
//     >
//       <header>
//         <span onClick={onClick}>色例</span>
//       </header>
//       <main>
//         {!station.disabled ? (
//           <section>
//             <div className="title">
//               <span onClick={onClickRoot} style={{ color: LC.exist ? LC.color : LC.fadeColor }}>
//                 {LC.name}
//               </span>
//             </div>
//             <div className="content">
//               <Legend.Item config={station} onClick={() => onTrigger(station)} />
//               <Legend.Item config={lineTrack} onClick={() => onTrigger(lineTrack)} />
//               <Legend.Item config={selectedTrack} onClick={() => onTrigger(selectedTrack)} />
//             </div>
//           </section>
//         ) : null}
//       </main>
//     </div>
//   );
// };

// Legend.Item = function(props: any) {
//   const { config, onClick = () => {} } = props;
//   return (
//     <div
//       style={{
//         color: config?.show ? config?.color : config?.fadeColor,
//       }}
//       onClick={onClick}
//     >
//       <span className="iconfont icon-piliangbaocun">{config.name}</span>
//     </div>
//   );
// }

// export default Legend;


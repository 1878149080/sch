export interface optionType {
  terminalType?: optionItem[]; // 设备类型
  // terminalSupplier?: optionItem[]; // 厂商
  terminalLabel?: optionItem[]; // 	设备用途
  terminalStatus?: optionItem[]; // 设备状态
  projectId?: optionItem[]; // 项目
  terminalHandler?: optionItem[]; // 设备处理类
  otaType?: optionItem[]; // 	OTA类型
  certType?: optionItem[]; // 证书类型
  terminalCertType?: optionItem[]; // 凭证类型
  authMode?: optionItem[]; // 认证模式
  certStatus?: optionItem[]; // 证书状态
  softVersion?: optionItem[]; // 软件版本
  terminalModel?: optionItem[]; // 设备型号
  stationSpeaker?: optionItem[]; // 报站器厂家
  screenSize?: optionItem[]; // 屏幕尺寸
  netMode?: optionItem[]; // 带宽
  opsType?: optionItem[]; // 操作类型
  otaStatus?: optionItem[]; // ota状态
}

// 下拉选项
export type optionItem = {
  dictName: string;
  dictType: string;
  dictValue: number;
};

export type TerminalType = {
  dictName: string;
  dictType: string;
  dictValue: number;
};

// 媒体，广告主，管理员
export type TRole = 'media' | 'advertiser' | 'admin';

// 审核中、运行中、审核不通停止
export type TAppStatus='under_review'|'running'|'no_pass'|'stop'

// 信息流、banner、开屏广告、激励视频
export type TCodeType='stream'|'banner'|'splash'|'reward_video'

// 广告位状态
export type TCodeStatus='running'|'stop'
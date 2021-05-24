import React, { useEffect, useState } from 'react'
import * as Type from 'app/busi/Home/index.d'
import Tab from 'app/components/tab'
import Header from 'app/busi/Home/header'
import Tool from 'app/busi/Home/tool'
import Swiper from 'app/components/swiper'
import RecommendSheet from 'app/busi/Home/recommendSheet'
import RadarSheet from 'app/busi/Home/radarSheet'
import ExclusiveSheet from 'app/busi/Home/exclusiveSheet'
import Card from 'app/busi/components/card'
import { TAB_CONFIG } from 'app/busi/Home/config'
import axios from 'app/axios'
import './style/index.less'

const Home = () => {
    const [homeData, setHomeData] = useState<Type.homeData>({})

    useEffect(() => {
        const url = `http://127.0.0.1:3000/homepage/block/page`
        axios({
            url,
            method: 'get',
            data: {},
            success: (res: any) => {
                console.log('res.data.blocks', res.data.blocks)
                if (res.code === 200) {
                    /**
                     * "HOMEPAGE_BANNER" 轮播数据
                     * "HOMEPAGE_BLOCK_PLAYLIST_RCMD" 推荐歌单
                     * "HOMEPAGE_MUSIC_MLOG" 精选音乐视频
                     * "HOMEPAGE_BLOCK_MGC_PLAYLIST" 网易云音乐的雷达歌单
                     * "HOMEPAGE_MUSIC_CALENDAR" 音乐日历
                     * "HOMEPAGE_BLOCK_STYLE_RCMD" 私人定制
                     * "HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST" 专属场景歌单
                     * "HOMEPAGE_PODCAST24" 24小时播客
                     * "HOMEPAGE_VOICELIST_RCMD" 播客合辑
                     * "HOMEPAGE_BLOCK_VIDEO_PLAYLIST" 视频合辑
                     */
                    const info: Type.BlockInfo = {};
                    const data = res.data.blocks;
                    data.forEach((item: Type.Blocks) => {
                        info[item.blockCode] = item;
                    })
                    setHomeData(info)
                }
            },
            error: (res: any) => {
                console.log(res, 'error');
            }
        })
    }, []);

    return <div id='home'>
        <Card style={null}>
            <Header />
            <Swiper
                autoPlay={true}
                bannerList={homeData.HOMEPAGE_BANNER?.extInfo?.banners || []} />
            <Tool />
        </Card>

        <RecommendSheet sheetList={homeData.HOMEPAGE_BLOCK_PLAYLIST_RCMD?.creatives || []} />
        <RadarSheet sheetList={homeData.HOMEPAGE_BLOCK_MGC_PLAYLIST?.creatives || []} />
        <ExclusiveSheet sheetList={homeData.HOMEPAGE_BLOCK_OFFICIAL_PLAYLIST?.creatives || []} />
        <Tab config={TAB_CONFIG} />
    </div>
}

export default Home